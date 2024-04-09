import { toastConfig } from "@/configs/toast.config";
import useApi from "@/hooks/useApi";
import { appType } from "@/types/app.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import fallbackImageUrl from "@/assets/images/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import { setApps } from "@/store/slices/appsSlice";
import { RootState } from "@/store/store";
import CustomTable from "@/components/shared/common/table/CustomTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import CSVExporter from "@/components/shared/common/csv/CSVExporter";

/**
 * Component for the Control Panel Apps Page.
 * This page displays a table of application details fetched from the server.
 * It provides functionality to fetch, display, and manage application data.
 */
const ControlPanelAppsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const appsFromStore = useSelector((state: RootState) => state.apps);
  const [rows, setRows] = useState<appType[]>([]);
  const [loading, setLoading] = useState(false);
  const { data, status, error, refetch } = useApi<appType[]>(
    `app/get-all-apps`,
    "GET",
    undefined,
    [],
    true
  );

  /**
   * Effect hook to handle error state and display toast messages.
   */
  useEffect(() => {
    if (error) {
      toast.error(
        error?.message || t("site.messages.error.default"),
        toastConfig
      );
    }
  }, [error, t]);

  /**
   * Effect hook to manage loading state.
   */
  useEffect(() => {
    if (status === "loading") setLoading(true);
    else setLoading(false);
  }, [loading, status]);

  /**
   * Effect hook to initialize table data and trigger data fetch on component mount or error state.
   */
  useEffect(() => {
    if (appsFromStore.data?.length > 0) {
      setRows(appsFromStore.data);
    } else if (status === "idle" || status === "error") {
      refetch();
    }
  }, [appsFromStore, status, refetch]);

  /**
   * Effect hook to update table data and store state on successful data fetch.
   */
  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
      dispatch(setApps({ apps: data }));
    }
  }, [status, data, dispatch]);

  /**
   * Define table columns and associated rendering functions.
   */
  const cols = [
    {
      name: "imageUrl",
      locale: "controlPanel.pages.apps.table.cols.image",
      render: (value: string) => (
        <img
          src={value || fallbackImageUrl}
          alt={value}
          width={50}
          height={"auto"}
        />
      ),
      comparator: comperators.string,
    },
    {
      name: "id",
      locale: "controlPanel.pages.apps.table.cols.id",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.number,
    },
    {
      name: "name",
      locale: "controlPanel.pages.apps.table.cols.name",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "env",
      locale: "controlPanel.pages.apps.table.cols.env",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "tenant",
      locale: "controlPanel.pages.apps.table.cols.tenant",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "region",
      locale: "controlPanel.pages.apps.table.cols.region",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "city",
      locale: "controlPanel.pages.apps.table.cols.city",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "country",
      locale: "controlPanel.pages.apps.table.cols.country",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "iosVersion",
      locale: "controlPanel.pages.apps.table.cols.iosVersion",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "iosRelease",
      locale: "controlPanel.pages.apps.table.cols.iosRelease",
      render: (value: string | Date) => (
        <Typography>
          {value instanceof Date
            ? value.toISOString().split("T")[0]
            : value.split("T")[0]}
        </Typography>
      ),
      comparator: comperators.date,
    },
    {
      name: "iosFolder",
      locale: "controlPanel.pages.apps.table.cols.iosFolder",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "androidVersion",
      locale: "controlPanel.pages.apps.table.cols.androidVersion",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "androidRelease",
      locale: "controlPanel.pages.apps.table.cols.androidRelease",
      render: (value: string | Date) => (
        <Typography>
          {value instanceof Date ? value.toISOString().split("T")[0] : value}
        </Typography>
      ),
      comparator: comperators.date,
    },
    {
      name: "androidFolder",
      locale: "controlPanel.pages.apps.table.cols.androidFolder",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "languages",
      locale: "controlPanel.pages.apps.table.cols.languages",
      render: (value: string[]) => <Typography>{value.join(", ")}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "colorSpecs",
      locale: "controlPanel.pages.apps.table.cols.colorSpecs",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "figmaAppName",
      locale: "controlPanel.pages.apps.table.cols.figmaAppName",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "webAppFigmaLink",
      locale: "controlPanel.pages.apps.table.cols.webAppFigmaLink",
      render: (value: string) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ),
      comparator: comperators.string,
    },

    {
      name: "options-1",
      render: () => <Button onClick={() => console.log("edit")}>Edit</Button>,
    },
    {
      name: "options-2",
      render: (id: string) => (
        <Button onClick={() => console.log(id)}>Go to</Button>
      ),
    },
  ];

  /**
   * Generate table data based on rows and columns.
   */
  const tableData = tableDataGenerator({ rows, cols });

  /**
   * Function to trigger data refetch.
   */
  const refecthData = () => {
    setRows([]);
    dispatch(setApps({ apps: [] }));
  };

  /**
   * Rendered button component for triggering data refetch.
   */
  const refetchButton: () => JSX.Element = () => {
    return (
      <Button onClick={refecthData} variant="outlined">
        <RefreshIcon />
      </Button>
    );
  };

  /**
   * Rendered component for exporting table data to CSV.
   */
  const ExportCSV: () => JSX.Element = () => {
    return <CSVExporter jsonData={rows} />;
  };

  /**
   * Toolbar components to be displayed above the table.
   */
  const toolbar = [ExportCSV, refetchButton];

  return (
    <Box sx={{ mt: 8 }} dir={theme.direction}>
      <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
        {t("controlPanel.pages.apps.sections.title")}
      </Typography>
      <CustomTable data={tableData} toolbar={toolbar} loading={loading} />
    </Box>
  );
};

export default ControlPanelAppsPage;
