# Specification

## Summary
**Goal:** Fix the BookAppointmentDialog form design for clarity and polish, and confirm/enforce several existing site-wide features including cursor behavior, scroll animations, animated background, header reload, footer secret admin entry, and the Before/After drag slider.

**Planned changes:**
- Apply a solid pure white (#FFFFFF) background with a soft drop shadow to the BookAppointmentDialog container, removing any transparency or backdrop-filter.
- Style all booking form input fields with a light grey border by default and a teal glow (#0D9488) on focus with a ~200ms transition.
- Ensure all text inside the booking form uses high-contrast dark colors (#111827 or #1F2937) against the white background.
- Confirm and enforce the Footer has a small (28–36px) semi-transparent tooth SVG icon that opens the HiddenAdminLoginModal on click, with credentials username '6352174912' and password '63521'.
- Confirm and enforce that clicking the 'XYZ Dental Clinic' brand name in the Header triggers a full page reload (window.location.reload()) with no router navigation.
- Confirm and enforce that no custom cursor component or CSS cursor override is active; the native OS cursor must be used site-wide.
- Confirm and enforce scroll-triggered fade-in + slide-up reveal animations (via IntersectionObserver) on all major sections: ServicesGrid, DoctorProfile, TestimonialCarousel, BeforeAfterSlider gallery, ContactSection, and service detail page sections.
- Confirm and enforce the animated mesh gradient background (light white, pale silver, soft blue, 15–20s loop) is applied at the root layout level across all pages.
- Confirm the BeforeAfterSlider is prominently displayed in a clearly labeled 'Results Gallery' section on the Home page, supporting mouse and touch drag.

**User-visible outcome:** The appointment booking form appears clean, elevated, and fully readable on a white background with polished input interactions. All previously requested site features — native cursor, scroll animations, animated background, header refresh, footer admin access, and the Before/After gallery slider — are consistently enforced across the site.
