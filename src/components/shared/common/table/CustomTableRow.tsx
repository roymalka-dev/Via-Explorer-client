import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { TableColsType, tableRowsType } from "@/types/components.types";

interface TableRowComponentProps {
  row: tableRowsType;
  columns: TableColsType[];
}

const CustomTableRow: React.FC<TableRowComponentProps> = ({ row, columns }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {columns.map((column, index) => {
        const cellValue = row[column.name];

        return (
          <TableCell
            sx={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            key={`${column.name}-${index}`}
            align={index > 0 ? "right" : "left"}
          >
            {column.render ? column.render(cellValue, row) : cellValue}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CustomTableRow;
