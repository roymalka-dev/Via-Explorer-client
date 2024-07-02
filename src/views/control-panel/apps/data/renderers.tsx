import { Typography, Button, Chip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import fallbackImageUrl from "@/assets/images/no-image.png";
import { getChipColorByIndex } from "@/utils/components.utils";
import { tableRowsType } from "@/types/components.types";
import { appType } from "@/types/app.types";
import { SetStateAction } from "react";
import * as yup from "yup";
const urlSchema = yup.string().url();

export const appsTableRenderers = {
  string: (value: string) => <Typography>{value}</Typography>,

  imageButton: (
    value: string,
    row: tableRowsType,
    navigate: (path: string) => void
  ) => (
    <Button
      onClick={() => navigate(`/app/${row.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <img
        src={value || fallbackImageUrl}
        alt={value}
        width={50}
        height={"auto"}
      />
    </Button>
  ),
  date: (value: string | Date) => (
    <Typography>
      {value instanceof Date
        ? value?.toISOString().split("T")[0]
        : value?.split("T")[0]}
    </Typography>
  ),

  chipArray: (value: string[]) => (
    <>
      {value?.map((item, index) => (
        <Chip
          key={index}
          label={<Typography>{item}</Typography>}
          sx={{
            backgroundColor: getChipColorByIndex(index),
            margin: "2px",
          }}
        />
      ))}
    </>
  ),

  externalLink: (value: string) => {
    const isValidUrl = urlSchema.isValidSync(value);

    if (!value) {
      return <Typography></Typography>;
    }
    return isValidUrl ? (
      <a href={value} target="_blank" rel="noopener noreferrer">
        <OpenInNewIcon />
      </a>
    ) : (
      <Typography>{value}</Typography>
    );
  },
  editButton: (
    row: tableRowsType,
    apps: appType[],
    editItemHandler: (
      id: string,
      data: appType[],
      setSelectedEditApp: (value: SetStateAction<appType | null>) => void
    ) => void,
    setSelectedEditApp: (value: SetStateAction<appType | null>) => void
  ) => (
    <Button onClick={() => editItemHandler(row.id, apps, setSelectedEditApp)}>
      <EditRoundedIcon />
    </Button>
  ),
};
