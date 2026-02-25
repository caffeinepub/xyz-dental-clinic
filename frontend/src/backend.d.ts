import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface Service {
    id: string;
    displayName: string;
    featuredPhoto?: ExternalBlob;
    description: string;
}
export interface DoctorAvailability {
    doctorId: bigint;
    availableSlots: Array<Time>;
}
export interface Doctor {
    id: bigint;
    name: string;
    specialty: string;
    availability: Array<DoctorAvailability>;
}
export interface Appointment {
    id: bigint;
    status: AppointmentStatus;
    doctorId?: bigint;
    serviceType: string;
    contactInfo: string;
    preferredDate: Time;
    patientName: string;
}
export interface ReviewInput {
    beforeAfterImage?: ExternalBlob;
    text: string;
    reviewerName: string;
    rating: bigint;
    photo?: ExternalBlob;
}
export interface Review {
    id: bigint;
    beforeAfterImage?: ExternalBlob;
    text: string;
    reviewerName: string;
    state: ReviewState;
    rating: bigint;
    photo?: ExternalBlob;
}
export interface UserProfile {
    name: string;
}
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum ClinicStatus {
    closed = "closed",
    emergency = "emergency",
    open = "open"
}
export enum ReviewState {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdmin(adminPrincipal: Principal): Promise<void>;
    addDoctor(name: string, specialty: string, availability: Array<DoctorAvailability>): Promise<bigint>;
    addOrUpdateService(id: string, displayName: string, description: string, featuredPhoto: ExternalBlob | null): Promise<void>;
    addReview(reviewInput: ReviewInput): Promise<void>;
    approveReview(reviewId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAppointment(patientName: string, contactInfo: string, preferredDate: Time, serviceType: string): Promise<Appointment>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllDoctors(): Promise<Array<Doctor>>;
    getAllServices(): Promise<Array<Service>>;
    getApprovedReviews(): Promise<Array<Review>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClinicStatus(): Promise<ClinicStatus>;
    getDoctorAvailability(doctorId: bigint): Promise<Array<DoctorAvailability> | null>;
    getPendingReviews(): Promise<Array<Review>>;
    getService(serviceId: string): Promise<Service | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    rejectReview(reviewId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setClinicStatus(status: ClinicStatus): Promise<void>;
    updateAppointmentStatus(appointmentId: bigint, newStatus: AppointmentStatus): Promise<void>;
}
