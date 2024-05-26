import { RouteObject } from "@/types/routes.types";
import { lazy } from "react";

import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import BlankLayout from "@/layouts/BlankLayout";
import AuthRedirect from "@/views/auth/AuthRedirect";
import RedirectRoute from "@/routes/RedirectRoute";
import ControlPanelLayout from "@/layouts/control-panel/ControlPanelLayout";
import MainLayout from "@/layouts/site/MainLayout";
import ViaSpinnerLoader from "@/components/shared/common/loaders/ViaSpinnerLoader";

const HomePage = lazy(() => import("@/views/site/home/HomePage"));
const AppsPage = lazy(() => import("@/views/site/apps/AppsPage"));
const ProfilePage = lazy(() => import("@/views/site/profile/ProfilePage"));
const AppPage = lazy(() => import("@/views/site/app/AppPage"));
const RequestApp = lazy(
  () => import("@/views/site/profile/requests/RequestApp")
);
const viewAppRequest = lazy(
  () => import("@/views/site/profile/requests/ViewAppRequest")
);
const AuthPage = lazy(() => import("@/views/auth/AuthPage"));
const NotFound = lazy(() => import("@/views/auth/NotFound"));
const AccessDenied = lazy(() => import("@/views/auth/AccessDenied"));

//const Dashboard = lazy(() => import("@/views/control-panel/dashboard/Dashboard"));
const ControlPanelAppsPage = lazy(
  () => import("@/views/control-panel/apps/ControlPanelAppsPage")
);
// const ControlPanelRequestsPage = lazy(() => import("@/views/control-panel/requests/ControlPanelRequestsPage"));
const ControlPanelUsersPage = lazy(
  () => import("@/views/control-panel/users/ControlPanelUsersPage")
);
const ControlPanelConfigurationsPage = lazy(
  () =>
    import(
      "@/views/control-panel/configurations/ControlPanelConfigurationsPage"
    )
);

const ControlPanelActivityMonitorPage = lazy(
  () =>
    import(
      "@/views/control-panel/activity-monitor/ControlPanelActivityMonitorPage"
    )
);

export const routes: RouteObject[] = [
  {
    key: "main layout",
    path: "/",
    element: MainLayout,
    loader: ViaSpinnerLoader,
    protect: ProtectedRoute,
    children: [
      {
        key: "home",
        path: "/",
        authority: "USER",
        element: HomePage,
        loader: ViaSpinnerLoader,
      },
      {
        key: "apps",
        path: "/apps",
        authority: "USER",
        element: AppsPage,
        loader: ViaSpinnerLoader,
      },
      {
        key: "app",
        path: "/app/:id",
        authority: "USER",
        element: AppPage,
        loader: ViaSpinnerLoader,
      },
      {
        key: "profile",
        path: "/profile",
        authority: "USER",
        element: ProfilePage,
        loader: ViaSpinnerLoader,
      },
      {
        key: "request-app",
        path: "/requests/request-app",
        authority: "USER",
        element: RequestApp,
        loader: ViaSpinnerLoader,
      },
      {
        key: "view-app-request",
        path: "/requests/view/:id",
        authority: "USER",
        element: viewAppRequest,
        loader: ViaSpinnerLoader,
      },
    ],
  },
  {
    key: "control-panel-layout",
    path: "/control-panel",
    element: ControlPanelLayout,
    loader: ViaSpinnerLoader,
    redirect: RedirectRoute({
      from: "/control-panel",
      to: "/control-panel/apps",
    }),
    protect: ProtectedRoute,
    children: [
      /*
      {
        key: "dashboard",
        path: "/control-panel/dashboard",
        authority: "ADMIN",
        element: Dashboard,
        loader: ViaSpinnerLoader,
      },
      */
      {
        key: "control-panel-apps",
        path: "/control-panel/apps",
        authority: "ADMIN",
        element: ControlPanelAppsPage,
        loader: ViaSpinnerLoader,
      },
      /*
      {
        key: "control-panel-requests",
        path: "/control-panel/requests",
        authority: "ADMIN",
        element: ControlPanelRequestsPage,
        loader: ViaSpinnerLoader,
      },
      */
      {
        key: "control-panel-users",
        path: "/control-panel/users",
        authority: "ADMIN",
        element: ControlPanelUsersPage,
        loader: ViaSpinnerLoader,
      },
      {
        key: "control-panel-configurations",
        path: "/control-panel/configurations",
        authority: "ADMIN",
        element: ControlPanelConfigurationsPage,
        loader: ViaSpinnerLoader,
      },
      {
        key: "control-panel-activity-monitor",
        path: "/control-panel/activity-monitor",
        authority: "ADMIN",
        element: ControlPanelActivityMonitorPage,
        loader: ViaSpinnerLoader,
      },
    ],
  },
  {
    key: "auth",
    path: "/auth",
    element: BlankLayout,
    loader: ViaSpinnerLoader,
    redirect: RedirectRoute({ from: "/auth", to: "/auth/login" }),
    protect: PublicRoute,
    children: [
      {
        key: "google-auth-login",
        path: "/auth/login",
        authority: "PUBLIC",
        element: AuthPage,
        loader: ViaSpinnerLoader,
      },
      {
        key: "google-auth-callback",
        path: "/auth/google/callback",
        authority: "PUBLIC",
        element: AuthRedirect,
        loader: ViaSpinnerLoader,
      },
    ],
  },
  {
    key: "not-found",
    path: "*",
    element: NotFound,
    loader: ViaSpinnerLoader,
    protect: PublicRoute,
    children: [],
  },
  {
    key: "access-denied",
    path: "/access-denied",
    element: AccessDenied,
    loader: ViaSpinnerLoader,
    protect: PublicRoute,
    children: [],
  },
];
