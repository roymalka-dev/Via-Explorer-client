/* eslint-disable react-hooks/exhaustive-deps */
import { FormStepper } from "@/components/shared/common/form/FormStepper";
import { CustomModal } from "@/components/shared/common/modal/CustomModal";
import CustomTable from "@/components/shared/common/table/CustomTable";
import { toastConfig } from "@/configs/toast.config";
import useApi from "@/hooks/useApi";
import useModal from "@/hooks/useModal";
import ApiService from "@/services/ApiService";
import { TableDataType, tableRowsType } from "@/types/components.types";
import { TabConfig } from "@/types/form.types";
import {
  RequestEditConfigurationType,
  RequestType,
} from "@/types/request.types";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as yup from "yup";
/**
 * Component for the Control Panel Configurations Page.
 * This page displays a table of configuration details fetched from the server.
 * It provides functionality to fetch, display, and manage configuration data.
 */
const ControlPanelConfigurationsPage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<TableDataType[]>([]);
  const [selectedConfiguration, setSelectedConfiguration] = useState<{
    key: string;
    value: string | number | boolean | string[] | Date | undefined;
  }>();

  const { data, status, refetch } = useApi<TableDataType[]>(
    "configurations/get-all-configurations",
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

  /**
   * Define form fields for editing an item.
   */
  const editConfigurationFormTabs: TabConfig<RequestEditConfigurationType>[] =
    useMemo(() => {
      return [
        {
          tabName: "",
          fields: [
            {
              name: "name",
              label: "Configuration",
              type: "text",
              initialValue: selectedConfiguration?.value || "",
              validation: yup.string().optional(),
            },
          ],
        },
      ];
    }, [selectedConfiguration]);

  /**
   * Function to generate the form for editing an item.
   */
  const generateEditConfigurationForm = useCallback(
    ({ key }: { key: string }) => {
      const submitConfiguration = async (value: RequestType) => {
        const configurationToEdit = { key, value: value.name };
        const response = await ApiService.put(
          `configurations/edit-configuration`,
          configurationToEdit
        );
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
            Edit {selectedConfiguration?.key}
          </Typography>
          <FormStepper
            tabs={editConfigurationFormTabs}
            submit={submitConfiguration}
          />
        </Box>
      );
    },
    [modal, editConfigurationFormTabs, selectedConfiguration]
  );

  /**
   * Function to handle editing an item.
   */
  const editItemHandler = (row: tableRowsType) => {
    const configuration = {
      key: row.name,
      value: row.value,
    };
    setSelectedConfiguration(configuration);
  };

  /**
   * Effect hook to open the modal for editing an item.
   */
  useEffect(() => {
    if (selectedConfiguration) {
      modal.setContent(() =>
        generateEditConfigurationForm({
          key: selectedConfiguration.key,
        })
      );
      modal.openModal();
    }
  }, [selectedConfiguration]);

  /**
   * Define table columns and associated rendering functions.
   */
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
        <Button onClick={() => editItemHandler(row)} variant="outlined">
          <Typography variant="body1">
            {Array.isArray(value) ? value.join(", ") : value}
          </Typography>
        </Button>
      ),
      comparator: comperators.string,
    },
  ];
  /**
   * Toolbar components to be displayed above the table.
   */
  const toolbar: (() => JSX.Element)[] = [];

  /**
   * Generate table data based on rows and columns.
   */
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
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default ControlPanelConfigurationsPage;
