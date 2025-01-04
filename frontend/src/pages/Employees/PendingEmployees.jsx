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
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function PendingEmployees() {
  const [rows, setRows] = React.useState([]);
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');
  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    getPendingEmployees();
  },[]);

  const getPendingEmployees  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pending-employee/all', {
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
      const response = await axios.post('http://127.0.0.1:8000/api/pending-employee/status', {
        employee_id: positionId,
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
        getPendingEmployees();
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
              Pending Employees
            </Typography>
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
                        }}>Name</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Department</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Position</TableCell>
                        {/* <TableCell style={{
                            fontWeight: "bold",
                            color: "#3f51b5",
                          }}>Date of Birth</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Address</TableCell> */}
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Citizenship Country</TableCell>
                        {/* <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Phone</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Landline</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Maritial Status</TableCell> 
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Identity Number</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Passport Number</TableCell>*/}
                        {userRole < 3 ? 
                          <TableCell align="center" style={{
                            fontWeight: "bold",
                            color: "#3f51b5",
                          }}>Actions</TableCell>
                          : 
                          <></>
                        }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell>HH000{row.id}</TableCell>
                          <TableCell>{row.first_name} {row.last_name}</TableCell>
                          <TableCell>{row.department_name}</TableCell>
                          <TableCell>{row.position_name}</TableCell>
                          {/* <TableCell>{row.dob}</TableCell>
                          <TableCell>{row.address1} {row.address2} {row.suburb} {row.district} {row.province} {row.country}</TableCell> */}
                          <TableCell>{row.citizenship_country}</TableCell>
                          {/* <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.landline}</TableCell>
                          <TableCell>{row.maritial_status == 0 ? 'Single' : (row.maritial_status == 1 ? 'Married' : 'Divorced') }</TableCell> 
                          <TableCell>{row.identity_number}</TableCell>
                          <TableCell>{row.passport_number}</TableCell>*/}
                          {userRole < 3 ? 
                            <TableCell align="center">
                              <Button style={{
                                marginBottom: "5px"
                              }}  variant="contained" color="success" onClick={() => handleOpenEdit(row)}>
                                Approve
                              </Button><br />
                              <Button variant="contained" color="error" onClick={() => handleOpenDelete(row)}>
                                Reject
                              </Button>
                            </TableCell>
                            : 
                            <></>
                          }
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
            onClose={handleOpenEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to approve this employee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>No</Button>
              <Button onClick={() => {editPosition(1)}} variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}