import CustomTable from "@/components/shared/common/table/CustomTable";
import useApi from "@/hooks/useApi";
import { TableDataType, tableRowsType } from "@/types/components.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getStatusChipColor } from "@/utils/components.utils";
import { useTranslation } from "react-i18next";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { useNavigate } from "react-router-dom";
import ApiService from "@/services/ApiService";
import { toastConfig } from "@/configs/toast.config";
import { toast } from "react-toastify";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import useModal from "@/hooks/useModal";
import { CustomModal } from "@/components/shared/common/modal/CustomModal";

/**
 * Component for the Control Panel Requests Page.
 * This page displays a table of requests fetched from the server.
 * It provides functionality to view details of individual requests.
 */
const ControlPanelRequestsPage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<TableDataType[]>([]);
  const navigate = useNavigate();

  const { data, status, refetch } = useApi<TableDataType[]>(
    "requests/get-all-requests",
    "GET"
  );

  /**
   * Effect hook to update table data on successful data fetch.
   */
  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
    }
  }, [status, data]);

  const modal = useModal();

  const deleteRequest = async (id: string) => {
    const confirmDelete = async (id: string) => {
      modal.closeModal();
      const success = await ApiService.delete("requests/delete-request/" + id);
      if (success) {
        toast.success("Request deleted successfully", toastConfig);
        refetch();
      } else {
        toast.error("Failed to delete request", toastConfig);
      }
    };

    modal.openModal();
    modal.setContent(
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Are you sure you want to delete this request?
        </Typography>
        <Button onClick={() => modal.closeModal()}>
          <Typography variant="body2">Cancel</Typography>
        </Button>
        <Button onClick={() => confirmDelete(id)}>
          <Typography variant="body2" style={{ color: "red" }}>
            Delete
          </Typography>
        </Button>
      </Box>
    );
  };

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
      name: "options-launch",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => navigate(`/requests/view/${row.id}`)}>
          <LaunchRoundedIcon />
        </Button>
      ),
    },
    {
      name: "options-delete",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => deleteRequest(row.id)}>
          <DeleteRoundedIcon color={"secondary"} />
        </Button>
      ),
    },
  ];

  const toolbar: (() => JSX.Element)[] = [];

  const tableData = tableDataGenerator({ rows, cols });
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {t("controlPanel.pages.requests.sections.title")}
      </Typography>
      <CustomTable
        data={tableData}
        loading={status === "loading"}
        toolbar={toolbar}
      />
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default ControlPanelRequestsPage;
