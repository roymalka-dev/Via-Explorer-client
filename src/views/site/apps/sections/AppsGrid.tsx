import AppCard from "@/components/shared/ui/cards/AppCard";
import { appType } from "@/types/app.types";
import { Grid } from "@mui/material";

const AppsGrid: React.FC<{ apps: appType[] }> = ({ apps }) => {
  return (
    <Grid container spacing={4}>
      {apps.map((app, index) => (
        <Grid item xs={6} sm={6} md={3} lg={3} key={index}>
          <AppCard app={app} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AppsGrid;
