/* eslint-disable react-hooks/exhaustive-deps */
import { toastConfig } from "@/configs/toast.config";
import useApi from "@/hooks/useApi";
import { appType } from "@/types/app.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { CustomModal } from "@/components/shared/common/modal/CustomModal";
import useModal from "@/hooks/useModal";
import ApiService from "@/services/ApiService";
import { FormStepper } from "@/components/shared/common/form/FormStepper";
import { RequestType } from "@/types/request.types";
import { getConfigValue } from "@/utils/configurations.utils";
import ComplexFilterButton, {
  ComplexFilterFunctionOption,
} from "@/components/shared/ui/buttons/ComplexFiltersButton";
import { filterFunctions, filterTypes } from "./forms/filters";
import useEditAppFormTabs from "./forms/useEditAppFormTabs";
import useAddNewAppFormTabs from "./forms/useAddNewAppFormTabs";
import AddIcon from "@mui/icons-material/Add";

/**
 * Component for the Control Panel Apps Page.
 * This page displays a table of application details fetched from the server.
 * It provides functionality to fetch, display, and manage application data.
 */
const ControlPanelAppsPage = () => {
  const TIME_TO_UPDATE_APPS_TABLE_IN_HR =
    1000 * 60 * 60 * Number(getConfigValue("TIME_TO_UPDATE_APPS_TABLE", 12));

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
    if (
      appsFromStore.data?.length > 0 &&
      Date.now() < TIME_TO_UPDATE_APPS_TABLE_IN_HR + appsFromStore.ttl
    ) {
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

  const editAppFormTabs = useEditAppFormTabs(selectedEditApp);
  const addAppFormTabs = useAddNewAppFormTabs();

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
   * Function to generate the form for Add App.
   */
  const generateAddAppForm = useCallback(() => {
    const submitApp = async (app: RequestType) => {
      const appToAdd = { ...app };
      const response = await ApiService.post(`app/add-app`, appToAdd);
      if (response.error) {
        toast.error(response.error.message, toastConfig);
        return;
      } else {
        toast.success(response.message, toastConfig);
        navigate(`/app/${app.id}`);
      }

      modal.closeModal();
    };

    return (
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Add App
        </Typography>
        <FormStepper tabs={addAppFormTabs} submit={submitApp} />
      </Box>
    );
  }, [modal, addAppFormTabs]);

  /**
   * Function to handle editing an item.
   */
  const editItemHandler = (id: string) => {
    const appToEdit = appsFromStore.data.find((app) => app.id === id) || null;
    setSelectedEditApp(appToEdit);
  };

  const addItemHandler = () => {
    modal.setContent(() => generateAddAppForm());
    modal.openModal();
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
      render: (value: string, row: tableRowsType) => (
        <Button
          onClick={() => navigate(`/app/${row.id}`)}
          sx={{ cursor: "pointer" }}
        >
          <img
            src={value || fallbackImageUrl}
            alt={value}
            width={50}
            height={"auto"}
          />
        </Button>
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
            ? value.toISOString()?.split("T")[0]
            : value?.split("T")[0]}
        </Typography>
      ),
      comparator: comperators.date,
    },
    {
      name: "iosCurrentVersionReleaseDate",
      locale: "controlPanel.pages.apps.table.cols.iosCurrentRelease",
      render: (value: string | Date) => (
        <Typography>
          {value instanceof Date
            ? value.toISOString()?.split("T")[0]
            : value?.split("T")[0]}
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
      name: "androidCurrentVersionReleaseDate",
      locale: "controlPanel.pages.apps.table.cols.androidCurrentRelease",
      render: (value: string | Date) => (
        <Typography>
          {value instanceof Date
            ? value.toISOString()?.split("T")[0]
            : value?.split("T")[0]}
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
      render: (value: string[]) => <Typography>{value?.join(", ")}</Typography>,
      comparator: (a: string[], b: string[]) => a[0]?.localeCompare(b[0]),
    },
    {
      name: "webAppLink",
      locale: "Web App",
      render: (value: string) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ),
      comparator: comperators.string,
    },
    {
      name: "pso",
      locale: "pso",
      render: (value: string) => <Typography>{value}</Typography>,
      comparator: comperators.string,
    },
    {
      name: "psm",
      locale: "psm",
      render: (value: string) => <Typography>{value}</Typography>,
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

  const handleComplexFilters = (
    filterType: string,
    filterFunction: ComplexFilterFunctionOption | undefined,
    filterValue: string
  ) => {
    if (!filterFunction) return; // Ensure that a filter function is selected

    // Filter the rows based on the selected filter function's logic
    const filteredRows = appsFromStore.data.filter((app) => {
      const valueToFilter = app[filterType as keyof appType] ?? ""; // Provide a default value of an empty string if valueToFilter is undefined
      // Ensure the value to filter and filter value are in appropriate formats or types before applying the filter function
      // Convert to string or appropriate type if necessary
      return filterFunction.function(valueToFilter.toString(), filterValue);
    });

    setRows(filteredRows); // Update the state with the filtered rows
  };

  /**
   * Rendered button component for triggering data refetch.
   */
  const refetchButton: () => JSX.Element = () => {
    return (
      <Button onClick={refecthData}>
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
   * Rendered button component for triggering data refetch.
   */
  const filtersButton: () => JSX.Element = () => {
    return (
      <ComplexFilterButton
        filterTypes={filterTypes}
        filterFunctions={filterFunctions}
        handler={handleComplexFilters}
      />
    );
  };

  const addAppButton: () => JSX.Element = () => {
    return (
      <Button onClick={addItemHandler}>
        <AddIcon />
      </Button>
    );
  };

  /**
   * Toolbar components to be displayed above the table.
   */
  const toolbar = [filtersButton, addAppButton, ExportCSV, refetchButton];

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
