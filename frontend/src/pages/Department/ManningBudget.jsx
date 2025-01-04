import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import { useSnackbar } from './../../components/SnackbarContext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const columns = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "department", label: "Department", minWidth: 200, align: "left" },
  { id: "position", label: "Position", minWidth: 200, align: "left" },
  { id: "budget", label: "Budget", minWidth: 200, align: "left" },
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];

export default function ManningBudget() {
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentEdit, setDepartmentEdit] = useState("");
  const [positionEdit, setPositionEdit] = useState("");
  const [budgetEdit, setBudgetEdit] = useState("");
  const [positionId, setPositionId] = useState("");

  const [department, setDepartment] = React.useState(0);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudgetEdit(event.target.value);
  };

  const handleOpen = (row) => {
    setPositionId(row.id);
    setDepartmentEdit(row.department_name);
    setPositionEdit(row.name);
    setBudgetEdit(row.manning_budget);
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.department_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getDepartments();
    getPositions();
  },[]);

  const [departments, setDepartments] = React.useState([]);

  const getDepartments  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/department/all', {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setDepartments(response.data.data.departments);
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

  const getPositions  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/position/all', {
        department_id: department
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setRows(response.data.data.positions);
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

  const editPosition = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/position/edit/budget', {
        id: positionId,
        manning_budget: budgetEdit
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        getPositions();
        handleClose();
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Manning Budget
            </Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                value={department}
                label="Department"
                onChange={handleDepartmentChange}
              >
                <MenuItem value={0}>All</MenuItem>
                {departments.map((dep) => (
                  <MenuItem 
                  key={dep.id} 
                  value={dep.id}>
                    {dep.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          
            </Typography>
            <div>
            &nbsp;
            <Button variant="contained" color="primary" onClick={getPositions}>
              Search
            </Button>
            </div>
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
                        <TableCell>{row.department_name}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.manning_budget}</TableCell>
                        <TableCell align="center">
                          <IconButton color="success" onClick={() =>{handleOpen(row)}}>
                            <EditIcon />
                          </IconButton>
                          {/* <IconButton color="error">
                            <DeleteIcon />
                          </IconButton> */}
                        </TableCell>
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

          {/* Popup for create Department */}
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm" 
            fullWidth 
            sx={{ "& .MuiDialog-paper": { width: "450px", maxWidth: "450px", padding: "15px" } }} 
          >
            <DialogTitle align="center" sx={{ fontSize: '18px'}}>Edit Manning Budget</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Department"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={departmentEdit}
                disabled
              />
              <TextField
                fullWidth
                label="Position Name"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={positionEdit}
                disabled
              />
              <TextField
                fullWidth
                label="Manning Budget"
                margin="dense"
                variant="outlined"
                value={budgetEdit}
                onChange={handleBudgetChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={editPosition} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
