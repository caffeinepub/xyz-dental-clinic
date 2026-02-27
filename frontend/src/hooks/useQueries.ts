import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import {
  AppointmentStatus,
  ClinicStatus,
  ReviewInput,
  UserProfile,
  ExternalBlob,
} from '../backend';
import type { Appointment, Review, Service, Doctor, BeforeAfterPair } from '../backend';

// ─── User Profile ────────────────────────────────────────────────────────────

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

// ─── Clinic Status ────────────────────────────────────────────────────────────

export function useGetClinicStatus() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ClinicStatus>({
    queryKey: ['clinicStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getClinicStatus();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10000,
    staleTime: 5000,
  });
}

// Alias for components that use the shorter name
export const useClinicStatus = useGetClinicStatus;

export function useSetClinicStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: ClinicStatus) => {
      if (!actor) throw new Error('Actor not available');
      // The backend setClinicStatus requires adminPrincipal; pass the caller's principal
      // We pass a dummy principal since the backend uses the caller's identity for auth
      const { Principal } = await import('@dfinity/principal');
      const principal = Principal.anonymous();
      return actor.setClinicStatus(principal as any, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinicStatus'] });
    },
  });
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export function useBookAppointment() {
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
      return actor.bookAppointment(patientName, contactInfo, preferredDate, serviceType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useGetAllAppointments(options?: { enabled?: boolean; refetchInterval?: number }) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllAppointments();
    },
    enabled: (options?.enabled !== undefined ? options.enabled : true) && !!actor && !actorFetching,
    retry: false,
    refetchInterval: options?.refetchInterval,
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

// ─── Reviews ──────────────────────────────────────────────────────────────────

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewInput: ReviewInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReview(reviewInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['pendingReviews'] });
    },
  });
}

export function useGetApprovedReviews() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['reviews', 'approved'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getApprovedReviews();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetPendingReviews() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['pendingReviews'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPendingReviews();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useApproveReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['pendingReviews'] });
    },
  });
}

export function useDeleteReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['pendingReviews'] });
    },
  });
}

// ─── Doctors ──────────────────────────────────────────────────────────────────

export function useGetAllDoctors() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllDoctors();
    },
    enabled: !!actor && !actorFetching,
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
      availability: any[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDoctor(name, specialty, availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function useGetAllServices() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllServices();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetService(serviceId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Service | null>({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getService(serviceId);
    },
    enabled: !!actor && !actorFetching && !!serviceId,
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      displayName,
      description,
      featuredPhoto,
    }: {
      id: string;
      displayName: string;
      description: string;
      featuredPhoto: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addOrUpdateService(id, displayName, description, featuredPhoto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

// ─── Before/After Gallery ─────────────────────────────────────────────────────

export function useGetAllBeforeAfterPairs() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BeforeAfterPair[]>({
    queryKey: ['beforeAfterPairs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllBeforeAfterPairs();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddBeforeAfterPair() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      beforeImage,
      afterImage,
      description,
    }: {
      beforeImage: ExternalBlob;
      afterImage: ExternalBlob;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBeforeAfterPair(beforeImage, afterImage, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beforeAfterPairs'] });
    },
  });
}
