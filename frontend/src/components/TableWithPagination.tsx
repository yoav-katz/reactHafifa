import { ChangeEvent, MouseEvent, useState, useMemo } from "react";
import { useQuery } from "react-query";
import api from "@/api";
import DataTable from "./DataTable";
import { CircularProgress, Typography } from "@mui/material";
import { ErrorResponse } from "@/types/ErrorResponse";
import { formatter } from "@/utils/formatter";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return [
    date.getDate().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getFullYear().toString().substring(2, 4),
  ].join("/");
};

interface TableWithPaginationProps<T> {
  headers: { name: string; realName: string }[];
  apiFunction: (page: number, rowsPerPage: number) => Promise<T[]>;
}

const TableWithPagination = <T extends { id: number }>({
  headers,
  apiFunction,
}: TableWithPaginationProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    isLoading: isLoadingData,
    isError: isErrorData,
    error: dataError,
    data,
  } = useQuery<T[], ErrorResponse>(
    ["data", page, rowsPerPage],
    () => apiFunction(page, rowsPerPage),
    {
      keepPreviousData: true,
    }
  );

  const {
    isLoading: isLoadingLength,
    isError: isErrorLength,
    error: lengthError,
    data: length,
  } = useQuery<number, ErrorResponse>(
    "data length",
    api.purchases().amountOfPurchases
  );

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const formattedData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.map((dataItem) => {
      const formattedDataItem = { ...dataItem };
      if ("date" in formattedDataItem) {
        formattedDataItem.date = formatDate(formattedDataItem.date as string);
      }

      if ("price" in formattedDataItem) {
        formattedDataItem.price = formatter(Number(formattedDataItem.price));
      }

      return formattedDataItem;
    });
  }, [data]);

  return (
    <>
      {isLoadingData || isLoadingLength || data === undefined ? (
        <CircularProgress />
      ) : isErrorData || isErrorLength ? (
        <Typography color="error" variant="h4">
          {dataError?.message ||
            lengthError?.message ||
            "Cannot load purchases"}
        </Typography>
      ) : (
        <DataTable
          headers={headers}
          data={formattedData}
          page={page}
          length={length as number}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={handleChangeRowsPerPage}
          setPage={handleChangePage}
        />
      )}
    </>
  );
};

export default TableWithPagination;
