import { useState } from "react";

type Order = "asc" | "desc";

interface UseTableSortReturnType {
  order: Order;
  orderBy: string;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: string
  ) => void;
}

const useTableSort = (defaultOrderBy: string = ""): UseTableSortReturnType => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return { order, orderBy, handleRequestSort };
};

export default useTableSort;
