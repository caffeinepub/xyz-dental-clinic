import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";

module {
  type OldReview = {
    id : Nat;
    reviewerName : Text;
    text : Text;
    rating : Nat;
    photo : ?Storage.ExternalBlob;
    beforeAfterImage : ?Storage.ExternalBlob;
  };

  type OldActor = {
    reviews : Map.Map<Nat, OldReview>;
    appointments : Map.Map<Nat, {
      id : Nat;
      patientName : Text;
      contactInfo : Text;
      preferredDate : Int;
      serviceType : Text;
      status : { #pending; #confirmed; #completed; #cancelled };
      doctorId : ?Nat;
    }>;
    doctors : Map.Map<Nat, {
      id : Nat;
      name : Text;
      specialty : Text;
      availability : [{
        doctorId : Nat;
        availableSlots : [Int];
      }];
    }>;
    nextAppointmentId : Nat;
    nextReviewId : Nat;
    nextDoctorId : Nat;
  };

  type NewActor = {
    reviews : Map.Map<Nat, {
      id : Nat;
      reviewerName : Text;
      text : Text;
      rating : Nat;
      photo : ?Storage.ExternalBlob;
      beforeAfterImage : ?Storage.ExternalBlob;
      state : { #pending; #approved; #rejected };
    }>;
    appointments : Map.Map<Nat, {
      id : Nat;
      patientName : Text;
      contactInfo : Text;
      preferredDate : Int;
      serviceType : Text;
      status : { #pending; #confirmed; #completed; #cancelled };
      doctorId : ?Nat;
    }>;
    doctors : Map.Map<Nat, {
      id : Nat;
      name : Text;
      specialty : Text;
      availability : [{
        doctorId : Nat;
        availableSlots : [Int];
      }];
    }>;
    nextAppointmentId : Nat;
    nextReviewId : Nat;
    nextDoctorId : Nat;
    services : Map.Map<Text, {
      id : Text;
      displayName : Text;
      description : Text;
      featuredPhoto : ?Storage.ExternalBlob;
    }>;
  };

  public func run(old : OldActor) : NewActor {
    // Add new services map and initialize existing reviews with 'pending' state
    let newReviews = old.reviews.map<Nat, OldReview, {
      id : Nat;
      reviewerName : Text;
      text : Text;
      rating : Nat;
      photo : ?Storage.ExternalBlob;
      beforeAfterImage : ?Storage.ExternalBlob;
      state : { #pending; #approved; #rejected };
    }>(
      func(_id, oldReview) {
        {
          oldReview with
          state = #pending
        };
      }
    );

    let services = Map.empty<Text, {
      id : Text;
      displayName : Text;
      description : Text;
      featuredPhoto : ?Storage.ExternalBlob;
    }>();

    {
      old with
      reviews = newReviews;
      services;
    };
  };
};
