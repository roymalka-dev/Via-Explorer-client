import * as React from "react";
import {
  Button,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type SelectMenuButtonProps = {
  name: React.ReactNode;
  options: string[];
  active: string;
  handler: (option: string) => void;
};

export const SelectMenuButton = ({
  name,
  options,
  active,
  handler,
}: SelectMenuButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event: SelectChangeEvent<string>) => {
    handler(event.target.value);
    handleClose();
  };

  return (
    <div>
      <Button
        id="select-button"
        aria-controls={open ? "select-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {name}
      </Button>
      <Menu
        id="select-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "select-button",
        }}
      >
        <MenuItem>
          <Select value={active} onChange={handleSelect} displayEmpty fullWidth>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </MenuItem>
      </Menu>
    </div>
  );
};
