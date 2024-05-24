/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Tooltip, Typography, Box, TextField } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";
import ApiService from "@/services/ApiService";
import { appType } from "@/types/app.types";

interface UpdateAllAppsFromStoreButtonProps {
  rows: appType[];
  refetch: () => void;
  modal: any;
}

const UpdateAllAppsFromStoreButton: React.FC<
  UpdateAllAppsFromStoreButtonProps
> = ({ rows, refetch, modal }) => {
  const updateAllAppsFromStores = async () => {
    let password = "";
    const confirmDelete = async () => {
      if (password !== "ridewithvia") {
        toast.error("Invalid password", toastConfig);
        return;
      }

      modal.closeModal();
      const success = await ApiService.post("app/update-apps-from-stores");
      if (success) {
        toast.success("All apps are updating...", toastConfig);
        refetch();
      } else {
        toast.error("Failed to update apps", toastConfig);
      }
    };

    modal.openModal();
    modal.setContent(
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          This is an expensive operation. Are you sure you want to update all
          apps from store? It might take {((rows.length / 100) * 15).toFixed(0)}{" "}
          minutes.
        </Typography>
        <TextField
          label="Password"
          type="password"
          onChange={(e) => (password = e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        />
        <Box display="flex" justifyContent="space-between">
          <Button onClick={() => modal.closeModal()}>
            <Typography variant="body2">Cancel</Typography>
          </Button>
          <Button onClick={confirmDelete}>
            <Typography variant="body2" style={{ color: "red" }}>
              Update
            </Typography>
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Tooltip title={"Update all apps from stores"}>
      <Button onClick={updateAllAppsFromStores}>
        <UpdateIcon />
      </Button>
    </Tooltip>
  );
};

export default UpdateAllAppsFromStoreButton;
