import { TableDataType } from "@/types/components.types";

export const getStatusChipColor = (
  status: string
): { backgroundColor: string; opacity: number; color: string } => {
  switch (status.toLowerCase()) {
    case "failed":
      // Dark background, light text
      return { backgroundColor: "#FF0000", opacity: 0.5, color: "#FFFFFF" };
    case "completed":
      // Dark background, light text
      return { backgroundColor: "#008000", opacity: 0.5, color: "#FFFFFF" };
    case "pending":
      // Lighter background, dark text
      return { backgroundColor: "#FFD700", opacity: 0.5, color: "#000000" };
    default:
      // Default to a dark background, light text
      return { backgroundColor: "#000000", opacity: 0.5, color: "#FFFFFF" };
  }
};

export const tableDataGenerator = ({
  rows,
  cols,
  toolbar,
}: TableDataType): TableDataType => {
  return {
    toolbar,
    cols,
    rows,
  };
};

export const comperators = {
  string: (a: string, b: string) => a.localeCompare(b),
  number: (a: number, b: number) => a - b,
  date: (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime(),
};
