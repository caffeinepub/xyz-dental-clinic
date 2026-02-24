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
export interface DoctorAvailability {
    doctorId: bigint;
    availableSlots: Array<Time>;
}
export type Time = bigint;
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
export interface UserProfile {
    name: string;
}
export interface Review {
    id: bigint;
    beforeAfterImage?: ExternalBlob;
    text: string;
    reviewerName: string;
    rating: bigint;
    photo?: ExternalBlob;
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdmin(adminPrincipal: Principal): Promise<void>;
    addDoctor(name: string, specialty: string, availability: Array<DoctorAvailability>): Promise<bigint>;
    addReview(reviewerName: string, text: string, rating: bigint, photo: ExternalBlob | null, beforeAfterImage: ExternalBlob | null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAppointment(patientName: string, contactInfo: string, preferredDate: Time, serviceType: string): Promise<Appointment>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllDoctors(): Promise<Array<Doctor>>;
    getAllReviews(): Promise<Array<Review>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClinicStatus(): Promise<ClinicStatus>;
    getDoctorAvailability(doctorId: bigint): Promise<Array<DoctorAvailability> | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setClinicStatus(status: ClinicStatus): Promise<void>;
    updateAppointmentStatus(appointmentId: bigint, newStatus: AppointmentStatus): Promise<void>;
}
