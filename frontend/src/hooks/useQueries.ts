import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Appointment, AppointmentStatus, Review, Doctor, DoctorAvailability, ClinicStatus, UserProfile } from '../backend';
import { ExternalBlob } from '../backend';
import type { Principal } from '@dfinity/principal';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Clinic Status Queries
export function useGetClinicStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<ClinicStatus>({
    queryKey: ['clinicStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getClinicStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Poll every 30 seconds for real-time updates
  });
}

export function useSetClinicStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: ClinicStatus) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setClinicStatus(status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinicStatus'] });
    },
  });
}

// Review Queries
export function useGetAllReviews() {
  const { actor, isFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewerName,
      text,
      rating,
      photo,
      beforeAfterImage,
    }: {
      reviewerName: string;
      text: string;
      rating: bigint;
      photo: ExternalBlob | null;
      beforeAfterImage: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReview(reviewerName, text, rating, photo, beforeAfterImage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

// Appointment Queries
export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();

  return useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      patientName,
      contactInfo,
      preferredDate,
      serviceType,
    }: {
      patientName: string;
      contactInfo: string;
      preferredDate: bigint;
      serviceType: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createAppointment(patientName, contactInfo, preferredDate, serviceType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appointmentId,
      newStatus,
    }: {
      appointmentId: bigint;
      newStatus: AppointmentStatus;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateAppointmentStatus(appointmentId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

// Doctor Queries
export function useGetAllDoctors() {
  const { actor, isFetching } = useActor();

  return useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDoctors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDoctor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      specialty,
      availability,
    }: {
      name: string;
      specialty: string;
      availability: DoctorAvailability[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDoctor(name, specialty, availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}

export function useGetDoctorAvailability(doctorId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<DoctorAvailability[] | null>({
    queryKey: ['doctorAvailability', doctorId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDoctorAvailability(doctorId);
    },
    enabled: !!actor && !isFetching,
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
