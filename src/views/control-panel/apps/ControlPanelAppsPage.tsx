/* eslint-disable react-hooks/exhaustive-deps */
import { toastConfig } from "@/configs/toast.config";
import useApi from "@/hooks/useApi";
import { appType } from "@/types/app.types";
import { tableDataGenerator } from "@/utils/components.utils";
import { Box, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setApps } from "@/store/slices/appsSlice";
import { RootState } from "@/store/store";
import CustomTable from "@/components/shared/common/table/CustomTable";

import { useNavigate } from "react-router-dom";
import { CustomModal } from "@/components/shared/common/modal/CustomModal";
import useModal from "@/hooks/useModal";
import { getConfigValue } from "@/utils/configurations.utils";
import { ComplexFilterFunctionOption } from "@/components/shared/ui/buttons/ComplexFiltersButton";
import useEditAppFormTabs from "./forms/hooks/useEditAppFormTabs";
import useAddNewAppFormTabs from "./forms/hooks/useAddNewAppFormTabs";
import { getControlPanelAppsCols } from "./data/cols";
import { generateEditAppForm } from "./forms/generators/generateEditAppForm";
import { generateAddAppForm } from "./forms/generators/generateAddAppForm";
import AddAppButton from "./table/toolbar/AddAppButton";
import ExportCSVButton from "./table/toolbar/ExportCSVButton";
import FiltersButton from "./table/toolbar/FiltersButton";
import RefetchButton from "./table/toolbar/RefetchButton";
import UpdateAllAppsFromStoreButton from "./table/toolbar/UpdateAllAppsFromStoreButton";

/**
 * Component for the Control Panel Apps Page.
 * This page displays a table of application details fetched from the server.
 * It provides functionality to fetch, display, and manage application data.
 */
const ControlPanelAppsPage = () => {
  /** CONSTANTS  */
  const TIME_TO_UPDATE_APPS_TABLE_IN_HR =
    1000 * 60 * 60 * Number(getConfigValue("TIME_TO_UPDATE_APPS_TABLE", 12));

  /** -------------------------------------------------------------------------------- */
  /** HOOKS  */
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const modal = useModal();
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

  /** -------------------------------------------------------------------------------- */
  /** DATA  */

  // Effect hook to update table data and store state on successful data fetch or show error.
  useEffect(() => {
    if (status === "success" && data) {
      setRows(data);
      dispatch(setApps({ apps: data }));
    }
    if (error) {
      toast.error(
        error?.message || t("site.messages.error.default"),
        toastConfig
      );
    }
  }, [status, data, dispatch, error]);

  // Effect hook to initialize table data and trigger data fetch on component mount or error state.
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

  // Generate columns for the table.
  const cols = getControlPanelAppsCols({
    navigate,
    appsFromStore,
    setSelectedEditApp,
  });

  /** -------------------------------------------------------------------------------- */
  /** FORMS  */

  // Generate tabs for the edit app form.
  const editAppFormTabs = useEditAppFormTabs(selectedEditApp);

  // Callback to generate the edit app form.
  const generateEditAppFormCallback = useCallback(
    ({ id }: { id: string }) =>
      generateEditAppForm({
        id,
        modal,
        editAppFormTabs,
        selectedEditApp,
        refetch,
      }),
    [modal, editAppFormTabs, selectedEditApp, refetch]
  );

  //Effect hook to open the modal for editing an item.
  useEffect(() => {
    if (selectedEditApp) {
      modal.setContent(() =>
        generateEditAppFormCallback({ id: selectedEditApp.id })
      );
      modal.openModal();
    }
  }, [selectedEditApp]);

  // Generate tabs for the add new app form.
  const addAppFormTabs = useAddNewAppFormTabs();

  // Callback to generate the add new app form.
  const generateAddAppFormCallback = useCallback(
    () =>
      generateAddAppForm({
        navigate,
        modal,
        addAppFormTabs,
        toastConfig,
      }),
    [modal, addAppFormTabs, toastConfig]
  );

  /** -------------------------------------------------------------------------------- */
  /** TABLE   */

  // Generate table data based on rows and columns.
  const tableData = tableDataGenerator({ rows, cols });

  // Function to trigger data refetch.
  const refecthData = () => {
    setRows([]);
    dispatch(setApps({ apps: [] }));
    refetch();
  };

  // Function to handle complex filters.
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

  // Toolbar buttons for the table.
  const toolbar = [
    () => <FiltersButton handleComplexFilters={handleComplexFilters} />,
    () => (
      <AddAppButton
        modal={modal}
        generateAddAppFormCallback={generateAddAppFormCallback}
      />
    ),
    () => <ExportCSVButton rows={rows} />,
    () => <RefetchButton refetchData={refecthData} />,
    () => (
      <UpdateAllAppsFromStoreButton
        rows={rows}
        refetch={refetch}
        modal={modal}
      />
    ),
  ];

  return (
    <Box sx={{ mt: 4, ml: 3 }} dir={theme.direction}>
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
