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
    <Box sx={{ width: "100%", padding: 3 }}>
      {iosBuilds?.length === 0 && androidBuilds?.length === 0 ? (
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          No builds available
        </Typography>
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1, marginBottom: 3 }}>
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
              sx={{ width: "100%" }}
            >
              Test Flight
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">Android Builds</Typography>
            <Select
              value={
                androidBuilds?.find(
                  (build) => build.link === selectedAndroidLink
                )?.version || ""
              }
              onChange={handleAndroidChange}
              displayEmpty
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              {androidBuilds?.map(
                (build: appBuildVersionType, index: number) => (
                  <MenuItem key={index} value={build.version}>
                    {build.version}
                  </MenuItem>
                )
              )}
            </Select>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AndroidIcon />}
              href={selectedAndroidLink}
              disabled={!selectedAndroidLink}
              target="_blank"
              aria-label="App Store"
              sx={{ width: "100%" }}
            >
              APK
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AppBuildManagerSection;
