import {} from "@/components/shared/common/kanban/KanbanBoard";
import CustomTabs from "@/components/shared/common/tabs/CustomTabs";
import { CustomTabPanelType } from "@/types/components.types";
import { Box, Typography } from "@mui/material";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const KanbanSection = lazy(
  () => import("@/views/control-panel/dashboard/sections/KanbanSection")
);
const BacklogSection = lazy(
  () => import("@/views/control-panel/dashboard/sections/BacklogSection")
);

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

const Dashboard = () => {
  const { t } = useTranslation();
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
