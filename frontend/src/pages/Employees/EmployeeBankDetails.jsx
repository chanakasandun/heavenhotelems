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
  Grid,
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

export default function EmployeeBankDetails() {
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

  const handleOpenEdit = (row) => {
    setEmployeeEdit(row.id + ' - ' + row.first_name + ' ' + row.last_name)
    setBankCodeEdit(row.bank_code)
    setBankNameEdit(row.bank_name)
    setBranchEdit(row.branch)
    setAccountNumberEdit(row.account_number)
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
    row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || row.department_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    getEmployees();
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

  const [department, setDepartment] = React.useState(0);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const getEmployees  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/employee-bank-details/all', {
        department_id: department
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setRows(response.data.data.employees);
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
        getEmployees();
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

  const [employeeEdit, setEmployeeEdit] = React.useState('');
      
  const handleEmployeeChange = (event) => {
    setEmployeeEdit(event.target.value);
  };

  const [bankCodeEdit, setBankCodeEdit] = React.useState('');
      
  const handleBankCodeChange = (event) => {
    setBankCodeEdit(event.target.value);
  };

  const [bankNameEdit, setBankNameEdit] = React.useState('');
      
  const handleBankNameChange = (event) => {
    setBankNameEdit(event.target.value);
  };

  const [branchEdit, setBranchEdit] = React.useState('');
      
  const handleBranchChange = (event) => {
    setBranchEdit(event.target.value);
  };

  const [accountNumberEdit, setAccountNumberEdit] = React.useState('');
      
  const handleAccountNumberChange = (event) => {
    setAccountNumberEdit(event.target.value);
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
              Employee Bank Details
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl fullWidth >
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
            </Grid>
            </Grid>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          
            </Typography>
            <div>
            &nbsp;
            <Button variant="contained" color="primary" onClick={getEmployees}>
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
                        }}>Employee ID</TableCell>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Employee</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Position</TableCell>
                        <TableCell style={{
                            fontWeight: "bold",
                            color: "#3f51b5",
                          }}>Department</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Bank</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Branch</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Account Number</TableCell>
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
                          <TableCell>HH000{row.id}</TableCell>
                          <TableCell>{row.first_name} {row.last_name}</TableCell>
                          <TableCell>{row.position_name}</TableCell>
                          <TableCell>{row.department_name}</TableCell>
                          <TableCell>{row.bank_code} - {row.bank_name}</TableCell>
                          <TableCell>{row.branch}</TableCell>
                          <TableCell>{row.account_number}</TableCell>
                          <TableCell align="center">
                            <IconButton color="success" onClick={() => handleOpenEdit(row)}>
                              <EditIcon />
                            </IconButton>
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
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to reject this employee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>No</Button>
              <Button onClick={() => {editPosition(2)}} variant="contained" autoFocus >
                Yes
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
            <DialogTitle align="center" sx={{ fontSize: '18px'}}>Edit Employee Bank Details</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Employee"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={employeeEdit}
                onChange={handleEmployeeChange}
                disabled
              />
              <TextField
                fullWidth
                label="Bank Code"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={bankCodeEdit}
                onChange={handleBankCodeChange}
              />
              <TextField
                fullWidth
                label="Bank Name"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={bankNameEdit}
                onChange={handleBankNameChange}
              />
              <TextField
                fullWidth
                label="Branch"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={branchEdit}
                onChange={handleBranchChange}
              />
              <TextField
                fullWidth
                label="Account Number"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={accountNumberEdit}
                onChange={handleAccountNumberChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button  color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
