import {FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

const DataTable: FC<DataTableProps<any>> = ({title, headers, data}) => {
  return (
    <>
      <Title>{title}</Title>
       <TableContainer sx={{ maxHeight: 440 }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {headers.map(({name}) => {
                      return (
                        <TableCell key={row.id} align='center'>
                          {row[name]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DataTable;