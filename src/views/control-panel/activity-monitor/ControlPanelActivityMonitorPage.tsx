import { CustomTabPanelType } from "@/types/components.types";
import { Box, Typography } from "@mui/material";
import LogsSection from "./sections/logger/LogsSection";
import MonitorSection from "./sections/monitor/MonitorSection";
import CustomTabs from "@/components/shared/common/tabs/CustomTabs";
import { useTranslation } from "react-i18next";

const ControlPanelActivityMonitorPage = () => {
  const { t } = useTranslation();
  const activityMonitorTabs: CustomTabPanelType[] = [
    {
      label: "Logs",
      locale: "Logs",
      component: LogsSection,
    },
    {
      label: "Monitor",
      locale: "Monitor",
      component: MonitorSection,
    },
  ];
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {t("Activity Monitor")}
      </Typography>

      <CustomTabs tabs={activityMonitorTabs} />
    </Box>
  );
};

export default ControlPanelActivityMonitorPage;
