import { comperators } from "@/utils/components.utils";

import { logsTableRenderers } from "./renderers";

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
    name: "error",
    locale: "Error",
    render: (value: string) => logsTableRenderers.expandString(value),
    comparator: comperators.string,
    isLocked: false,
  },
  {
    name: "tag",
    locale: "Tag",
    render: (value: string) => logsTableRenderers.string(value),
    comparator: comperators.string,
    isLocked: false,
  },
  {
    name: "location",
    locale: "Location",
    render: (value: string) => logsTableRenderers.string(value),
    comparator: comperators.string,
    isLocked: false,
  },
];
