import { appBuildVersionType } from "@/types/app.types";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
interface AppBuildManagerSectionProps {
  iosBuilds?: appBuildVersionType[];
  androidBuilds?: appBuildVersionType[];
}

const AppBuildManagerSection: React.FC<AppBuildManagerSectionProps> = ({
  iosBuilds,
  androidBuilds,
}) => {
  const [selectedIosLink, setSelectedIosLink] = useState<string>("");
  const [selectedAndroidLink, setSelectedAndroidLink] = useState<string>("");

  const handleIosChange = (event: SelectChangeEvent<string>) => {
    const selectedLink =
      iosBuilds?.find((build) => build.version === event.target.value)?.link ||
      "";
    setSelectedIosLink(selectedLink);
  };

  const handleAndroidChange = (event: SelectChangeEvent<string>) => {
    const selectedLink =
      androidBuilds?.find((build) => build.version === event.target.value)
        ?.link || "";
    setSelectedAndroidLink(selectedLink);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: {
          xs: 1,
          sm: 2,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            marginBottom: 3,
          }}
        >
          <Typography variant="subtitle1">iOS Builds</Typography>
          <Select
            value={
              iosBuilds?.find((build) => build.link === selectedIosLink)
                ?.version || ""
            }
            onChange={handleIosChange}
            displayEmpty
            fullWidth
            sx={{ marginBottom: 2 }}
            renderValue={(selectedValue) => {
              if (
                selectedValue === "" &&
                (!iosBuilds || iosBuilds.length === 0)
              ) {
                return "No builds available";
              }
              return selectedValue || "Select a version";
            }}
          >
            {iosBuilds?.map((build: appBuildVersionType, index: number) => (
              <MenuItem key={index} value={build.version}>
                {build.version}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AppleIcon />}
            href={selectedIosLink}
            disabled={!selectedIosLink}
            target="_blank"
            aria-label="App Store"
            sx={{
              width: "100%",
            }}
          >
            Test Flight
          </Button>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">Android Builds</Typography>
          <Select
            value={
              androidBuilds?.find((build) => build.link === selectedAndroidLink)
                ?.version || ""
            }
            onChange={handleAndroidChange}
            displayEmpty
            fullWidth
            sx={{ marginBottom: 2 }}
            renderValue={(selectedValue) => {
              if (
                selectedValue === "" &&
                (!androidBuilds || androidBuilds.length === 0)
              ) {
                return "No builds available";
              }
              return selectedValue || "Select a version";
            }}
          >
            {androidBuilds?.map((build: appBuildVersionType, index: number) => (
              <MenuItem key={index} value={build.version}>
                {build.version}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AndroidIcon />}
            href={selectedAndroidLink}
            disabled={!selectedAndroidLink}
            target="_blank"
            aria-label="App Store"
            sx={{
              width: "100%", // Ensures button is full width
            }}
          >
            APK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AppBuildManagerSection;
