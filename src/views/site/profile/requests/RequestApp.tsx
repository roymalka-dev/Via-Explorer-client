import { FormStepper } from "@/components/shared/common/form/FormStepper";
import { requestAppTabs } from "@/configs/request.config";
import { toastConfig } from "@/configs/toast.config";
import ApiService from "@/services/ApiService";
import { RequestType } from "@/types/request.types";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequestApp = () => {
  const navigate = useNavigate();

  const submitRequest = async (request: RequestType) => {
    console.log(request);
    const response = await ApiService.post(
      "requests/create-new-app-request",
      request
    );
    toast.success(response.message, toastConfig);
    navigate(`/profile`);
  };

  return (
    <Box>
      <Typography sx={{ textAlign: "center", mb: 2 }} variant="h4" gutterBottom>
        Request App Form
      </Typography>
      <FormStepper
        tabs={requestAppTabs}
        bucketName="via-explorer-requests"
        submit={(values) => submitRequest(values)}
      />
    </Box>
  );
};

export default RequestApp;
