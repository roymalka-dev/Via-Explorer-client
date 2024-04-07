import { RouteObject } from "@/types/routes.types";
import { lazy } from "react";
import { CircularProgress } from "@mui/material";

import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import BlankLayout from "@/layouts/BlankLayout";
import AuthRedirect from "@/views/auth/AuthRedirect";
import RedirectRoute from "@/routes/RedirectRoute";
import ControlPanelLayout from "@/layouts/control-panel/ControlPanelLayout";
import MainLayout from "@/layouts/site/MainLayout";

const HomePage = lazy(() => import("@/views/site/home/HomePage"));
const AppsPage = lazy(() => import("@/views/site/apps/AppsPage"));
const ProfilePage = lazy(() => import("@/views/site/profile/ProfilePage"));
const AppPage = lazy(() => import("@/views/site/app/AppPage"));
const RequestApp = lazy(
  () => import("@/views/site/profile/requests/RequestApp")
);
const AuthPage = lazy(() => import("@/views/auth/AuthPage"));
const NotFound = lazy(() => import("@/views/auth/NotFound"));

const Dashboard = lazy(
  () => import("@/views/control-panel/dashboard/Dashboard")
);
const ControlPanelAppsPage = lazy(
  () => import("@/views/control-panel/apps/ControlPanelAppsPage")
);
const ControlPanelRequestsPage = lazy(
  () => import("@/views/control-panel/requests/ControlPanelRequestsPage")
);
const ControlPanelUsersPage = lazy(
  () => import("@/views/control-panel/users/ControlPanelUsersPage")
);
const ControlPanelConfigurationsPage = lazy(
  () =>
    import(
      "@/views/control-panel/configurations/ControlPanelConfigurationsPage"
    )
);
export const routes: RouteObject[] = [
  {
    key: "main layout",
    path: "/",
    element: MainLayout,
    loader: CircularProgress,
    protect: ProtectedRoute,
    children: [
      {
        key: "home",
        path: "/",
        authority: "USER",
        element: HomePage,
        loader: CircularProgress,
      },
      {
        key: "apps",
        path: "/apps",
        authority: "USER",
        element: AppsPage,
        loader: CircularProgress,
      },
      {
        key: "app",
        path: "/app/:id",
        authority: "USER",
        element: AppPage,
        loader: CircularProgress,
      },
      {
        key: "profile",
        path: "/profile",
        authority: "USER",
        element: ProfilePage,
        loader: CircularProgress,
      },
      {
        key: "request-app",
        path: "/requests/request-app",
        authority: "USER",
        element: RequestApp,
        loader: CircularProgress,
      },
    ],
  },
  {
    key: "control-panel-layout",
    path: "/control-panel",
    element: ControlPanelLayout,
    loader: CircularProgress,
    //redirect: RedirectRoute({ path: "/control-panel/dashboard" }),
    protect: ProtectedRoute,
    children: [
      {
        key: "dashboard",
        path: "/control-panel/dashboard",
        authority: "ADMIN",
        element: Dashboard,
        loader: CircularProgress,
      },
      {
        key: "control-panel-apps",
        path: "/control-panel/apps",
        authority: "ADMIN",
        element: ControlPanelAppsPage,
        loader: CircularProgress,
      },
      {
        key: "control-panel-requests",
        path: "/control-panel/requests",
        authority: "ADMIN",
        element: ControlPanelRequestsPage,
        loader: CircularProgress,
      },
      {
        key: "control-panel-users",
        path: "/control-panel/users",
        authority: "ADMIN",
        element: ControlPanelUsersPage,
        loader: CircularProgress,
      },
      {
        key: "control-panel-configurations",
        path: "/control-panel/configurations",
        authority: "ADMIN",
        element: ControlPanelConfigurationsPage,
        loader: CircularProgress,
      },
    ],
  },
  {
    key: "auth",
    path: "/auth",
    element: BlankLayout,
    loader: () => {
      "loading...";
    },
    redirect: RedirectRoute({ path: "/auth/login" }),
    protect: PublicRoute,
    children: [
      {
        key: "google-auth-login",
        path: "/auth/login",
        authority: "PUBLIC",
        element: AuthPage,
        loader: CircularProgress,
      },
      {
        key: "google-auth-callback",
        path: "/auth/google/callback",
        authority: "PUBLIC",
        element: AuthRedirect,
        loader: CircularProgress,
      },
    ],
  },
  {
    key: "not-found",
    path: "*",
    element: NotFound,
    loader: CircularProgress,
    protect: PublicRoute,
    children: [],
  },
];
