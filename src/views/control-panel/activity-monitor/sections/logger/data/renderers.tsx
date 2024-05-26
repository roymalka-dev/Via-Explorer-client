import ExpandString from "@/components/shared/ui/text/ExpandString";
import { Typography } from "@mui/material";

export const logsTableRenderers = {
  string: (value: string) => <Typography>{value}</Typography>,
  message: (value: string) => <Typography>{value}</Typography>,
  expandString: (value: string) => <ExpandString value={value} minLen={50} />,

  date: (value: string | Date) => (
    <Typography>
      {value instanceof Date
        ? value?.toISOString().split("T")[0] +
          " " +
          value?.toISOString().split("T")[1].split(".")[0]
        : value?.split("T")[0] + " " + value?.split("T")[1].split(".")[0]}
    </Typography>
  ),
};
