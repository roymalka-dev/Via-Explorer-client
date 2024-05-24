/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormStepper } from "@/components/shared/common/form/FormStepper";
import ApiService from "@/services/ApiService";
import { RequestType } from "@/types/request.types";

interface GenerateAddAppFormParams {
  navigate: ReturnType<typeof useNavigate>;
  modal: any;
  addAppFormTabs: any;
  toastConfig: any;
}

export const generateAddAppForm = ({
  navigate,
  modal,
  addAppFormTabs,
  toastConfig,
}: GenerateAddAppFormParams) => {
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
};
