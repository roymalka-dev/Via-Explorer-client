import { CustomTabPanelType } from "@/types/components.types";
import { lazy } from "react";

const GeneralSection = lazy(
  () => import("@/views/site/profile/sections/GeneralSection")
);
const RequestsSection = lazy(
  () => import("@/views/site/profile/sections/RequestsSection")
);

export const profileTabs: CustomTabPanelType[] = [
  {
    label: "General",
    locale: "site.pages.profile.tabs.general",
    component: GeneralSection,
  },
  {
    label: "Requests",
    locale: "site.pages.profile.tabs.requests",
    component: RequestsSection,
  },
];
