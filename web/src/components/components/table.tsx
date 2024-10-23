import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  /*
  headers = [{key: "key", name="name"}]
  data = [{key: "key", value: value}]
  */
  const headers = props.headers || [];
  const data = props.data || [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((item, index) => {
              if (index === 0) {
                return <TableCell>{item.name}</TableCell>;
              }
              return <TableCell align="right">{item.name}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((item, index) => {
                if (index === 0) {
                  return (
                    <TableCell component="th" scope="row">
                      {row[item.key]}
                    </TableCell>
                  );
                }
                return <TableCell align="right">{row[item.key]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
