import React from "react";
import { Pagination } from "@mui/material";

type AppsPaginationProps = {
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const AppsPagination: React.FC<AppsPaginationProps> = ({
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      color="primary"
      onChange={handleChange}
    />
  );
};

export default AppsPagination;
