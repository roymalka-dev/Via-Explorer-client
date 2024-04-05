import CustomTable from "@/components/shared/common/table/CustomTable";
import useApi from "@/hooks/useApi";
import { TableDataType } from "@/types/components.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getStatusChipColor } from "@/utils/components.utils";
import { useTranslation } from "react-i18next";

const cols = [
  {
    name: "id",
    locale: "controlPanel.pages.requests.table.cols.id",
    render: (value: string) => <Typography>{value}</Typography>,
    comparator: comperators.string,
  },
  {
    name: "riderAppName",
    locale: "controlPanel.pages.requests.table.cols.name",
    render: (value: string) => <Typography>{value}</Typography>,
    comparator: comperators.string,
  },

  {
    name: "status",
    locale: "controlPanel.pages.requests.table.cols.status",
    render: (value: string) => (
      <Chip
        sx={{
          bgcolor: getStatusChipColor(value),
        }}
        label={value}
      />
    ),
    comparator: comperators.string,
  },
  {
    name: "launchDate",
    locale: "controlPanel.pages.requests.table.cols.launchDate",
    render: (value: string) => (
      <Typography>
        {new Date(value).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
    ),
    comparator: comperators.date,
  },
  {
    name: "performingUser",
    locale: "controlPanel.pages.requests.table.cols.user",
    render: (value: string) => <Typography>{value}</Typography>,
    comparator: comperators.string,
  },
  {
    name: "options-1",
    render: () => <Button>go to</Button>,
  },
];

const toolbar: (() => JSX.Element)[] = [];

const ControlPanelRequestsPage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<TableDataType[]>([]);

  const { data, status } = useApi<TableDataType[]>(
    "requests/get-all-requests",
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
        {t("controlPanel.pages.requests.sections.title")}
      </Typography>
      <CustomTable
        data={tableData}
        loading={status === "loading"}
        toolbar={toolbar}
      />
    </Box>
  );
};

export default ControlPanelRequestsPage;
