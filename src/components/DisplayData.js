import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";

const DisplayData = ({ data }) => {
  const renderTable = (title, rows) => (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );

  return (
    data && (
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {renderTable("Ratio", data.ratio)}
          {renderTable("Partial Ratio", data.partial_ratio)}
          {renderTable("Token Set Ratio", data.token_set_ratio)}
          {renderTable("Token Sort Ratio", data.token_sort_ratio)}
        </Grid>
      </Box>
    )
  );
};

export default DisplayData;
