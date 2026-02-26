# Specification

## Summary
**Goal:** Replace the hidden admin trigger with a visible footer tooth logo, consolidate the admin dashboard into a single view, and confirm/enforce all existing UX and animation features across the XYZ Dental Clinic site.

**Planned changes:**
- Remove the invisible HiddenAdminTrigger hit-box component from App.tsx and Footer; replace it with a small (28–36px), semi-transparent teal/royal-blue tooth icon visibly placed in the Footer that opens the HiddenAdminLoginModal on single click.
- Consolidate the Admin Dashboard into one page with three sections: (1) Appointments table (Patient Name, Phone, Service, Date/Time) with React Query auto-refresh ≤10s; (2) Clinic Status toggle (Open/Closed/Emergency) controlling the public ClinicStatusBanner; (3) Service Manager CMS for editing name, description, and photo of all 5 premium services, persisted to backend.
- Audit and ensure BookAppointmentDialog is fully frictionless (no auth/login prompt), contains Patient Name and Phone Number fields, shows inline confirmation on submit, and is opened directly by every "Book Appointment"/"Book Now" button across all public pages.
- Confirm the "XYZ Dental Clinic" brand name in the Header triggers `window.location.reload()` on click with no router navigation and unchanged visual styling.
- Confirm the custom cursor follower (circle, trail, "View" text) is fully removed; no `cursor: none` on body/html; native OS cursor is active everywhere.
- Confirm and enforce an animated mesh gradient background (light white → pale silver → soft blue, 15–20s loop) applied at root layout level across all pages.
- Confirm and enforce scroll-triggered reveal animations (text: fade-in + slide-up; images: scale from 0.85 + fade-in) via IntersectionObserver on ServicesGrid, DoctorProfile, TestimonialCarousel, BeforeAfterSlider, ContactSection, and all service detail page sections.
- Confirm the interactive Before/After drag slider (mouse and touch) is prominently displayed in a labeled "Results Gallery" section on the Home page.
- Confirm and enforce soft glow hover effect (translateY -6px to -8px + teal/royal-blue box-shadow, ~300ms transition) on all 5 premium service cards, coexisting with existing card-specific animations.

**User-visible outcome:** Admins can access the login modal via a visible tooth icon in the footer, and manage appointments, clinic status, and service content from a single consolidated dashboard. Patients can book appointments instantly without any login. All animations, the before/after gallery, hover effects, and the animated background are consistently present and functional across the entire site.
