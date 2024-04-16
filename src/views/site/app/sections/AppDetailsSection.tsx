import { Box, Chip, Typography } from "@mui/material";

interface AppDetailsSectionProps {
  pso: string;
  psm: string;
  region: string;
  env: string;
  tenant: string;
  languages: string[];
}

const AppDetailsSection: React.FC<AppDetailsSectionProps> = ({
  pso,
  psm,
  region,
  env,
  tenant,
  languages,
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
      <Box display={"flex"}>
        <Typography variant="h6">Languages:</Typography>
        {languages?.map((language: string, index: number) => (
          <Chip
            key={index}
            label={language}
            variant="outlined"
            color="primary"
            sx={{
              ml: 1,
              height: "20px",
              fontSize: "0.7.5rem",
              padding: "0 5px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AppDetailsSection;
