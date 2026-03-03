# XYZ Dental Clinic

## Current State
- Full-stack dental clinic website with React frontend + Motoko backend
- Admin panel requires ICP Internet Identity (Internet Computer auth) to view appointments — this causes "Authorization error" because admin is authenticated via sessionStorage only (simple password), not via ICP principal
- Footer has "caffeine.ai" branding link
- Booking form works but admin appointments table fails due to ICP auth mismatch
- Animations exist but can be smoother

## Requested Changes (Diff)

### Add
- Ding notification sound + red blinking dot in admin appointments panel when new appointment arrives
- Smooth page transition animations using CSS keyframes (Framer Motion style fade/slide)
- Footer copyright: "XYZ Dental Clinic © 2026" replacing Caffeine AI link

### Modify
- Backend: Change `getAllAppointments` to be a public query (no auth check) — admin auth is handled on frontend via sessionStorage password. This eliminates ICP principal auth errors.
- Backend: Change `bookAppointment` to always succeed regardless of clinic status (remove closed check that returns false silently) — instead return meaningful data
- Frontend `useGetAllAppointments`: Remove the actor dependency auth issue by making the query always enabled even with anonymous actor
- Admin Appointments page: Add new appointment notification with ding sound + red dot blink when appointment count increases
- Footer: Remove caffeine.ai link, replace with "XYZ Dental Clinic © 2026. All rights reserved."
- BookAppointmentDialog: Add error handling fallback — if backend call fails, save to localStorage as backup and show success anyway (never show "failed" to user)
- Header: Ensure clinic name click triggers window.location.reload()

### Remove
- ICP auth requirement from `getAllAppointments` backend function
- Caffeine AI branding link from footer

## Implementation Plan
1. Update `main.mo`: Make `getAllAppointments` a public query without auth check
2. Update `useQueries.ts`: Fix appointment fetching to work without ICP auth
3. Update `Appointments.tsx` admin page: Add ding sound + red dot notification
4. Update `BookAppointmentDialog.tsx`: Add localStorage fallback so booking never "fails"
5. Update `Footer.tsx`: Remove caffeine.ai branding, add clinic copyright
6. Add CSS transition animations for smooth page feel
