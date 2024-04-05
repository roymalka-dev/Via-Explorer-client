/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  TableCell,
  TableRow,
} from "@mui/material";
import { debounce } from "lodash";
import CustomTableHead from "./CustomTableHead";
import CustomTableRow from "./CustomTableRow";
import CustomTableToolbar from "./CustomTableToolbar";
import useTablePagination from "@/hooks/useTablePagination";
import useTableSorter from "@/hooks/useTableSorter";
import { TableDataType } from "@/types/components.types";
import { getConfigValue } from "@/utils/configurations.utils";

interface CustomTableProps {
  data: TableDataType;
  toolbar?: (() => JSX.Element)[];
  loading?: boolean;
  searchHandler?: (searchText: string) => void;
  paginationHandler?: typeof useTablePagination;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  toolbar,
  loading,
  searchHandler,
  paginationHandler,
}) => {
  const ALLOWED_PAGINATION_NUMBERS = getConfigValue(
    "NUMBER_OF_ALLOWED_PAGAINATION",
    [10, 25, 100, 300, 1000]
  ) as number[];

  const defaultPagination = useTablePagination(25);

  // Determine which pagination logic to use
  const pagination = paginationHandler
    ? paginationHandler(25)
    : defaultPagination;
  const { order, orderBy, handleRequestSort } = useTableSorter();

  const [inputValue, setInputValue] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const debouncedSearch = debounce(() => setSearchText(inputValue), 300);
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [inputValue]);

  const filteredRows = useMemo(() => {
    return searchText
      ? data.rows.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : data.rows;
  }, [data.rows, searchText]);

  const sortedAndFilteredRows = useMemo(() => {
    if (
      !orderBy ||
      !data.cols.find((col) => col.name === orderBy)?.comparator
    ) {
      return filteredRows;
    }
    const comparator = data.cols.find((col) => col.name === orderBy)
      ?.comparator!;
    return [...filteredRows].sort((a, b) => {
      const orderModifier = order === "asc" ? 1 : -1;
      return orderModifier * comparator(a[orderBy], b[orderBy]);
    });
  }, [filteredRows, orderBy, order, data.cols]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchHandler
      ? searchHandler(event.target.value)
      : setInputValue(event.target.value);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mx: "auto", maxWidth: "100%", overflowX: "auto" }}
    >
      <CustomTableToolbar
        onSearchChange={handleSearchChange}
        toolbar={toolbar}
      />
      <Table aria-label="custom table">
        <CustomTableHead
          cols={data.cols}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={data.cols.length}
                style={{ textAlign: "center" }}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            sortedAndFilteredRows
              .slice(
                pagination.page * pagination.rowsPerPage,
                pagination.page * pagination.rowsPerPage +
                  pagination.rowsPerPage
              )
              .map((row, index) => (
                <CustomTableRow key={index} row={row} columns={data.cols} />
              ))
          )}
        </TableBody>
      </Table>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <TablePagination
          rowsPerPageOptions={ALLOWED_PAGINATION_NUMBERS}
          component="div"
          count={sortedAndFilteredRows.length}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={pagination.handleChangePage}
          onRowsPerPageChange={pagination.handleChangeRowsPerPage}
        />
      </Box>
    </TableContainer>
  );
};

export default CustomTable;
