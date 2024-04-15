import { Box, Typography } from "@mui/material";

interface AppDetailsSectionProps {
  pso: string;
  psm: string;
  region: string;
  env: string;
  tenant: string;
}

const AppDetailsSection: React.FC<AppDetailsSectionProps> = ({
  pso,
  psm,
  region,
  env,
  tenant,
}) => {
  return (
    <Box>
      <Typography
        variant="body2"
        gutterBottom
      >{`Region: ${region}`}</Typography>
      <Typography variant="body2" gutterBottom>{`Env: ${env}`}</Typography>
      <Typography
        variant="body2"
        gutterBottom
      >{`Tenant: ${tenant}`}</Typography>
      <Typography variant="body2" gutterBottom>{`PSO: ${pso}`}</Typography>
      <Typography variant="body2" gutterBottom>{`PSM: ${psm}`}</Typography>
    </Box>
  );
};

export default AppDetailsSection;
