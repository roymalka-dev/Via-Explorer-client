import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense } from "react";
import { RouteObject } from "@/types/routes.types";
import { routes } from "@/configs/routes.config";
import AuthorityGuard from "./AuthorityGuard";

// Auth

export const router = createBrowserRouter(
  createRoutesFromElements(
    routes?.map((route: RouteObject) => {
      return (
        /* Protected Route Gate */
        <Route
          key={route.key + "protect"}
          path={route.path}
          element={
            <Suspense fallback={<route.loader />}>
              <route.protect />
            </Suspense>
          }
        >
          {/* Layout */}
          <Route
            key={route.key}
            path={route.path}
            element={
              <Suspense fallback={<route.loader />}>
                {route.redirect && route.redirect}
                <route.element />
              </Suspense>
            }
          >
            {route.children?.map((child: RouteObject) => {
              return (
                /* Authority Guard */
                <Route
                  key={child.key + "auth"}
                  path={child.path}
                  element={
                    <Suspense fallback={<child.loader />}>
                      <AuthorityGuard pageAuth={child.authority || ""} />
                    </Suspense>
                  }
                >
                  {/* Page */}
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
    })
  )
);
