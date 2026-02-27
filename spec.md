# Specification

## Summary
**Goal:** Fix the `BookAppointmentDialog` component so the "Connection issue" error/retry banner does not appear unexpectedly on dialog open.

**Planned changes:**
- Clear any stale localStorage pending appointment data on dialog mount so it does not incorrectly trigger the connection error state.
- Ensure the connection error/retry banner is only shown after an actual failed backend submission attempt, not on initial load or when stale data exists from a previous session.
- After a successful appointment submission, clear the pending localStorage entry so the retry banner does not appear on the next dialog open.
- Keep the Retry button functional so it re-attempts submission using locally saved data after a genuine failure.

**User-visible outcome:** Opening the appointment booking dialog no longer shows the "Connection issue" banner unexpectedly. The banner only appears when a real network or backend failure occurs during form submission.
