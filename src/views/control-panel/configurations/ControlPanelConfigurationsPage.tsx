import CustomTable from "@/components/shared/common/table/CustomTable";
import useApi from "@/hooks/useApi";
import { TableDataType, tableRowsType } from "@/types/components.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const cols = [
  {
    name: "name",
    locale: "controlPanel.pages.apps.table.cols.name",
    render: (value: string) => (
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    ),
    comparator: comperators.string,
  },
  {
    name: "location",
    locale: "controlPanel.pages.configurations.table.cols.location",
    render: (value: string) => (
      <Typography variant="body1" color="text.primary">
        {value}
      </Typography>
    ),
    comparator: comperators.string,
  },
  {
    name: "type",
    locale: "controlPanel.pages.configurations.table.cols.type",
    render: (value: string) => (
      <Typography variant="body1" color="text.primary">
        {value}
      </Typography>
    ),
    comparator: comperators.string,
  },
  {
    name: "value",
    locale: "controlPanel.pages.configurations.table.cols.value",
    render: (value: string | number[] | string[], row: tableRowsType) => (
      <Button onClick={() => console.log(row.name)} variant="outlined">
        <Typography variant="body1">
          {Array.isArray(value) ? value.join(", ") : value}
        </Typography>
      </Button>
    ),
    comparator: comperators.string,
  },
];

const toolbar: (() => JSX.Element)[] = [];

const ControlPanelConfigurationsPage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<TableDataType[]>([]);

  const { data, status } = useApi<TableDataType[]>(
    "configurations/get-all-configurations",
    "GET"
  );

  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
    }
  }, [status, data]);

  const tableData = tableDataGenerator({ rows, cols });
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {t("controlPanel.pages.configurations.sections.title")}
      </Typography>
      <CustomTable
        data={tableData}
        loading={status === "loading"}
        toolbar={toolbar}
      />
    </Box>
  );
};

export default ControlPanelConfigurationsPage;
