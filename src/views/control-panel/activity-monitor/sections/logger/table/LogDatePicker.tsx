/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, TextField } from "@mui/material";

interface Props {
  logsDate: string;
  handleDateChange: (date: string) => void;
}

const LogDatePicker: React.FC<Props> = ({ logsDate, handleDateChange }) => {
  const maxDate = new Date().toISOString().split("T")[0];
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 14);
  const minDateString = minDate.toISOString().split("T")[0];

  return (
    <Box>
      <TextField
        label="Date"
        type="date"
        value={logsDate}
        onChange={(e: any) => handleDateChange(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: maxDate,
          min: minDateString,
        }}
      />
    </Box>
  );
};

export default LogDatePicker;
