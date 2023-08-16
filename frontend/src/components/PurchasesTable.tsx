import { ChangeEvent, MouseEvent, useState } from "react";
import { Purchase } from "@/types/Purchase";
import { useQuery } from "react-query";
import api from "@/api";
import DataTable from "./DataTable";
import { CircularProgress, Typography } from "@mui/material";
import { ErrorResponse } from "@/types/ErrorResponse";

const headers = [
  { name: "product", realName: "שם המוצר" },
  { name: "customer", realName: "שם הלקוח" },
  { name: "amount", realName: "כמות" },
  { name: "price", realName: "תשלום" },
  { name: "date", realName: "תאריך הזמנה" },
];

const PurchasesTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    isLoading: isLoadingPurchases,
    isError: isErrorPurchases,
    error: purchasesError,
    data: purchases,
  } = useQuery<Purchase[], ErrorResponse>(
    ["purchases", page, rowsPerPage],
    () => api.purchases().getWithPagination(page, rowsPerPage),
    {
      keepPreviousData: true,
    }
  );

  const {
    isLoading: isLoadingPurchaseAmount,
    isError: isErrorPurchaseAmount,
    error: purchasesAmountError,
    data: purchaseAmount,
  } = useQuery<number, ErrorResponse>(
    "purchase amount",
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

  return (
    <>
      {isLoadingPurchases ||
      isLoadingPurchaseAmount ||
      purchases === undefined ? (
        <CircularProgress />
      ) : isErrorPurchases || isErrorPurchaseAmount ? (
        <Typography color="error" variant="h4">
          {purchasesError?.message ||
            purchasesAmountError?.message ||
            "Cannot load purchases"}
        </Typography>
      ) : (
        <DataTable
          headers={headers}
          data={purchases}
          page={page}
          length={purchaseAmount as number}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={handleChangeRowsPerPage}
          setPage={handleChangePage}
        />
      )}
    </>
  );
};

export default PurchasesTable;
