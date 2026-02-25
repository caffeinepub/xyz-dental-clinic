import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AppointmentStatus, ClinicStatus, ExternalBlob } from '../backend';

// ── User Profile ──────────────────────────────────────────────────────────────
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

// ── Clinic Status ─────────────────────────────────────────────────────────────
export function useGetClinicStatus() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['clinicStatus'],
    queryFn: async () => {
      if (!actor) return null;
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

// ── Reviews ───────────────────────────────────────────────────────────────────
export function useGetApprovedReviews() {
  const { actor, isFetching } = useActor();

  return useQuery({
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

  return useQuery({
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
    mutationFn: async (input: { reviewerName: string; text: string; rating: bigint; photo?: ExternalBlob; beforeAfterImage?: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReview({
        reviewerName: input.reviewerName,
        text: input.text,
        rating: input.rating,
        photo: input.photo,
        beforeAfterImage: input.beforeAfterImage,
      });
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

export function useRejectReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingReviews'] });
      queryClient.invalidateQueries({ queryKey: ['approvedReviews'] });
    },
  });
}

// ── Appointments ──────────────────────────────────────────────────────────────
export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allAppointments'],
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
    mutationFn: async (input: { patientName: string; contactInfo: string; preferredDate: bigint; serviceType: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createAppointment(input.patientName, input.contactInfo, input.preferredDate, input.serviceType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allAppointments'] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: AppointmentStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateAppointmentStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allAppointments'] });
    },
  });
}

// ── Doctors ───────────────────────────────────────────────────────────────────
export function useGetAllDoctors() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allDoctors'],
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
    mutationFn: async (input: { name: string; specialty: string; availability: any[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDoctor(input.name, input.specialty, input.availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allDoctors'] });
    },
  });
}

export function useGetDoctorAvailability(doctorId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['doctorAvailability', doctorId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDoctorAvailability(doctorId);
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Services ──────────────────────────────────────────────────────────────────
export function useGetAllServices() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allServices'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetService(serviceId: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getService(serviceId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; displayName: string; description: string; featuredPhoto: ExternalBlob | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addOrUpdateService(input.id, input.displayName, input.description, input.featuredPhoto);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allServices'] });
      queryClient.invalidateQueries({ queryKey: ['service', variables.id] });
    },
  });
}

// ── Admin ─────────────────────────────────────────────────────────────────────
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
