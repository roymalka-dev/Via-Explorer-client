import { toastConfig } from "@/configs/toast.config";
import useApi from "@/hooks/useApi";
import { logType } from "@/types/logs.type";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import CustomTable from "@/components/shared/common/table/CustomTable";
import { tableDataGenerator } from "@/utils/components.utils";
import { getControlPanelLogCols } from "./data/cols";
import LogDatePicker from "./table/LogDatePicker";
const LogsSection = () => {
  const { t } = useTranslation();

  const [logsDate, setLogsDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [rows, setRows] = useState<logType[]>([]);

  const { data, status, error } = useApi<logType[]>(
    `logs/get-logs?date=${logsDate}`,
    "GET",
    undefined,
    [],
    false
  );

  // Effect hook to update table data and store state on successful data fetch or show error.
  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
    }
    if (error) {
      toast.error(
        error?.message || t("site.messages.error.default"),
        toastConfig
      );
    }
  }, [status, data, error, t, logsDate]);

  const cols = getControlPanelLogCols();

  const tableData = tableDataGenerator({ rows, cols });

  const handleDateChange = (date: string | null) => {
    if (!date) return;
    setLogsDate(date); // Set a default value for null
  };

  const datePicker = () => (
    <LogDatePicker logsDate={logsDate} handleDateChange={handleDateChange} />
  );

  const toolbar = [datePicker];

  return (
    <Box>
      <CustomTable
        data={tableData}
        toolbar={toolbar}
        loading={status === "loading"}
      />
    </Box>
  );
};

export default LogsSection;
