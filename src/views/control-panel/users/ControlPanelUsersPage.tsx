import CustomTable from "@/components/shared/common/table/CustomTable";
import useApi from "@/hooks/useApi";
import { TableDataType } from "@/types/components.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Component for the Control Panel Users Page.
 * This page displays a table of users fetched from the server.
 * It provides functionality to view and edit user details.
 */
const ControlPanelUsersPage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<TableDataType[]>([]);

  const { data, status } = useApi<TableDataType[]>("user/get-all-users", "GET");

  /**
   * Effect hook to update table data on successful data fetch.
   */
  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
    }
  }, [status, data]);

  /**
   * Function to handle editing user details.
   */
  const handleEditUser = () => {
    // Implementation for editing user details
  };

  const cols = [
    {
      name: "email",
      locale: "controlPanel.pages.users.table.cols.email",
      render: (value: string) => (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ),
      comparator: comperators.string,
    },
    {
      name: "authorization",
      locale: "controlPanel.pages.users.table.cols.role",
      render: (value: string) => (
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      ),
      comparator: comperators.string,
    },
    {
      name: "options-1",
      render: () => <Button onClick={() => handleEditUser()}>edit</Button>,
    },
  ];

  const toolbar: (() => JSX.Element)[] = [];

  const tableData = tableDataGenerator({ rows, cols });
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {t("controlPanel.pages.users.sections.title")}
      </Typography>
      <CustomTable
        data={tableData}
        loading={status === "loading"}
        toolbar={toolbar}
      />
    </Box>
  );
};

export default ControlPanelUsersPage;
