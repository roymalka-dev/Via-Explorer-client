import CustomTabs from "@/components/shared/common/tabs/CustomTabs";
import { CustomTabPanelType } from "@/types/components.types";
import { Box } from "@mui/material";
import GeneralSection from "./sections/GeneralSection";
import RequestsSection from "./sections/RequestsSection";

const profileTabs: CustomTabPanelType[] = [
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

const ProfilePage = () => {
  return (
    <Box>
      <CustomTabs tabs={profileTabs} />
    </Box>
  );
};

export default ProfilePage;
