/* eslint-disable react-hooks/exhaustive-deps */
import { FormStepper } from "@/components/shared/common/form/FormStepper";
import CustomTable from "@/components/shared/common/table/CustomTable";
import { toastConfig } from "@/configs/toast.config";
import useApi from "@/hooks/useApi";
import useModal from "@/hooks/useModal";
import ApiService from "@/services/ApiService";
import { TableDataType, tableRowsType } from "@/types/components.types";
import { TabConfig } from "@/types/form.types";
import { RequestEditUserType, RequestType } from "@/types/request.types";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { comperators, tableDataGenerator } from "@/utils/components.utils";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as yup from "yup";
import { UserDataType } from "@/types/user.types";
import { CustomModal } from "@/components/shared/common/modal/CustomModal";
/**
 * Component for the Control Panel Users Page.
 * This page displays a table of users fetched from the server.
 * It provides functionality to view and edit user details.
 */
const ControlPanelUsersPage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<TableDataType[]>([]);
  const [selectedEditUser, setSelectedEditUser] = useState<UserDataType | null>(
    null
  );

  const { data, status, refetch } = useApi<TableDataType[]>(
    "user/get-all-users",
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
  const editUserFormTabs: TabConfig<RequestEditUserType>[] = useMemo(() => {
    return [
      {
        tabName: "",
        fields: [
          {
            name: "role",
            label: "Role",
            type: "select",
            options: ["USER", "ADMIN"],

            initialValue: selectedEditUser?.authorization || "",
            validation: yup.string().optional(),
          },
        ],
      },
    ];
  }, [selectedEditUser]);

  /**
   * Function to generate the form for editing an item.
   */
  const generateEditUserForm = useCallback(
    ({ email }: { email: string }) => {
      const submitUser = async (user: RequestType) => {
        const userToEdit = { email, ...user };
        const response = await ApiService.put(`user/edit-user`, userToEdit);
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
            Edit {selectedEditUser?.email}
          </Typography>
          <FormStepper tabs={editUserFormTabs} submit={submitUser} />
        </Box>
      );
    },
    [modal, editUserFormTabs, selectedEditUser]
  );

  /**
   * Function to handle editing an item.
   */
  const editItemHandler = (row: tableRowsType) => {
    const user = { email: row.email, authorization: row.authorization };
    setSelectedEditUser(user);
  };

  /**
   * Effect hook to open the modal for editing an item.
   */
  useEffect(() => {
    if (selectedEditUser) {
      modal.setContent(() =>
        generateEditUserForm({ email: selectedEditUser.email })
      );
      modal.openModal();
    }
  }, [selectedEditUser]);

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
      render: (_value: string, row: tableRowsType) => (
        <Button onClick={() => editItemHandler(row)}>
          <EditRoundedIcon />
        </Button>
      ),
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
      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
        children={modal.content}
      />
    </Box>
  );
};

export default ControlPanelUsersPage;
