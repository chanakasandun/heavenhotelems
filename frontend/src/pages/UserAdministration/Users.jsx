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

export default function Users() {
  const [rows, setRows] = React.useState([]);
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = (row) => {
    setDepartmentEdit(0);
    setUserName('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleOpenEdit = (row) => {
    setUserId(row.id)
    setRoleEdit(row.role_id)
    setDepartmentEdit(row.department_id);
    setUserName(row.name);
    setUserEmail(row.email);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenEditPassword = (row) => {
    setUserEmail(row.email);
    setOpenEditPassword(true);
  };

  const handleCloseEditPassword = () => {
    setOpenEditPassword(false);
  };

  const handleOpenDelete = (row) => {
    setUserId(row.id)
    setRoleEdit(row.role_id)
    setDepartmentEdit(row.department_id);
    setUserName(row.name);
    setUserEmail(row.email);
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

  const [role, setRole] = React.useState(0);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const [departmentEdit, setDepartmentEdit] = React.useState(0);

  const handleDepartmentEditChange = (event) => {
    setDepartmentEdit(event.target.value);
  };

  const [roleEdit, setRoleEdit] = React.useState(1);

  const handleRoleEditChange = (event) => {
    setRoleEdit(event.target.value);
  };

  const [userId, setUserId] = React.useState('');

  const [userName, setUserName] = React.useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const [userEmail, setUserEmail] = React.useState('');

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const [userPassword, setUserPassword] = React.useState('');

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  useEffect(() => { 
    getDepartments();
    getRoles();
    getUsers();
  },[]);

  const [departments, setDepartments] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

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

  const getRoles  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user-roles/all', {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setRoles(response.data.data.user_roles);
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

  const getUsers  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/all', {
        department_id: department,
        role_id: role,
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setRows(response.data.data.users);
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

  const createUser = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/create', {
        department_id: departmentEdit,
        user_role: roleEdit,
        name: userName,
        email: userEmail,
        password: userPassword
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        getUsers();
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

  const editUser = async (userStatus) =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/edit', {
        id: userId,
        name: userName,
        email: userEmail,
        user_role: roleEdit,
        department_id: departmentEdit,
        status: userStatus
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        getUsers();
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
              Users
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
              Create User
            </Button>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="department-label">Role</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                value={role}
                label="Department"
                onChange={handleRoleChange}
              >
                <MenuItem value={0}>All</MenuItem>
                {roles.map((rl) => (
                  <MenuItem 
                  key={rl.id} 
                  value={rl.id}>
                    {rl.name}
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
                        }}>Name</TableCell>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Email</TableCell>
                         <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Role Name</TableCell>
                         <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Department Name</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Status</TableCell>
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
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.role_name}</TableCell>
                          <TableCell>{row.department_name}</TableCell>
                          <TableCell>{row.status == 1 ? 'Active' : 'In-Active'}</TableCell>
                          <TableCell align="center">
                            {/* <IconButton color="success" onClick={() => handleOpenEdit(row)}> */}
                            <Button variant="contained" color="secondary"  onClick={() => handleOpenEdit(row)}>
                              Edit
                              </Button>&nbsp;
                              <Button variant="contained" color="success" onClick={() => handleOpenEditPassword(row)}>
                              Reset Password
                              </Button>
                            {/* </IconButton> */}
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
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>Create User</DialogTitle>
            <DialogContent>
              <br />
              <FormControl fullWidth sx={{paddingBottom: '15px'}}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={roleEdit}
                  label="Role"
                  onChange={handleRoleEditChange}
                >
                  {roles.map((rl) => (
                    <MenuItem 
                    key={rl.id} 
                    value={rl.id}>
                      {rl.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{paddingBottom: '5px'}}>
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
                label="Name"
                margin="dense"
                variant="outlined"
                value={userName}
                onChange={handleUserNameChange}
                sx={{paddingBottom: '5px'}}
              />
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                variant="outlined"
                value={userEmail}
                onChange={handleUserEmailChange}
                sx={{paddingBottom: '5px'}}
              />
              <TextField
                fullWidth
                label="Password"
                margin="dense"
                variant="outlined"
                value={userPassword}
                onChange={handleUserPasswordChange}
                sx={{paddingBottom: '5px'}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={createUser} color="primary" variant="contained">
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
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>Edit User</DialogTitle>
            <DialogContent>
              <br />
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                variant="outlined"
                value={userEmail}
                onChange={handleUserEmailChange}
                sx={{paddingBottom: '15px'}}
                disabled
              />
              <FormControl fullWidth sx={{paddingBottom: '15px'}}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={roleEdit}
                  label="Role"
                  onChange={handleRoleEditChange}
                >
                  {roles.map((rl) => (
                    <MenuItem 
                    key={rl.id} 
                    value={rl.id}>
                      {rl.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                label="Name"
                margin="dense"
                variant="outlined"
                value={userName}
                onChange={handleUserNameChange}
                sx={{paddingBottom: '5px'}}
              />
              <FormControl fullWidth sx={{paddingBottom: '15px'}}>
                <InputLabel id="department-label">Status</InputLabel>
                <Select
                  labelId="department-label"
                  id="status"
                  label="Status"
                >
                  <MenuItem value={1} selected>Active</MenuItem>
                  <MenuItem value={0}>In-Active</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button onClick={() => {editUser(1)}} color="primary" variant="contained">
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
              <Button onClick={() => {editUser(0)}} variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openEditPassword}
            onClose={handleCloseEditPassword}
            maxWidth="sm"
            fullWidth
            sx={{ "& .MuiDialog-paper": { width: "450px", maxWidth: "450px", padding: "15px" } }}
          >
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>Reset Passord</DialogTitle>
            <DialogContent>
              <br />
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                variant="outlined"
                value={userEmail}
                onChange={handleUserEmailChange}
                sx={{paddingBottom: '15px'}}
                disabled
              />
              <TextField
                fullWidth
                label="New Password"
                margin="dense"
                variant="outlined"
               
                sx={{paddingBottom: '5px'}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditPassword} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseEditPassword} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
