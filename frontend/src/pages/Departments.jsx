import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import axios from 'axios';
import { useSnackbar } from './../components/SnackbarContext';
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

const columns = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 200, align: "center" },
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];

export default function Departments() {
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const handleNewDepartment = (event) => setNewDepartment(event.target.value);

  const handleOpen = () => {
    setNewDepartment('');
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const handleOpenEdit = (row) => {
    setDepartmentId(row.id)
    setNewDepartment(row.name);
    setOpenEdit(true)
  };
  const handleCloseEdit = () => setOpenEdit(false);

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
        setRows(response.data.data.departments);
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

  const createDepartment  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/department/create', {
        name: newDepartment
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        setOpen(false)
        getDepartments();
        setNewDepartment('');
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

  const editDepartment  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/department/edit', {
        name: newDepartment,
        id: departmentId
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        setOpenEdit(false)
        getDepartments();
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
    getDepartments();
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
              Departments
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              create Department
            </Button>
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
                        <TableCell align="center">
                          <IconButton color="success" onClick={() => handleOpenEdit(row)}>
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
            <DialogTitle align="center" sx={{ fontSize: '18px'}}>Create Department</DialogTitle>
            <DialogContent>
              <TextField
                value={newDepartment}
                onChange={handleNewDepartment}
                fullWidth
                label="Name"
                margin="dense"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={createDepartment} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openEdit}
            onClose={handleCloseEdit}
            maxWidth="sm" 
            fullWidth 
            sx={{ "& .MuiDialog-paper": { width: "450px", maxWidth: "450px", padding: "15px" } }} 
          >
            <DialogTitle align="center" sx={{ fontSize: '18px'}}>Edit Department</DialogTitle>
            <DialogContent>
              <TextField
                value={newDepartment}
                onChange={handleNewDepartment}
                fullWidth
                label="Name"
                margin="dense"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button onClick={editDepartment} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
