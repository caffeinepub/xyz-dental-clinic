import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import DentalImplantsDetail from './pages/DentalImplantsDetail';
import InvisalignDetail from './pages/InvisalignDetail';
import PediatricDentistryDetail from './pages/PediatricDentistryDetail';
import SmileMakeoverDetail from './pages/SmileMakeoverDetail';
import LaserDentistryDetail from './pages/LaserDentistryDetail';
import AccessDenied from './pages/AccessDenied';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import ContentManager from './pages/admin/ContentManager';
import DoctorScheduler from './pages/admin/DoctorScheduler';
import ServiceManager from './pages/admin/ServiceManager';
import ReviewApprover from './pages/admin/ReviewApprover';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const dentalImplantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/dental-implants',
  component: DentalImplantsDetail,
});

const invisalignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/invisalign',
  component: InvisalignDetail,
});

const pediatricRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/pediatric-dentistry',
  component: PediatricDentistryDetail,
});

const smileMakeoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/smile-makeover',
  component: SmileMakeoverDetail,
});

const laserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/laser-dentistry',
  component: LaserDentistryDetail,
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/$serviceId',
  component: ServiceDetail,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: Dashboard,
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/appointments',
  component: Appointments,
});

const adminContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/content',
  component: ContentManager,
});

const adminDoctorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/doctors',
  component: DoctorScheduler,
});

const adminServiceManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/service-manager',
  component: ServiceManager,
});

const adminReviewApproverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/review-approver',
  component: ReviewApprover,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dentalImplantsRoute,
  invisalignRoute,
  pediatricRoute,
  smileMakeoverRoute,
  laserRoute,
  serviceDetailRoute,
  accessDeniedRoute,
  adminDashboardRoute,
  adminAppointmentsRoute,
  adminContentRoute,
  adminDoctorRoute,
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
