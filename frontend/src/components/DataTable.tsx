import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Title from './Title.tsx';

interface headerObject {
  name: string;
  realName: string;
}

interface DataTableProps<T extends { id: number }> {
  title: string;
  headers: headerObject[];
  data: T[];
}

const DataTable = <T extends {id:number}>({title, headers, data}: DataTableProps<T>) => {
  return (
    <>
      <Title>{title}</Title>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.name} align='center'>
                {header.realName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .map((row) => {
              return (
                <TableRow key={row.id}>
                  {headers.map(({name}) => {
                    return (
                      <TableCell key={String(row[name as keyof T])} align='center'>
                        {String(row[name as keyof T])}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}

export default DataTable;