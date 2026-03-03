import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import type React from "react";
import { Suspense, lazy } from "react";
import { ClinicStatusProvider } from "./context/ClinicStatusContext";
import { useLenis } from "./hooks/useLenis";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const InvisalignDetail = lazy(() => import("./pages/InvisalignDetail"));
const DentalImplantsDetail = lazy(() => import("./pages/DentalImplantsDetail"));
const LaserDentistryDetail = lazy(() => import("./pages/LaserDentistryDetail"));
const PediatricDentistryDetail = lazy(
  () => import("./pages/PediatricDentistryDetail"),
);
const SmileMakeoverDetail = lazy(() => import("./pages/SmileMakeoverDetail"));
const AccessDenied = lazy(() => import("./pages/AccessDenied"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminServiceManager = lazy(() => import("./pages/admin/ServiceManager"));
const AdminReviewApprover = lazy(() => import("./pages/admin/ReviewApprover"));
const AdminContentManager = lazy(() => import("./pages/admin/ContentManager"));
const AdminBeforeAfterManager = lazy(
  () => import("./pages/admin/BeforeAfterManager"),
);
const AdminDoctorScheduler = lazy(
  () => import("./pages/admin/DoctorScheduler"),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function AppLayout() {
  useLenis();
  return <Outlet />;
}

function AdminGuardWrapper({ children }: { children: React.ReactNode }) {
  const isAdmin = sessionStorage.getItem("adminAuthenticated") === "true";
  if (!isAdmin) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        }
      >
        <AccessDenied />
      </Suspense>
    );
  }
  return <>{children}</>;
}

const rootRoute = createRootRoute({ component: AppLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  ),
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$serviceId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServiceDetail />
    </Suspense>
  ),
});

const invisalignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/invisalign",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <InvisalignDetail />
    </Suspense>
  ),
});

const dentalImplantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/dental-implants",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DentalImplantsDetail />
    </Suspense>
  ),
});

const laserDentistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/laser-dentistry",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LaserDentistryDetail />
    </Suspense>
  ),
});

const pediatricDentistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/pediatric-dentistry",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PediatricDentistryDetail />
    </Suspense>
  ),
});

const smileMakeoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/smile-makeover",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SmileMakeoverDetail />
    </Suspense>
  ),
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/access-denied",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AccessDenied />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminGuardWrapper>
      <Suspense fallback={<PageLoader />}>
        <AdminDashboard />
      </Suspense>
    </AdminGuardWrapper>
  ),
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/appointments",
  component: () => (
    <AdminGuardWrapper>
      <Suspense fallback={<PageLoader />}>
        <AdminAppointments />
      </Suspense>
    </AdminGuardWrapper>
  ),
});

const adminServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/services",
  component: () => (
    <AdminGuardWrapper>
      <Suspense fallback={<PageLoader />}>
        <AdminServiceManager />
      </Suspense>
    </AdminGuardWrapper>
  ),
});

const adminReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reviews",
  component: () => (
    <AdminGuardWrapper>
      <Suspense fallback={<PageLoader />}>
        <AdminReviewApprover />
      </Suspense>
    </AdminGuardWrapper>
  ),
});

const adminContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/content",
  component: () => (
    <AdminGuardWrapper>
      <Suspense fallback={<PageLoader />}>
        <AdminContentManager />
      </Suspense>
    </AdminGuardWrapper>
  ),
});

const adminBeforeAfterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/before-after",
  component: () => (
    <AdminGuardWrapper>
      <Suspense fallback={<PageLoader />}>
        <AdminBeforeAfterManager />
      </Suspense>
    </AdminGuardWrapper>
  ),
});

const adminDoctorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/doctors",
  component: () => (
    <AdminGuardWrapper>
      <Suspense fallback={<PageLoader />}>
        <AdminDoctorScheduler />
      </Suspense>
    </AdminGuardWrapper>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  invisalignRoute,
  dentalImplantsRoute,
  laserDentistryRoute,
  pediatricDentistryRoute,
  smileMakeoverRoute,
  serviceDetailRoute,
  accessDeniedRoute,
  adminRoute,
  adminAppointmentsRoute,
  adminServicesRoute,
  adminReviewsRoute,
  adminContentRoute,
  adminBeforeAfterRoute,
  adminDoctorsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClinicStatusProvider>
        <RouterProvider router={router} />
      </ClinicStatusProvider>
    </QueryClientProvider>
  );
}
