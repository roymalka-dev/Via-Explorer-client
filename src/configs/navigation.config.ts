import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { navItemObject } from "@/types/navigation.types";
//import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
//import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { PngIcon } from "@/components/shared/ui/icons/LogoIcon";

export const navigationItems: navItemObject[] = [
  {
    name: "Apps",
    locale: "site.components.navbar.apps",
    path: "/apps",
    icon: AppsRoundedIcon,
  },
  {
    name: "",
    locale: "",
    path: "/",
    icon: PngIcon,
  },
  {
    name: "Profile",
    locale: "site.components.navbar.profile",
    path: "/profile",
    icon: PersonRoundedIcon,
  },
];

export const controlPanelNavigationItems: navItemObject[] = [
  /*
  {
    name: "Dashboard",
    locale: "controlPanel.components.navbar.dashboard",
    path: "/control-panel/dashboard",
    icon: DesktopWindowsIcon,
  },
  */
  {
    name: "Apps",
    locale: "controlPanel.components.navbar.apps",
    path: "/control-panel/apps",
    icon: AppsRoundedIcon,
  },
  /*
  {
    name: "Requests",
    locale: "controlPanel.components.navbar.requests",
    path: "/control-panel/requests",
    icon: AssignmentIcon,
  },
  */
  {
    name: "Users",
    locale: "controlPanel.components.navbar.users",
    path: "/control-panel/users",
    icon: PersonRoundedIcon,
  },
  {
    name: "Configurations",
    locale: "controlPanel.components.navbar.configurations",
    path: "/control-panel/configurations",
    icon: SettingsRoundedIcon,
  },
  {
    name: "Return to Site",
    locale: "controlPanel.components.navbar.returnToSite",
    path: "/",
    icon: KeyboardReturnIcon,
  },
];
