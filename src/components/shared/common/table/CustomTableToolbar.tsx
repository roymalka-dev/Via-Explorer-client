import React, { ChangeEvent } from "react";
import { Toolbar, TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
interface CustomTableToolbarProps {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toolbar?: (() => JSX.Element)[];
}

const CustomTableToolbar: React.FC<CustomTableToolbarProps> = ({
  onSearchChange,
  toolbar,
}) => {
  const { t } = useTranslation();
  return (
    <Toolbar>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box flexGrow={1} maxWidth="100%" display={"flex"}>
          <TextField
            fullWidth
            label={t("shared.components.common.table.toolbar.search")}
            id="fullWidth"
            onChange={onSearchChange}
            sx={{ maxWidth: { sm: 300, md: 500 } }}
          />
        </Box>

        <Box>
          <Box sx={{ mt: 1, display: "flex" }}>
            {toolbar?.map((button: () => JSX.Element) => {
              return (
                <Box sx={{ ml: 2 }} key={button.toString()}>
                  {button()}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Toolbar>
  );
};

export default CustomTableToolbar;
