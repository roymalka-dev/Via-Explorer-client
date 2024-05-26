import { comperators } from "@/utils/components.utils";

import { logsTableRenderers } from "./renderers";

export interface metadataType {
  tag: string;
  location: string;
  error: string;
}
export const getControlPanelLogCols = () => [
  {
    name: "timestamp",
    locale: "Time",
    render: (value: string) => logsTableRenderers.date(value),
    comparator: comperators.date,
    isLocked: true,
  },
  {
    name: "level",
    locale: "Level",
    render: (value: string) => logsTableRenderers.string(value),
    comparator: comperators.string,
    isLocked: false,
  },
  {
    name: "message",
    locale: "Message",
    render: (value: string) => logsTableRenderers.expandString(value),
    comparator: comperators.string,
    isLocked: false,
  },
  {
    name: "metadata",
    locale: "Error",
    render: (value: metadataType) =>
      logsTableRenderers.expandString(value?.error),
    comparator: comperators.string,
    isLocked: false,
  },
  {
    name: "metadata",
    locale: "Tag",
    render: (value: metadataType) => logsTableRenderers.string(value?.tag),
    comparator: comperators.string,
    isLocked: false,
  },
  {
    name: "metadata",
    locale: "Location",
    render: (value: metadataType) => logsTableRenderers.string(value?.location),
    comparator: comperators.string,
    isLocked: false,
  },
];
