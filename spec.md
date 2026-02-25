# Specification

## Summary
**Goal:** Enhance the XYZ Dental Clinic admin panel with Service Manager and Review Approver features, and add several visual upgrades to the public site including glassmorphism cards, a scroll progress bar, floating dental elements, and a context-sensitive magnetic cursor.

**Planned changes:**
- Add a "Service Manager" section to the admin panel allowing the admin to edit the name, description, and featured photo for each of the 5 premium services (Dental Implants, Invisalign, Pediatric Dentistry, Smile Makeover, Laser Dentistry); changes are persisted and reflected on public service cards and detail pages.
- Add a "Review Approver" section to the admin panel where newly submitted reviews are held in a pending state and only go live on the public testimonial carousel after admin approval; admins can approve or reject each pending review.
- Apply glassmorphism styling (backdrop-filter blur, semi-transparent background) to service cards, testimonial cards, the doctor profile card, and admin panel content cards so the animated mesh gradient background shows through.
- Add a fixed 3–4px horizontal scroll-progress bar at the very top of the viewport that fills left-to-right as the user scrolls, using the site's teal/royal-blue accent color.
- Add at least 4 floating semi-transparent dental element icons (tooth, dental mirror, toothbrush, plus/cross) positioned near page corners/edges with gentle float animations and scroll-based parallax offset.
- Enhance the existing custom cursor so it switches to a dental-themed icon (tooth or plus SVG) when hovering over any service card, then reverts when moving off.
- Serve all new floating dental element images as static assets in `frontend/public/assets/generated`.

**User-visible outcome:** Admins can manage service content and moderate reviews via the admin panel. Public visitors see glassmorphism-styled cards, a scroll progress indicator, gently floating dental decorations, and a context-aware cursor that changes to a dental icon over service cards.
