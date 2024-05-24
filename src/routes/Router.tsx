import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense } from "react";
import { RouteObject } from "@/types/routes.types"; // Type definition for route objects
import { routes } from "@/configs/routes.config"; // Importing route configurations
import AuthorityGuard from "./AuthorityGuard"; // Importing the AuthorityGuard component for protected routes
import MainWrapperLayout from "@/layouts/MainWrapperLayout";

/**
 * This configuration sets up the application's routing using `react-router-dom`.
 * It leverages the `createBrowserRouter` and `createRoutesFromElements` to dynamically
 * create routes based on a predefined configuration (`routes`).
 *
 * Each route is wrapped with lazy loading using `Suspense` and an optional `AuthorityGuard`
 * for route protection based on user roles or permissions.
 */
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainWrapperLayout />}>
      // Mapping over the `routes` configuration to create route elements
      {routes?.map((route: RouteObject) => {
        return (
          // Wrapping each route with a protection layer (if defined)
          <Route
            key={route.key + "protect"}
            path={route.path}
            element={<route.protect />}
          >
            {/* Main route element with optional layout and lazy loading */}
            <Route
              key={route.key}
              path={route.path}
              element={
                <Suspense fallback={<route.loader />}>
                  {/* Redirect if specified, else render the main route component */}
                  {route.redirect && route.redirect}
                  <route.element />
                </Suspense>
              }
            >
              {/* Nested routes for child components, if any */}
              {route.children?.map((child: RouteObject) => {
                return (
                  // Each child route is wrapped with an `AuthorityGuard` for access control
                  <Route
                    key={child.key + "auth"}
                    path={child.path}
                    element={
                      <AuthorityGuard pageAuth={child.authority || ""} />
                    }
                  >
                    {/* Child route element with lazy loading */}
                    <Route
                      key={child.key}
                      path={child.path}
                      element={
                        <Suspense fallback={<child.loader />}>
                          <child.element />
                        </Suspense>
                      }
                    />
                  </Route>
                );
              })}
            </Route>
          </Route>
        );
      })}
    </Route>
  )
);
