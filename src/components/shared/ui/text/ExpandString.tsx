import React from "react";
import { Box, Typography } from "@mui/material";
import useModal from "@/hooks/useModal";
import { CustomModal } from "../../common/modal/CustomModal";

interface ExpandStringProps {
  value: string;
  minLen?: number;
}

const ExpandString: React.FC<ExpandStringProps> = ({ value, minLen = 25 }) => {
  const modal = useModal();

  if (!value) return null;

  const displayValue = `${value.substring(0, minLen)}${
    value.length > minLen ? "..." : ""
  }`;

  const handleClick = () => {
    modal.setContent(value);
    modal.openModal();
  };

  return (
    <Box>
      <Typography onClick={handleClick} style={{ cursor: "pointer" }}>
        {displayValue}
      </Typography>

      <CustomModal
        open={modal.isOpen}
        title={""}
        handleClose={modal.closeModal}
      >
        {modal.content}
      </CustomModal>
    </Box>
  );
};

export default ExpandString;
