import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Order "mo:core/Order";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type AppointmentStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
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

  type ClinicStatus = {
    #open;
    #closed;
    #emergency;
  };

  module Appointment {
    public func compare(a : Appointment, b : Appointment) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Review = {
    id : Nat;
    reviewerName : Text;
    text : Text;
    rating : Nat;
    photo : ?Storage.ExternalBlob;
    beforeAfterImage : ?Storage.ExternalBlob;
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

  var nextAppointmentId = 1;
  var nextReviewId = 1;
  var nextDoctorId = 1;

  let appointments = Map.empty<Nat, Appointment>();
  let reviews = Map.empty<Nat, Review>();
  let doctors = Map.empty<Nat, Doctor>();
  let userProfiles = Map.empty<Principal, UserProfile>();

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

  // Appointment Management
  public shared ({ caller }) func createAppointment(patientName : Text, contactInfo : Text, preferredDate : Time.Time, serviceType : Text) : async Appointment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create appointments");
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
    newAppointment;
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

  // Clinic Status Management
  public shared ({ caller }) func setClinicStatus(status : ClinicStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update clinic status");
    };
    clinicStatus := status;
  };

  public query ({ caller }) func getClinicStatus() : async ClinicStatus {
    clinicStatus;
  };

  // Review Management
  public shared ({ caller }) func addReview(reviewerName : Text, text : Text, rating : Nat, photo : ?Storage.ExternalBlob, beforeAfterImage : ?Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };
    let review : Review = {
      id = nextReviewId;
      reviewerName;
      text;
      rating;
      photo;
      beforeAfterImage;
    };
    reviews.add(nextReviewId, review);
    nextReviewId += 1;
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray();
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
};
