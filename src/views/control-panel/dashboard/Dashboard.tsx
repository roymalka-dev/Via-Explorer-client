import {} from "@/components/shared/common/kanban/KanbanBoard";
import CustomTabs from "@/components/shared/common/tabs/CustomTabs";
import { CustomTabPanelType } from "@/types/components.types";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import KanbanSection from "./sections/KanbanSection";
import BacklogSection from "./sections/BacklogSection";

/**
 * Component for the Control Panel Dashboard.
 * This page serves as the dashboard for the control panel, displaying different sections like Kanban and Backlog.
 */
const Dashboard = () => {
  const { t } = useTranslation();

  /**
   * Array defining the tabs to be displayed on the dashboard.
   * Each tab contains a label, locale for internationalization, and the component to render.
   */
  const dashboardTabs: CustomTabPanelType[] = [
    {
      label: "Kanban",
      locale: "controlPanel.pages.dashboard.sections.kanban.title",
      component: KanbanSection,
    },
    {
      label: "Backlog",
      locale: "controlPanel.pages.dashboard.sections.backlog.title",
      component: BacklogSection,
    },
  ];
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {t("controlPanel.pages.dashboard.sections.title")}
      </Typography>

      <CustomTabs tabs={dashboardTabs} />
    </Box>
  );
};

export default Dashboard;
