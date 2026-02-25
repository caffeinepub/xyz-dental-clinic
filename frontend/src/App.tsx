import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { CursorContextProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Home from './pages/Home';
import AccessDenied from './pages/AccessDenied';
import AdminGuard from './components/AdminGuard';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import ContentManager from './pages/admin/ContentManager';
import DoctorScheduler from './pages/admin/DoctorScheduler';
import ServiceManager from './pages/admin/ServiceManager';
import ReviewApprover from './pages/admin/ReviewApprover';
import DentalImplantsDetail from './pages/DentalImplantsDetail';
import InvisalignDetail from './pages/InvisalignDetail';
import PediatricDentistryDetail from './pages/PediatricDentistryDetail';
import SmileMakeoverDetail from './pages/SmileMakeoverDetail';
import LaserDentistryDetail from './pages/LaserDentistryDetail';
import ServiceDetail from './pages/ServiceDetail';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const accessDeniedRoute = createRoute({ getParentRoute: () => rootRoute, path: '/access-denied', component: AccessDenied });

// Specific premium service detail routes (must be registered before the wildcard)
const dentalImplantsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services/dental-implants', component: DentalImplantsDetail });
const invisalignRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services/invisalign', component: InvisalignDetail });
const pediatricRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services/pediatric-dentistry', component: PediatricDentistryDetail });
const smileMakeoverRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services/smile-makeover', component: SmileMakeoverDetail });
const laserDentistryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services/laser-dentistry', component: LaserDentistryDetail });

// Generic service detail route (wildcard, catches root-canal, braces, whitening, implants, etc.)
const serviceDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services/$serviceId', component: ServiceDetail });

// Admin routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: () => <AdminGuard><Dashboard /></AdminGuard>,
});
const adminAppointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/appointments',
  component: () => <AdminGuard><Appointments /></AdminGuard>,
});
const adminContentManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/content-manager',
  component: () => <AdminGuard><ContentManager /></AdminGuard>,
});
const adminDoctorSchedulerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/doctor-scheduler',
  component: () => <AdminGuard><DoctorScheduler /></AdminGuard>,
});
const adminServiceManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/service-manager',
  component: () => <AdminGuard><ServiceManager /></AdminGuard>,
});
const adminReviewApproverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/review-approver',
  component: () => <AdminGuard><ReviewApprover /></AdminGuard>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  accessDeniedRoute,
  dentalImplantsRoute,
  invisalignRoute,
  pediatricRoute,
  smileMakeoverRoute,
  laserDentistryRoute,
  serviceDetailRoute,
  adminDashboardRoute,
  adminAppointmentsRoute,
  adminContentManagerRoute,
  adminDoctorSchedulerRoute,
  adminServiceManagerRoute,
  adminReviewApproverRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <CursorContextProvider>
          <ScrollProgressBar />
          <CustomCursor />
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </CursorContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
