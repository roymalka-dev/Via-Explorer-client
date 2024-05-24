import { appType } from "@/types/app.types";
import { SetStateAction } from "react";

/**
 * Function to handle editing an item.
 */
export const editItemHandler = (
  id: string,
  apps: appType[],
  handler: (value: SetStateAction<appType | null>) => void
) => {
  const appToEdit = apps.find((app) => app.id === id) || null;
  handler(appToEdit);
};
