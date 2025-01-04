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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useSnackbar } from './../../components/SnackbarContext';
import DialogContentText from '@mui/material/DialogContentText';

export default function Positions() {
  const [rows, setRows] = React.useState([]);
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = (row) => {
    setDepartmentEdit(0);
    setPositionName('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (row) => {
    setPositionId(row.id)
    setDepartmentEdit(row.department_id);
    setPositionName(row.name);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = (row) => {
    setPositionId(row.id)
    setDepartmentEdit(row.department_id);
    setPositionName(row.name);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.department_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [department, setDepartment] = React.useState(0);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const [departmentEdit, setDepartmentEdit] = React.useState(0);

  const handleDepartmentEditChange = (event) => {
    setDepartmentEdit(event.target.value);
  };

  const [positionId, setPositionId] = React.useState('');

  const [positionName, setPositionName] = React.useState('');

  const handlePositionNameChange = (event) => {
    setPositionName(event.target.value);
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

  const createPosition = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/position/create', {
        department_id: departmentEdit,
        name: positionName
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

  const editPosition = async (positionStatus) =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/position/edit', {
        id: positionId,
        name: positionName,
        status: positionStatus
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
        handleCloseDelete();
        handleCloseEdit();
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
              Positions
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
              Create Position
            </Button>
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
                        }}>Position</TableCell>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Department</TableCell>
                      <TableCell align="center" style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.department_name}</TableCell>
                          <TableCell align="center">
                            <IconButton color="success" onClick={() => handleOpenEdit(row)}>
                              <EditIcon />
                            </IconButton>
                            {/* <IconButton color="error" onClick={() => handleOpenDelete(row)}>
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
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            sx={{ "& .MuiDialog-paper": { width: "450px", maxWidth: "450px", padding: "15px" } }}
          >
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>Create Position</DialogTitle>
            <DialogContent>
              <br />
              <FormControl fullWidth sx={{paddingBottom: '15px'}}>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  value={departmentEdit}
                  label="Department"
                  onChange={handleDepartmentEditChange}
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
              <TextField
                fullWidth
                label="Position Name"
                margin="dense"
                variant="outlined"
                value={positionName}
                onChange={handlePositionNameChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={createPosition} color="primary" variant="contained">
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
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>Edit Position</DialogTitle>
            <DialogContent>
              <br />
              <FormControl fullWidth sx={{paddingBottom: '15px'}}>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  value={departmentEdit}
                  label="Department"
                  onChange={handleDepartmentEditChange}
                  disabled
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
              <TextField
                fullWidth
                label="Position Name"
                margin="dense"
                variant="outlined"
                value={positionName}
                onChange={handlePositionNameChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button onClick={() => {editPosition(1)}} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this record?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>No</Button>
              <Button onClick={() => {editPosition(2)}} variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
