import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import axios from 'axios';
import { useSnackbar } from './../../components/SnackbarContext';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Typography,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Container,
} from "@mui/material";

const columns = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 200, align: "left" }
];

export default function UserRoles() {
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserRoles  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user-roles/all', {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setRows(response.data.data.user_roles);
      } else {
        showSnackbar(response.data.message, 'error')
      }
    } catch (error) {
      if(error.status == 401){
        showSnackbar(error.message, 'error');
        setRows([]);
      }else{
        showSnackbar(error.message, 'error');
        setRows([]);
      }
    }
  };

  useEffect(() => { 
    getUserRoles();
  },[]);

  return (
    <>
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Container>
          {/* Header Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              User Roles
            </Typography>
          </Box>
          {/* Search Box below Create Department */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: "300px" }}
            />
          </Box>

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
