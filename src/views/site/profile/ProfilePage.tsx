import CustomTabs from "@/components/shared/common/tabs/CustomTabs";
import { CustomTabPanelType } from "@/types/components.types";
import { Box, useTheme } from "@mui/material";
import GeneralSection from "./sections/GeneralSection";
import RequestsSection from "./sections/RequestsSection";

const profileTabs: CustomTabPanelType[] = [
  {
    label: "General",
    locale: "site.pages.profile.tabs.general.title",
    component: GeneralSection,
  },
  {
    label: "Requests",
    locale: "site.pages.profile.tabs.requests.title",
    component: RequestsSection,
  },
];

const ProfilePage = () => {
  const theme = useTheme();
  return (
    <Box dir={theme.direction}>
      <CustomTabs tabs={profileTabs} />
    </Box>
  );
};

export default ProfilePage;
