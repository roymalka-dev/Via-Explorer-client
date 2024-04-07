import { FormStepper } from "@/components/shared/common/form/FormStepper";
import { requestAppTabs } from "@/configs/request.config";
import ApiService from "@/services/ApiService";
import { RequestType } from "@/types/request.types";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RequestApp = () => {
  const navigate = useNavigate();

  const submitRequest = async (request: RequestType) => {
    const response = await ApiService.post("requests/create-new-app-request", {
      request,
    });
    //navigate(`/profile/requests/view/${response.id}`);
    console.log(response);
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
