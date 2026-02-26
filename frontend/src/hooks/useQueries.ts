import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AppointmentStatus, ClinicStatus, type Appointment, type Service, type Review, type ReviewInput, ExternalBlob } from '../backend';

// ─── Admin Check ──────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10_000,
  });
}

export function useBookAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      patientName: string;
      contactInfo: string;
      preferredDate: bigint;
      serviceType: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.bookAppointment(
        params.patientName,
        params.contactInfo,
        params.preferredDate,
        params.serviceType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

// Alias for backward compatibility
export const useCreateAppointment = useBookAppointment;

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

// ─── Clinic Status ────────────────────────────────────────────────────────────

export function useGetClinicStatus() {
  const { actor, isFetching } = useActor();
  return useQuery<ClinicStatus>({
    queryKey: ['clinicStatus'],
    queryFn: async () => {
      if (!actor) return ClinicStatus.open;
      return actor.getClinicStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
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

// ─── Services ─────────────────────────────────────────────────────────────────

export function useGetAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetService(serviceId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Service | null>({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getService(serviceId);
    },
    enabled: !!actor && !isFetching && !!serviceId,
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: string;
      displayName: string;
      description: string;
      featuredPhoto: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addOrUpdateService(
        params.id,
        params.displayName,
        params.description,
        params.featuredPhoto
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export function useGetApprovedReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ['approvedReviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPendingReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ['pendingReviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewInput: ReviewInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReview(reviewInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingReviews'] });
      queryClient.invalidateQueries({ queryKey: ['approvedReviews'] });
    },
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
      queryClient.invalidateQueries({ queryKey: ['pendingReviews'] });
      queryClient.invalidateQueries({ queryKey: ['approvedReviews'] });
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
      queryClient.invalidateQueries({ queryKey: ['pendingReviews'] });
      queryClient.invalidateQueries({ queryKey: ['approvedReviews'] });
    },
  });
}

// ─── Doctors ──────────────────────────────────────────────────────────────────

export function useGetAllDoctors() {
  const { actor, isFetching } = useActor();
  return useQuery({
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
    mutationFn: async (params: { name: string; specialty: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDoctor(params.name, params.specialty, []);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}

// ─── Before/After Gallery ─────────────────────────────────────────────────────

export function useGetAllBeforeAfterPairs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['beforeAfterPairs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBeforeAfterPairs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBeforeAfterPair() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      beforeImage: ExternalBlob;
      afterImage: ExternalBlob;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBeforeAfterPair(params.beforeImage, params.afterImage, params.description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beforeAfterPairs'] });
    },
  });
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery({
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
    mutationFn: async (profile: { name: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
