/* eslint-disable react-hooks/exhaustive-deps */
import { toastConfig } from "@/configs/toast.config";
import useApi from "@/hooks/useApi";
import { appType } from "@/types/app.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import fallbackImageUrl from "@/assets/images/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import { setApps } from "@/store/slices/appsSlice";
import { RootState } from "@/store/store";
import CustomTable from "@/components/shared/common/table/CustomTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import CSVExporter from "@/components/shared/common/csv/CSVExporter";
import { tableRowsType } from "@/types/components.types";
import { useNavigate } from "react-router-dom";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { CustomModal } from "@/components/shared/common/modal/CustomModal";
import useModal from "@/hooks/useModal";
import * as yup from "yup";
import { TabConfig } from "@/types/form.types";
import ApiService from "@/services/ApiService";
import { FormStepper } from "@/components/shared/common/form/FormStepper";
import { RequestEditAppType, RequestType } from "@/types/request.types";
/**
 * Component for the Control Panel Apps Page.
 * This page displays a table of application details fetched from the server.
 * It provides functionality to fetch, display, and manage application data.
 */
const ControlPanelAppsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const appsFromStore = useSelector((state: RootState) => state.apps);
  const [rows, setRows] = useState<appType[]>([]);
  const [selectedEditApp, setSelectedEditApp] = useState<appType | null>(null);
  const { data, status, error, refetch } = useApi<appType[]>(
    `app/get-all-apps`,
    "GET",
    undefined,
    [],
    true
  );

  const modal = useModal();

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
   * Define form fields for editing an item.
   */
  const editAppFormTabs: TabConfig<RequestEditAppType>[] = useMemo(() => {
    return [
      {
        tabName: "",
        fields: [
          {
            name: "name",
            label: "Name",
            type: "text",
            initialValue: selectedEditApp?.name || "",
            validation: yup.string().optional(),
          },
          {
            name: "env",
            label: "Env",
            type: "text",
            initialValue: selectedEditApp?.env || "",
            validation: yup.string().optional(),
          },
          {
            name: "tenant",
            label: "Tenant",
            type: "text",
            initialValue: selectedEditApp?.tenant || "",
            validation: yup.string().optional(),
          },
          {
            name: "region",
            label: "Region",
            type: "text",
            initialValue: selectedEditApp?.region || "",
            validation: yup.string().optional(),
          },
          {
            name: "city",
            label: "City",
            type: "text",
            initialValue: selectedEditApp?.city || "",
            validation: yup.string().optional(),
          },
          {
            name: "country",
            label: "Country",
            type: "text",
            initialValue: selectedEditApp?.country || "",
            validation: yup.string().optional(),
          },
          {
            name: "iosFolder",
            label: "iOS Folder",
            type: "text",
            initialValue: selectedEditApp?.iosFolder || "",
            validation: yup.string().optional(),
          },
          {
            name: "androidFolder",
            label: "Android Folder",
            type: "text",
            initialValue: selectedEditApp?.androidFolder || "",
            validation: yup.string().optional(),
          },
          {
            name: "colorSpecs",
            label: "Color Specs",
            type: "text",
            initialValue: selectedEditApp?.colorSpecs || "",
            validation: yup.string().optional(),
          },
          {
            name: "figmaAppName",
            label: "Figma App Name",
            type: "text",
            initialValue: selectedEditApp?.figmaAppName || "",
            validation: yup.string().optional(),
          },
          {
            name: "webAppFigmaLink",
            label: "Web App Figma Link",
            type: "text",
            initialValue: selectedEditApp?.webAppFigmaLink || "",
            validation: yup.string().url("Must be a valid URL").optional(),
          },
          {
            name: "webAppLink",
            label: "Web App Link",
            type: "text",
            initialValue: selectedEditApp?.webAppLink || "",
            validation: yup.string().url("Must be a valid URL").optional(),
          },
        ],
      },
    ];
  }, [selectedEditApp]);

  /**
   * Function to generate the form for editing an item.
   */
  const generateEditAppForm = useCallback(
    ({ id }: { id: string }) => {
      const submitApp = async (app: RequestType) => {
        const appToEdit = { id, ...app };
        const response = await ApiService.put(`app/update-app`, appToEdit);
        if (response.error) {
          toast.error(response.error.message, toastConfig);
          return;
        } else {
          toast.success(response.message, toastConfig);
          refetch();
        }

        modal.closeModal();
      };

      return (
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            Edit App {selectedEditApp?.name + " " + id}
          </Typography>
          <FormStepper tabs={editAppFormTabs} submit={submitApp} />
        </Box>
      );
    },
    [modal, editAppFormTabs, selectedEditApp]
  );

  /**
   * Function to handle editing an item.
   */
  const editItemHandler = (id: string) => {
    const appToEdit = appsFromStore.data.find((app) => app.id === id) || null;
    setSelectedEditApp(appToEdit);
  };

  /**
   * Effect hook to open the modal for editing an item.
   */
  useEffect(() => {
    if (selectedEditApp) {
      modal.setContent(() => generateEditAppForm({ id: selectedEditApp.id }));
      modal.openModal();
    }
  }, [selectedEditApp]);

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
      name: "options-edit",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => editItemHandler(row.id)}>
          <EditRoundedIcon />
        </Button>
      ),
    },

    {
      name: "options-open",
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => navigate(`/app/${row.id}`)}>
          <LaunchRoundedIcon />
        </Button>
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
      <CustomTable
        data={tableData}
        toolbar={toolbar}
        loading={status === "loading"}
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

export default ControlPanelAppsPage;
