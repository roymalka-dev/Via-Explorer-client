/* eslint-disable @typescript-eslint/no-explicit-any */
export type RouteObject = {
  children?: RouteObject[];
  element?: any;
  loader?: any;
  redirect?: any;
  protect?: any;
  key?: string;
  path?: string;
  authority?: string;
};
