import { Navigate } from "react-router-dom";

const RedirectRoute = ({ from, to }: { from: string; to: string }) => {
  const currentPath = window.location.pathname;

  if (currentPath === from || currentPath === `${from}/`) {
    return <Navigate to={to} replace />;
  }

  return null;
};

export default RedirectRoute;
