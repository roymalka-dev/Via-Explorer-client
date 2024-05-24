import useFetchConfigurations from "@/hooks/useFetchConfigurations";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Outlet } from "react-router-dom";

const MainWrapperLayout = () => {
  useFetchConfigurations();
  useScrollToTop();

  return <Outlet />;
};

export default MainWrapperLayout;
