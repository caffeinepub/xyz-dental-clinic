# XYZ Dental Clinic

## Current State
- Full dental clinic website with Hero, Services Grid, Doctor Profile, Before/After Slider, Testimonials, Contact, Footer
- Footer has Tooth Logo that opens Admin login popup (credentials: 6352174912 / 63521)
- Admin panel at /admin with appointments, services, reviews, before/after, doctor scheduler
- Appointments saved to localStorage, displayed in admin panel
- BookAppointmentDialog already slides up from bottom (slideUpModal animation)
- ServicesGrid shows 5 services with scroll reveal
- HeroSection has entry animations but basic (translateY only)
- No heartbeat animation on Book Appointment button
- No confetti/success animation on booking confirm
- No expandable service cards with detailed descriptions
- Footer already has custom copyright (no Caffeine AI branding)
- No scroll-reveal fade-in for photos/testimonials
- No hover lift effect explicitly on service cards (only hover:shadow-xl and hover:-translate-y-1)

## Requested Changes (Diff)

### Add
- Hero Section: Left text slides in from left (translateX), doctor image scales up from small (scale 0 → 1) on load
- Hero "Book Appointment" button: heartbeat/pulse animation (dhak-dhak effect)
- ServicesGrid: Expandable cards — click to expand with service details below the icon/title
  - Root Canal: "Dard-mukt ilaaj, 30 min mein."
  - Implants: "Zindagi bhar ka saath, asli danton jaisi mazbooti."
  - All 5 services get expand text
- Appointment booking: Already a modal that slides up — enhance modal entry animation to be smoother (slide from bottom)
- Success state: Add confetti animation + green checkmark bounce on appointment success
- Scroll Reveal: Photos, testimonials, service cards fade-in on scroll (already partial — enhance)
- Hover Lift: All cards get translateY(-6px) lift + box-shadow glow on hover
- Footer: Ensure footer only shows "© 2026 XYZ Dental Clinic - Quality Dental Care" — no third-party branding

### Modify
- HeroSection: Left text block animates from left (translateX(-60px) → 0), doctor image animates scale(0.5) → scale(1) with spring-like ease
- HeroSection "Book Appointment" button: Add CSS heartbeat animation (@keyframes heartbeat)
- ServicesGrid: Convert service buttons to expandable cards with toggle expand/collapse logic, showing description text on click
- BookAppointmentDialog: Enhance slideUpModal animation from bottom
- BookAppointmentDialog success state: Add confetti burst effect using CSS/JS particles
- Footer: Clean copyright line to "© 2026 XYZ Dental Clinic - Quality Dental Care"
- TestimonialCarousel / photos: Add IntersectionObserver fade-in on scroll
- Service card hover: Ensure all cards lift up (translateY) with glow box-shadow

### Remove
- Any remaining Caffeine AI references in footer or elsewhere
- Custom cursor circle (already removed per previous versions)

## Implementation Plan
1. Update HeroSection.tsx:
   - Left content: animate from translateX(-60px) to 0 with opacity fade-in
   - Image: animate from scale(0.6) rotate(-5deg) to scale(1) rotate(0) on mount
   - Book Appointment button: add @keyframes heartbeat CSS animation (scale pulse)
2. Update ServicesGrid.tsx:
   - Add expandedId state to track which card is open
   - On click, toggle expanded state for that service card
   - Show detailed description text that slides down smoothly
   - Include expand/collapse text for all 5 services
   - Keep hover lift + glow effects
3. Update BookAppointmentDialog.tsx:
   - Enhance success state with confetti particle burst (CSS keyframes with multiple colored particles)
   - Green checkmark with bounceIn animation already present — enhance it
4. Update Footer.tsx:
   - Ensure copyright says "© 2026 XYZ Dental Clinic - Quality Dental Care"
5. Scroll reveal enhancements in TestimonialCarousel and BeforeAfterSlider with IntersectionObserver fade-in
