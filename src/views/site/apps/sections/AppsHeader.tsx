/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  TextField,
  CircularProgress,
  useTheme,
  Button,
  Tooltip,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CheckboxMenuButton } from "@/components/shared/ui/buttons/CheckboxMenuButton";
import { SelectMenuButton } from "@/components/shared/ui/buttons/SelectMenuButton";
import { useTranslation } from "react-i18next";
import { appSorterType, appType, appFilterType } from "@/types/app.types";
import { useDispatch } from "react-redux";
import { resetQueries } from "@/store/slices/searchSlice";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import { toastConfig } from "@/configs/toast.config";
import { toast } from "react-toastify";

const appsSorters: appSorterType[] = [
  {
    name: "none",
    comperator: () => 0,
  },
  {
    name: "name",
    comperator: (a, b) => a.name.localeCompare(b.name),
  },
  {
    name: "id",
    comperator: (a, b) => Number(a.id) - Number(b.id),
  },
  {
    name: "region",
    comperator: (a, b) => (a.region ?? "").localeCompare(b.region ?? ""),
  },
];

const appsFilters: appFilterType[] = [
  {
    name: "us1",
    filter: (app) => app.region === "us1",
  },
  {
    name: "eu1",
    filter: (app) => app.region === "eu1",
  },
  {
    name: "ap1",
    filter: (app) => app.region === "eu1",
  },
  {
    name: "ap2",
    filter: (app) => app.region === "eu1",
  },
];

type AppsHeaderProps = {
  apps: appType[];
  setDisplayedApps: React.Dispatch<React.SetStateAction<appType[]>>;
  searchHandler: (query: string) => void;
  status: string;
};

export const AppsHeader: React.FC<AppsHeaderProps> = ({
  apps,
  setDisplayedApps,
  searchHandler,
  status,
}) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [sorter, setSorter] = useState<appSorterType>(appsSorters[0]);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    applyFiltersAndSorters();
  }, [filters, sorter]);

  const applyFiltersAndSorters = () => {
    let resultApps: appType[] = [];

    if (filters.length > 0) {
      apps.forEach((app) => {
        const isFilteredIn = filters.some((filterName) => {
          const filterFunc = appsFilters.find(
            (f) => f.name === filterName
          )?.filter;
          return filterFunc ? filterFunc(app) : false;
        });
        if (isFilteredIn) {
          resultApps.push(app);
        }
      });
    } else {
      resultApps = [...apps];
    }

    resultApps.sort(sorter.comperator);

    setDisplayedApps(resultApps);
  };

  const handleSetOptions = (
    selected: boolean,
    option: string,
    setOptionFunc: React.Dispatch<React.SetStateAction<string[]>>,
    currentOptions: string[]
  ) => {
    const updatedOptions = selected
      ? [...currentOptions, option]
      : currentOptions.filter((opt) => opt !== option);
    setOptionFunc(updatedOptions);
  };

  const handleSetSorter = (selectedSorter: string) => {
    const newSorter =
      appsSorters.find((s) => s.name === selectedSorter) || appsSorters[0];
    setSorter(newSorter);
  };

  const handleClearCache = () => {
    dispatch(resetQueries());
    toast.success("Search Cache Cleared", toastConfig);
  };

  const memoizedBaseFilters = useMemo(() => appsFilters.map((f) => f.name), []);
  const memoizedBaseSorters = useMemo(() => appsSorters.map((s) => s.name), []);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "transparent" }}
      dir={theme.direction}
    >
      <Toolbar>
        <Grid
          container
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
        >
          <Grid item sx={{ flexGrow: 1, maxWidth: 500 }}>
            <Box sx={{ width: "100%", borderRadius: 3 }}>
              <TextField
                fullWidth
                label={t("site.pages.apps.sections.appsheader.search")}
                id="appsPageSearch"
                onChange={(e) => searchHandler(e.target.value)}
                InputProps={{
                  endAdornment:
                    status === "loading" ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ m: 1 }}
                      />
                    ) : null,
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex">
              <CheckboxMenuButton
                name={
                  <TuneIcon
                    color={filters.length > 0 ? "primary" : "secondary"}
                  />
                }
                options={memoizedBaseFilters}
                active={filters}
                handler={(selected: boolean, option: string) =>
                  handleSetOptions(selected, option, setFilters, filters)
                }
              />
              <SelectMenuButton
                name={
                  <FilterListIcon
                    color={sorter.name !== "none" ? "primary" : "secondary"}
                  />
                }
                options={memoizedBaseSorters}
                active={sorter.name}
                handler={handleSetSorter}
              />
              <Tooltip title="Clear search cache">
                <Button onClick={() => handleClearCache()}>
                  <CachedRoundedIcon color={"secondary"} />
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
