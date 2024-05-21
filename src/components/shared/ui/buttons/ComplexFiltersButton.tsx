import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Menu,
  FormControl,
  InputLabel,
  Select,
  Box,
  Tooltip,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export interface ComplexFilterOption {
  value: string;
  label: string;
}

export interface ComplexFilterFunctionOption {
  value: string;
  label: string;
  function(itemValue: string, filterValue: string): boolean;
}

interface ComplexFilterButtonProps {
  filterTypes: ComplexFilterOption[];
  filterFunctions: ComplexFilterFunctionOption[];
  handler: (
    filterType: string,
    filterFunction: ComplexFilterFunctionOption | undefined,
    filterValue: string
  ) => void;
}

const ComplexFilterButton: React.FC<ComplexFilterButtonProps> = ({
  filterTypes,
  filterFunctions,
  handler,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterType, setFilterType] = useState(filterTypes[0]?.value); // Default to the first filter type if available
  const [filterFunction, setFilterFunction] = useState<
    ComplexFilterFunctionOption | undefined
  >(
    filterFunctions[0] // Default to the first filter function if available
  );
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Ensure filterFunction is set even when filterFunctions array changes
    setFilterFunction(filterFunctions[0]);
  }, [filterFunctions]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleApplyFilter = () => {
    if (filterType && filterFunction) {
      handler(filterType, filterFunction, filterValue);
    }
    handleCloseMenu();
  };

  const handleClearFilters = () => {
    setFilterType("");
    setFilterFunction(filterFunctions[0]);
    setFilterValue("");
    handler("", filterFunctions[0], "");
  };

  return (
    <Box>
      <Tooltip title={"Apply filters"}>
        <Button onClick={handleOpenMenu}>
          <FilterAltIcon color={filterValue === "" ? "secondary" : "primary"} />
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box sx={{ p: 2, maxWidth: 200 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filter Type</InputLabel>
            <Select
              value={filterType}
              label="Filter Type"
              onChange={(event) => setFilterType(event.target.value as string)}
            >
              {filterTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filter Function</InputLabel>
            <Select
              value={filterFunction?.value}
              label="Filter Function"
              onChange={(event) => {
                const selectedFunction = filterFunctions.find(
                  (option) => option.value === event.target.value
                );
                setFilterFunction(selectedFunction);
              }}
            >
              {filterFunctions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Value"
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="outlined" onClick={handleApplyFilter} fullWidth>
            Apply
          </Button>
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={handleClearFilters}
            fullWidth
          >
            clear
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default ComplexFilterButton;
