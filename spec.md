# Specification

## Summary
**Goal:** Enable frictionless, zero-login appointment booking so any anonymous visitor can book an appointment directly without any authentication step.

**Planned changes:**
- Update the backend `bookAppointment` function to accept anonymous (unauthenticated) calls, storing submitted appointments in the existing data structure so they appear in the admin panel.
- Replace the existing `BookAppointmentDialog` with a frictionless form containing exactly four fields: Patient Name, Phone Number, Service (dropdown), and Preferred Date.
- On successful submission, display an inline "Thank You! Your appointment has been booked. We will contact you shortly." confirmation message inside the dialog — no redirect or login prompt.
- Remove all authentication gates from every "Book Appointment" / "Book Now" button across all public-facing pages (Home, HeroSection, Header, and all service detail pages).
- Use an anonymous actor for form submission — no Internet Identity, OTP, or sign-up required.
- Add inline validation that disables submission and shows an error if Name or Phone Number is empty.
- Keep the existing admin authentication system and admin-only data access fully intact.

**User-visible outcome:** Any visitor can click "Book Appointment" anywhere on the site, fill in four simple fields, and immediately see a thank-you confirmation — no login, no OTP, no account creation required. Submitted bookings appear in the admin panel automatically.
