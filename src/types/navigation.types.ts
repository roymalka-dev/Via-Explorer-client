import { SvgIconComponent } from "@mui/icons-material";

export type navItemObject = {
  name: string;
  locale: string;
  path: string;
  icon: SvgIconComponent | React.ElementType;
};
