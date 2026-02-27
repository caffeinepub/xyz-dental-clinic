# Specification

## Summary
**Goal:** Fix the appointment booking form to save directly to the backend without auth barriers, and add a set of premium animations throughout the dental clinic site.

**Planned changes:**
- Fix `BookAppointmentDialog.tsx` so form submissions save directly to the backend actor, accessible to anonymous users (no Internet Identity / login prompt)
- On successful booking, display a green animated checkmark with "Appointment Confirmed!" text instead of any error state
- Add a smooth, infinitely looping float (bob up/down) animation to a dental icon or doctor image in the Hero section
- Make all "Book Now" buttons magnetic — they subtly translate toward the cursor on hover proximity and return to original position when the cursor leaves
- Add staggered word-by-word slide/bounce-up reveal animations to all major section headings, triggered when each heading scrolls into view
- Replace the static white page background with an animated liquid blue gradient that creates a wave/fluid effect responding to mouse movement
- Add a fixed scroll-progress bar at the top of the page that fills left to right as the user scrolls down

**User-visible outcome:** Patients can book appointments without any login barrier and see a confirmation animation on success. The site features a dynamic animated background, magnetic buttons, staggered heading reveals, a floating hero element, and a scroll progress indicator for a premium feel.
