import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TablePagination,
  TableRow,
  Button,
  IconButton,
  Box,
  Container,
  Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useSnackbar } from '../../components/SnackbarContext';
import DialogContentText from '@mui/material/DialogContentText';

export default function AuditLogs() {
  const [rows, setRows] = React.useState([]);
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredRows = rows.filter((row) =>
    row.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || row.log.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [user, setUser] = React.useState(0);

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => { 
    getUsers();
    getLogs();
  },[]);

  const [users, setUsers] = React.useState([]);


  const getUsers  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/all', {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setUsers(response.data.data.users);
      } else {
        showSnackbar(response.data.message, 'error')
      }
    } catch (error) {
      if(error.status == 401){
        showSnackbar(error.message, 'error');
      }else{
        showSnackbar(error.message, 'error');
      }
    }
  };

  const getLogs  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/audit-logs/all', {
        user_id: user,
        start_date: '',
        end_date: ''
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        console.log(response.data.data);
        setRows(response.data.data.logs);
      } else {
        showSnackbar(response.data.message, 'error')
      }
    } catch (error) {
      if(error.status == 401){
        showSnackbar(error.message, 'error');
      }else{
        showSnackbar(error.message, 'error');
      }
    }
  };

  return (
    <>
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Container>
          {/* Header Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Audit Logs
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="department-label">User</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                value={user}
                label="Department"
                onChange={handleUserChange}
              >
                <MenuItem value={0}>All</MenuItem>
                {users.map((ur) => (
                  <MenuItem 
                  key={ur.id} 
                  value={ur.id}>
                    {ur.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            </Grid>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          
            </Typography>
            <div>
            &nbsp;
            <Button variant="contained" color="primary" onClick={getUsers}>
              Search
            </Button>
            </div>
          </Box>

          {/* Search Box */}
          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: "300px" }}
            />
          </Box>

          {/* Table Content */}
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table stickyHeader
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>ID</TableCell>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>User Name</TableCell>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Log Details</TableCell>
                         <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.user_name}</TableCell>
                          <TableCell>{row.log}</TableCell>
                          <TableCell>{row.created_at}</TableCell>
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
          </Box>
        </Container>
      </Box>
    </>
  );
}
