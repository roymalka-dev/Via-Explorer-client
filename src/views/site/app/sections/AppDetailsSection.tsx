import { Box, Typography } from "@mui/material";

interface AppDetailsSectionProps {
  pso: string;
  psm: string;
}

const AppDetailsSection: React.FC<AppDetailsSectionProps> = ({ pso, psm }) => {
  return (
    <Box>
      <Typography variant="h6">App Details</Typography>
      <Typography variant="body1">PSO: {pso}</Typography>
      <Typography variant="body1">PSM: {psm}</Typography>
    </Box>
  );
};

export default AppDetailsSection;
