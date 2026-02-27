# Specification

## Summary
**Goal:** Fix the admin panel Appointments page so that appointments load correctly for authenticated admins.

**Planned changes:**
- Fix AdminGuard to correctly read `adminAuth` from sessionStorage and not redirect authenticated admins to the home page
- Ensure valid auth state is passed to child routes within the admin panel
- Fix the backend authorization check so that fetching all appointments succeeds when called by an authenticated admin session

**User-visible outcome:** An authenticated admin can navigate to the Appointments page and see all appointments load correctly, with no auth-related errors or empty states.
