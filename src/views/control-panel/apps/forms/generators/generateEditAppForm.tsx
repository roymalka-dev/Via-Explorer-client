/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import ApiService from "@/services/ApiService"; // Adjust the import according to your project structure
import { RequestType } from "@/types/request.types";
import { toastConfig } from "@/configs/toast.config";
import { FormStepper } from "@/components/shared/common/form/FormStepper";

interface GenerateEditAppFormParams {
  id: string;
  modal: any;
  editAppFormTabs: any;
  selectedEditApp: any;
  refetch: () => void;
}

export const generateEditAppForm = ({
  id,
  modal,
  editAppFormTabs,
  selectedEditApp,
  refetch,
}: GenerateEditAppFormParams) => {
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
};
