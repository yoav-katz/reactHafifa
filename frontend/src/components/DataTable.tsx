import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
          maxHeight: "330px",
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
          <TableBody>
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
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

export default DataTable;
