import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { TableColsType } from "@/types/components.types";
import { useTranslation } from "react-i18next";

type CustomTableHeadProps = {
  cols: TableColsType[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: "asc" | "desc";
  orderBy: string;
};

const CustomTableHead: React.FC<CustomTableHeadProps> = ({
  cols,
  onRequestSort,
  order,
  orderBy,
}) => {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        {cols.map((col, index) => (
          <TableCell
            key={col.name}
            align={index > 0 ? "right" : "left"}
            sortDirection={orderBy === col.name ? order : false}
          >
            {!col.name.includes("options") && (
              <TableSortLabel
                active={orderBy === col.name}
                direction={orderBy === col.name ? order : "asc"}
                onClick={createSortHandler(col.name)}
              >
                {col.locale ? t(col.locale) : col.name}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
