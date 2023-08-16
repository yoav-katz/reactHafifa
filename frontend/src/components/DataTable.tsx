import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { ChangeEvent, MouseEvent } from "react";
import TablePaginationActions from "./TablePagination";

interface TableHeader {
  name: string;
  realName: string;
}

interface DataTableProps<T extends { id: number }> {
  headers: TableHeader[];
  data: T[];
  page: number;
  rowsPerPage: number;
  setRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setPage: (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  length: number;
}

const DataTable = <T extends { id: number }>({
  headers,
  data,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  length,
}: DataTableProps<T>) => {
  return (
    <>
      <TableContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "400px", //FIXME make this not pixels and pagination at the end
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.name} align="center">
                  {header.realName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: "200px" }}>
            {data.map((row) => (
              <TableRow key={row.id}>
                {headers.map(({ name }) => (
                  <TableCell key={row.id + "-" + name} align="center">
                    {String(row[name as keyof T])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
