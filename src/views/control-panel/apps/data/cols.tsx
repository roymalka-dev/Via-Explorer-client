import { tableRowsType } from "@/types/components.types";
import { comperators } from "@/utils/components.utils";
import { Typography } from "@mui/material";
import { editItemHandler } from "../forms/utils/editItemHandler";

import { appsTableRenderers } from "./renderers";
import { appType } from "@/types/app.types";
import { SetStateAction } from "react";

interface ColumnConfigProps {
  navigate: (path: string) => void;
  appsFromStore: { data: appType[] };
  setSelectedEditApp: (app: SetStateAction<appType | null>) => void;
}

export const getControlPanelAppsCols = ({
  navigate,
  appsFromStore,
  setSelectedEditApp,
}: ColumnConfigProps) => [
  {
    name: "imageUrl",
    locale: "controlPanel.pages.apps.table.cols.image",
    render: (value: string, row: tableRowsType) =>
      appsTableRenderers.imageButton(value, row, navigate),
    comparator: comperators.string,
    isLocked: true,
  },
  {
    name: "id",
    locale: "controlPanel.pages.apps.table.cols.id",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.number,
    isLocked: true,
  },
  {
    name: "name",
    locale: "controlPanel.pages.apps.table.cols.name",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
    isLocked: true,
  },

  {
    name: "env",
    locale: "controlPanel.pages.apps.table.cols.env",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
    autoSelect: false,
  },

  {
    name: "tenant",
    locale: "controlPanel.pages.apps.table.cols.tenant",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "region",
    locale: "controlPanel.pages.apps.table.cols.region",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "city",
    locale: "controlPanel.pages.apps.table.cols.city",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "country",
    locale: "controlPanel.pages.apps.table.cols.country",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "iosVersion",
    locale: "controlPanel.pages.apps.table.cols.iosVersion",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "iosBundleId",
    locale: "Ios Bundle ID",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },

  {
    name: "iosRelease",
    locale: "controlPanel.pages.apps.table.cols.iosRelease",
    render: (value: string | Date) => appsTableRenderers.date(value),
    comparator: comperators.date,
    autoSelect: false,
  },

  {
    name: "iosCurrentVersionReleaseDate",
    locale: "controlPanel.pages.apps.table.cols.iosCurrentRelease",
    render: (value: string | Date) => appsTableRenderers.date(value),
    comparator: comperators.date,
  },
  {
    name: "iosFolder",
    locale: "controlPanel.pages.apps.table.cols.iosFolder",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
    autoSelect: false,
  },
  {
    name: "androidAppId",
    locale: "Android App ID",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "androidVersion",
    locale: "controlPanel.pages.apps.table.cols.androidVersion",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },

  {
    name: "androidRelease",
    locale: "controlPanel.pages.apps.table.cols.androidRelease",
    render: (value: string | Date) => appsTableRenderers.date(value),
    comparator: comperators.date,
    autoSelect: false,
  },

  {
    name: "androidCurrentVersionReleaseDate",
    locale: "controlPanel.pages.apps.table.cols.androidCurrentRelease",
    render: (value: string | Date) => appsTableRenderers.date(value),
    comparator: comperators.date,
  },
  {
    name: "androidFolder",
    locale: "controlPanel.pages.apps.table.cols.androidFolder",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
    autoSelect: false,
  },
  {
    name: "languages",
    locale: "controlPanel.pages.apps.table.cols.languages",
    render: (value: string[]) => appsTableRenderers.chipArray(value),
    comparator: (a: string[], b: string[]) => a[0]?.localeCompare(b[0]),
  },
  {
    name: "webAppLink",
    locale: "Web App",
    render: (value: string) => appsTableRenderers.externalLink(value),
    comparator: comperators.string,
  },
  {
    name: "pso",
    locale: "pso",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "psm",
    locale: "psm",
    render: (value: string) => appsTableRenderers.string(value),
    comparator: comperators.string,
  },
  {
    name: "colorSpecs",
    locale: "controlPanel.pages.apps.table.cols.colorSpecs",
    render: (value: string) => appsTableRenderers.externalLink(value),
    comparator: comperators.string,
    autoSelect: false,
  },
  {
    name: "figmaAppName",
    locale: "controlPanel.pages.apps.table.cols.figmaAppName",
    render: (value: string) => <Typography>{value}</Typography>,
    comparator: comperators.string,
    autoSelect: false,
  },
  {
    name: "webAppFigmaLink",
    locale: "controlPanel.pages.apps.table.cols.webAppFigmaLink",
    render: (value: string) => appsTableRenderers.externalLink(value),
    comparator: comperators.string,
    autoSelect: false,
  },

  {
    name: "options-edit",
    locale: "Edit",
    render: (_value: string, row: tableRowsType) =>
      appsTableRenderers.editButton(
        row,
        appsFromStore.data,
        editItemHandler,
        setSelectedEditApp
      ),
    autoSelect: false,
  },
];
