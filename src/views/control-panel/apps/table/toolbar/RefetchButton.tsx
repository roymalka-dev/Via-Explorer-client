import React from "react";
import { Button, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface RefetchButtonProps {
  refetchData: () => void;
}

const RefetchButton: React.FC<RefetchButtonProps> = ({ refetchData }) => {
  return (
    <Tooltip title={"Refetch apps from DB"}>
      <Button onClick={refetchData}>
        <RefreshIcon />
      </Button>
    </Tooltip>
  );
};

export default RefetchButton;
