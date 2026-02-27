import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type AppointmentStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  public type Service = {
    id : Text;
    displayName : Text;
    description : Text;
    featuredPhoto : ?Storage.ExternalBlob;
  };

  type Appointment = {
    id : Nat;
    patientName : Text;
    contactInfo : Text;
    preferredDate : Time.Time;
    serviceType : Text;
    status : AppointmentStatus;
    doctorId : ?Nat;
  };

  public type ClinicStatus = {
    #open;
    #closed;
    #emergency;
  };

  module Appointment {
    public func compare(a : Appointment, b : Appointment) : {
      #less;
      #equal;
      #greater;
    } {
      Nat.compare(a.id, b.id);
    };
  };

  public type ReviewState = { #pending; #approved; #rejected };

  type Review = {
    id : Nat;
    reviewerName : Text;
    text : Text;
    rating : Nat;
    photo : ?Storage.ExternalBlob;
    beforeAfterImage : ?Storage.ExternalBlob;
    state : ReviewState;
  };

  type BeforeAfterPair = {
    id : Nat;
    beforeImage : Storage.ExternalBlob;
    afterImage : Storage.ExternalBlob;
    description : Text;
  };

  type DoctorAvailability = {
    doctorId : Nat;
    availableSlots : [Time.Time];
  };

  type Doctor = {
    id : Nat;
    name : Text;
    specialty : Text;
    availability : [DoctorAvailability];
  };

  public type UserProfile = {
    name : Text;
  };

  public type ReviewInput = {
    reviewerName : Text;
    text : Text;
    rating : Nat;
    photo : ?Storage.ExternalBlob;
    beforeAfterImage : ?Storage.ExternalBlob;
  };

  var nextAppointmentId = 1;
  var nextReviewId = 1;
  var nextDoctorId = 1;
  var nextBeforeAfterId = 1;

  // Persistent maps for stable storage
  let appointments = Map.empty<Nat, Appointment>();
  let reviews = Map.empty<Nat, Review>();
  let doctors = Map.empty<Nat, Doctor>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let services = Map.empty<Text, Service>();
  let beforeAfterGallery = Map.empty<Nat, BeforeAfterPair>();

  let photoUrls = Set.empty<Text>();
  let beforeAfterUrls = Set.empty<Text>();
  let adminIds = Set.empty<Text>();
  var clinicStatus : ClinicStatus = #open;

  // Mixins
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // global flag for clinic open/closed
  public shared ({ caller }) func setClinicStatus(adminPrincipal : Principal, status : ClinicStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update clinic status");
    };
    clinicStatus := status;
  };

  public query ({ caller }) func getClinicStatus() : async ClinicStatus {
    clinicStatus;
  };

  // Unauthenticated appointment booking
  public shared ({ caller }) func bookAppointment(
    patientName : Text,
    contactInfo : Text,
    preferredDate : Time.Time,
    serviceType : Text,
  ) : async Bool {
    if (clinicStatus == #closed) {
      return false;
    };

    let newAppointment : Appointment = {
      id = nextAppointmentId;
      patientName;
      contactInfo;
      preferredDate;
      serviceType;
      status = #pending;
      doctorId = null;
    };
    appointments.add(nextAppointmentId, newAppointment);
    nextAppointmentId += 1;
    true;
  };

  public shared ({ caller }) func updateAppointmentStatus(appointmentId : Nat, newStatus : AppointmentStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update appointment status");
    };
    switch (appointments.get(appointmentId)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        let updatedAppointment = { appointment with status = newStatus };
        appointments.add(appointmentId, updatedAppointment);
      };
    };
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };
    appointments.values().toArray().sort();
  };

  // Review Management
  public shared ({ caller }) func addReview(reviewInput : ReviewInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };
    let review : Review = {
      id = nextReviewId;
      reviewerName = reviewInput.reviewerName;
      text = reviewInput.text;
      rating = reviewInput.rating;
      photo = reviewInput.photo;
      beforeAfterImage = reviewInput.beforeAfterImage;
      state = #pending;
    };
    reviews.add(nextReviewId, review);
    nextReviewId += 1;
  };

  public shared ({ caller }) func approveReview(reviewId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve reviews");
    };
    switch (reviews.get(reviewId)) {
      case (null) { Runtime.trap("Review not found") };
      case (?review) {
        let updatedReview = { review with state = #approved };
        reviews.add(reviewId, updatedReview);
      };
    };
  };

  public shared ({ caller }) func deleteReview(reviewId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete reviews");
    };
    switch (reviews.get(reviewId)) {
      case (null) { Runtime.trap("Review not found") };
      case (_) {
        reviews.remove(reviewId);
      };
    };
  };

  // Admin-only: pending reviews must not be visible to the public
  public query ({ caller }) func getPendingReviews() : async [Review] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view pending reviews");
    };
    let filtered = reviews.toArray().filter(
      func((_, review)) {
        review.state == #pending;
      }
    );
    let reviewsList = List.fromArray<(Nat, Review)>(filtered);
    reviewsList.map<(Nat, Review), Review>(
      func((_, review)) { review }
    ).toArray();
  };

  // Public: only approved reviews are visible to everyone
  public query ({ caller }) func getApprovedReviews() : async [Review] {
    let filtered = reviews.toArray().filter(
      func((_, review)) {
        review.state == #approved;
      }
    );
    let reviewsList = List.fromArray<(Nat, Review)>(filtered);
    reviewsList.map<(Nat, Review), Review>(
      func((_, review)) { review }
    ).toArray();
  };

  // Doctor Management
  public shared ({ caller }) func addDoctor(name : Text, specialty : Text, availability : [DoctorAvailability]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add doctors");
    };
    let doctor : Doctor = {
      id = nextDoctorId;
      name;
      specialty;
      availability;
    };
    doctors.add(nextDoctorId, doctor);
    let currentId = nextDoctorId;
    nextDoctorId += 1;
    currentId;
  };

  public query ({ caller }) func getAllDoctors() : async [Doctor] {
    doctors.values().toArray();
  };

  public query ({ caller }) func getDoctorAvailability(doctorId : Nat) : async ?[DoctorAvailability] {
    switch (doctors.get(doctorId)) {
      case (null) { null };
      case (?doctor) { ?doctor.availability };
    };
  };

  // Admin Management
  public shared ({ caller }) func addAdmin(adminPrincipal : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add other admins");
    };
    AccessControl.assignRole(accessControlState, caller, adminPrincipal, #admin);
  };

  // Service Management
  public shared ({ caller }) func addOrUpdateService(id : Text, displayName : Text, description : Text, featuredPhoto : ?Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add or update services");
    };
    let service : Service = {
      id;
      displayName;
      description;
      featuredPhoto;
    };
    services.add(id, service);
  };

  public query ({ caller }) func getService(serviceId : Text) : async ?Service {
    services.get(serviceId);
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  // Before/After Gallery Management
  public shared ({ caller }) func addBeforeAfterPair(beforeImage : Storage.ExternalBlob, afterImage : Storage.ExternalBlob, description : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add before/after pairs");
    };
    let pair : BeforeAfterPair = {
      id = nextBeforeAfterId;
      beforeImage;
      afterImage;
      description;
    };
    beforeAfterGallery.add(nextBeforeAfterId, pair);
    let currentId = nextBeforeAfterId;
    nextBeforeAfterId += 1;
    currentId;
  };

  public query ({ caller }) func getAllBeforeAfterPairs() : async [BeforeAfterPair] {
    beforeAfterGallery.values().toArray();
  };
};
