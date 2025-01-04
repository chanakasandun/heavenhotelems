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
import DialogContentText from '@mui/material/DialogContentText';

const columns = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 200, align: "left" },
  { id: "status", label: "Status", minWidth: 150, align: "center" },
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];

export default function LeaveTypes() {
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [leaveTypeName, setLeaveTypeName] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [leaveTypeStatus, setLeaveTypeStatus] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);

  const handleOpen = () => {
    setLeaveTypeName('');
    setOpen(true);
  };

  const handleOpenEdit = (row) => {
    setLeaveTypeId(row.id)
    setLeaveTypeName(row.name);
    setLeaveTypeStatus(row.status);
    setOpenEdit(true);
  };

  const handleOpenDelete = (row) => {
    setLeaveTypeId(row.id)
    setLeaveTypeName(row.name);
    setLeaveTypeStatus(2);
    setOpenDelete(true);
  };

  const handleClose = () => setOpen(false);

  const handleCloseEdit = () => setOpenEdit(false);

  const handleCloseDelete = () => setOpenDelete(false);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleLeaveTypeName = (event) => setLeaveTypeName(event.target.value);

  const handleLeaveTypeStatus = (event) => setLeaveTypeStatus(event.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createLeaveType = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/leave-type/create', {
        name: leaveTypeName
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        getLeaveTypes();
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

  const editLeaveType = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/leave-type/edit', {
        id: leaveTypeId,
        name: leaveTypeName,
        status: leaveTypeStatus
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        getLeaveTypes();
        handleCloseEdit();
        handleCloseDelete();
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

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => { 
    getLeaveTypes()
  },[]);

  const getLeaveTypes  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/leave-type/all', {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        handleCloseEdit();
        setRows(response.data.data.leave_types);
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Leave Types
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Create Leave Type
            </Button>
          </Box>
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

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="leave types table">
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">{row.status == 1 ? 'Active' : 'Inactive'}</TableCell>
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

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>Create Leave Type</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Name"
                margin="dense"
                variant="outlined"
                value={leaveTypeName}
                onChange={handleLeaveTypeName}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={createLeaveType} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>Edit Leave Type</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Name"
                margin="dense"
                variant="outlined"
                value={leaveTypeName}
                onChange={handleLeaveTypeName}
                sx={{paddingBottom: '15px'}}
              />
              <FormControl fullWidth>
              <InputLabel id="department-label">Status</InputLabel>
                <Select
                  labelId="department-label"
                  id="status"
                  value={leaveTypeStatus}
                  label="Status"
                  onChange={handleLeaveTypeStatus}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button onClick={editLeaveType} color="primary" variant="contained">
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
              <Button onClick={editLeaveType} variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
