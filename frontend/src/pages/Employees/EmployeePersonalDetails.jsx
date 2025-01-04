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

export default function EmployeePersonalDetails() {
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
    setFirstNameEdit(row.first_name);
    setLastNameEdit(row.last_name);
    setPositionEdit(row.position_id);
    setDobEdit(row.dob)
    setCitizenshipEdit(row.citizenship_country)
    setPhoneEdit(row.phone)
    setLandlineEdit(row.landline)
    setMaritialStatusEdit(row.maritial_status)
    setIdentityEdit(row.identity_number)
    setPassportEdit(row.passport_number)
    setAddress1Edit(row.address1)
    setAddress2Edit(row.address2)
    setSuburbEdit(row.suburb)
    setDistrictEdit(row.district)
    setProvinceEdit(row.province)
    setCountryEdit(row.country)
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
      if(error.status === 401){
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
      const response = await axios.post('http://127.0.0.1:8000/api/employee-personal-details/all', {
        department_id: department,
        status: 1
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
      if(error.status === 401){
        showSnackbar(error.message, 'error');
      }else{
        showSnackbar(error.message, 'error');
      }
    }
  };

  const [firstNameEdit, setFirstNameEdit] = React.useState('');
    
  const handleFirstNameChange = (event) => {
    setFirstNameEdit(event.target.value);
  };

  const [lastNameEdit, setLastNameEdit] = React.useState('');
    
  const handleLastNameChange = (event) => {
    setLastNameEdit(event.target.value);
  };

  const [positionEdit, setPositionEdit] = React.useState('');
    
  const handlePositionChange = (event) => {
    setPositionEdit(event.target.value);
  };

  const [dobEdit, setDobEdit] = React.useState('');
    
  const handleDobChange = (event) => {
    setDobEdit(event.target.value);
  };

  const [citizenshipEdit, setCitizenshipEdit] = React.useState(0);
    
  const handleCitizenshipChange = (event) => {
    setCitizenshipEdit(event.target.value);
  };

  const [phoneEdit, setPhoneEdit] = React.useState('');
    
  const handlePhoneChange = (event) => {
    setPhoneEdit(event.target.value);
  };

  const [landlineEdit, setLandlineEdit] = React.useState('');
    
  const handleLandlineChange = (event) => {
    setLandlineEdit(event.target.value);
  };

  const [maritialStatusEdit, setMaritialStatusEdit] = React.useState('');
    
  const handleMaritialStatusChange = (event) => {
    setMaritialStatusEdit(event.target.value);
  };

  const [identityEdit, setIdentityEdit] = React.useState('');
    
  const handleIdentityChange = (event) => {
    setIdentityEdit(event.target.value);
  };

  const [passportEdit, setPassportEdit] = React.useState('');
    
  const handlePassportChange = (event) => {
    setPassportEdit(event.target.value);
  };

  const [address1Edit, setAddress1Edit] = React.useState('');
    
  const handleAddress1Change = (event) => {
    setAddress1Edit(event.target.value);
  };

  const [address2Edit, setAddress2Edit] = React.useState('');
    
  const handleAddress2Change = (event) => {
    setAddress1Edit(event.target.value);
  };

  const [suburbEdit, setSuburbEdit] = React.useState('');
    
  const handleSuburbChange = (event) => {
    setSuburbEdit(event.target.value);
  };

  const [provinceEdit, setProvinceEdit] = React.useState('');
    
  const handleProvinceChange = (event) => {
    setProvinceEdit(event.target.value);
  };

  const [countryEdit, setCountryEdit] = React.useState(0);
    
  const handleCountryChange = (event) => {
    setCountryEdit(event.target.value);
  };

  const [districtEdit, setDistrictEdit] = React.useState('');
    
  const handleDistrictChange = (event) => {
    setDistrictEdit(event.target.value);
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
              Employee Details
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
            &nbsp;
            <Button variant="contained" color="primary" onClick={getEmployees}>
              Export
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
                        }}>Passport Number</TableCell> */}
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
                          <TableCell>{row.department_name}</TableCell>
                          <TableCell>{row.position_name}</TableCell>
                          {/* <TableCell>{row.dob}</TableCell>
                          <TableCell>{row.address1} {row.address2} {row.suburb} {row.district} {row.province} {row.country}</TableCell> */}
                          <TableCell>{row.citizenship_country}</TableCell>
                          {/* <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.landline}</TableCell>
                          <TableCell>{row.maritial_status == 0 ? 'Single' : (row.maritial_status == 1 ? 'Married' : 'Divorced') }</TableCell>
                          <TableCell>{row.identity_number}</TableCell>
                          <TableCell>{row.passport_number}</TableCell> */}
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
          {/* Popup for create Department */}
          <Dialog
            open={openEdit}
            onClose={handleOpenEdit}
            maxWidth="sm" 
            fullWidth 
            sx={{ "& .MuiDialog-paper": { width: "450px", maxWidth: "450px", padding: "15px" } }} 
          >
            <DialogTitle align="center" sx={{ fontSize: '18px'}}>Edit Employee Personal Details</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="First Name"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={firstNameEdit}
                onChange={handleFirstNameChange}
              />
               <TextField
                fullWidth
                label="Last Name"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={lastNameEdit}
                onChange={handleLastNameChange}
              />
              <TextField
                fullWidth
                select
                label="Position"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={positionEdit}
                onChange={handlePositionChange}
              >
                <MenuItem 
                    key={1} 
                    value={1}>
                      Manager - IT
                    </MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Date Of Birth"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                type="date"
                value={dobEdit}
                onChange={handleDobChange}
              />
              <TextField
                fullWidth
                label="Citizenship Country"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                select
                value={citizenshipEdit}
                onChange={handleCitizenshipChange}
              >
                <MenuItem value="Sri Lanka">SriLanka</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="England">England</MenuItem>
              </TextField>
               <TextField
                fullWidth
                label="Phone"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={phoneEdit}
                onChange={handlePhoneChange}
              />
               <TextField
                fullWidth
                label="Landline"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={landlineEdit}
                onChange={handleLandlineChange}
              />
               <TextField
                fullWidth
                label="Maritial Status"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={maritialStatusEdit}
                onChange={handleMaritialStatusChange}
                select
              >
                <MenuItem value="0">Single</MenuItem>
                <MenuItem value="1">Married</MenuItem>=
                <MenuItem value="2">Divorced</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Identity Number"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={identityEdit}
                onChange={handleIdentityChange}
              />
              <TextField
                fullWidth
                label="Passport Number"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={passportEdit}
                onChange={handlePassportChange}
              />
              <TextField
                fullWidth
                label="Address: Street 1"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={address1Edit}
                onChange={handleAddress1Change}
              />
              <TextField
                fullWidth
                label="Address: Street 2"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={address2Edit}
                onChange={handleAddress2Change}
              />
              <TextField
                fullWidth
                label="Address: Suburb"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={suburbEdit}
                onChange={handleSuburbChange}
              />
              <TextField
                fullWidth
                label="Address: District"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={districtEdit}
                onChange={handleDistrictChange}
              />
              <TextField
                fullWidth
                label="Address: Province"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={provinceEdit}
                onChange={handleProvinceChange}
              />
              <TextField
                fullWidth
                label="Address: Country"
                margin="dense"
                variant="outlined"
                sx={{marginBottom: "15px",}}
                value={countryEdit}
                onChange={handleCountryChange}
                select
              >
              
              <MenuItem value="Sri Lanka">SriLanka</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="England">England</MenuItem>
              </TextField>
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
