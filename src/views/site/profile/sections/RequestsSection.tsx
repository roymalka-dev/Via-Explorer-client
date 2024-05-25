/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Chip, Typography } from "@mui/material";
import {
  comperators,
  getStatusChipColor,
  tableDataGenerator,
} from "@/utils/components.utils";
import { useNavigate } from "react-router-dom";
import CustomTable from "@/components/shared/common/table/CustomTable";
import RefreshIcon from "@mui/icons-material/Refresh";

import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { TableDataType, tableRowsType } from "@/types/components.types";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
const RequestsSection = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<TableDataType[]>([]);

  const requests = useApi<TableDataType[]>("user/get-user-requests");

  const cols = [
    {
      name: "id",
      locale: "site.pages.profile.sections.requests.table.cols.id",
      render: (value: any) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "riderAppName",
      locale: "site.pages.profile.sections.requests.table.cols.name",
      render: (value: any) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },

    {
      name: "status",
      locale: "site.pages.profile.sections.requests.table.cols.status",
      render: (value: any) => (
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
      locale: "site.pages.profile.sections.requests.table.cols.launchDate",
      render: (value: any) => (
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
      name: "options-1",
      locale: "Launch",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => navigate(`/requests/view/${row.id}`)}>
          <LaunchRoundedIcon />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (requests.status === "success" && requests.data) {
      setRows(requests.data);
    }
  }, [requests.data, requests.status]);

  const refecthButton: () => JSX.Element = () => {
    return (
      <Button onClick={() => requests.refetch()} variant="outlined">
        <RefreshIcon />
      </Button>
    );
  };
  const addButton: () => JSX.Element = () => {
    return (
      <Button
        onClick={() => navigate("/requests/request-app")}
        variant="outlined"
      >
        <AddIcon />
      </Button>
    );
  };

  const toolbar = [refecthButton, addButton];

  const tableData = tableDataGenerator({ rows, cols });

  return (
    <div>
      <CustomTable
        data={tableData}
        toolbar={toolbar}
        loading={requests.status === "loading"}
      />
    </div>
  );
};

export default RequestsSection;
