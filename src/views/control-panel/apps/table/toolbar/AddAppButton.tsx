/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addItemHandler } from "../../forms/utils/addItemHandler";

interface AddAppButtonProps {
  modal: any;
  generateAddAppFormCallback: () => JSX.Element;
}

const AddAppButton: React.FC<AddAppButtonProps> = ({
  modal,
  generateAddAppFormCallback,
}) => {
  return (
    <Tooltip title={"Add app"}>
      <Button onClick={() => addItemHandler(modal, generateAddAppFormCallback)}>
        <AddIcon />
      </Button>
    </Tooltip>
  );
};

export default AddAppButton;
