import React, { useState } from "react";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  DialogContentText
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { id: "position", label: "Position", minWidth: 200, align: "left" },
  { id: "department", label: "Department", minWidth: 200, align: "left" },
  { id: "leave", label: "Leave", minWidth: 200, align: "left" },
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];

const initialRows = [
  { id: 1, department: "IT", position: "Manager", leave: "Annual" },
  { id: 2, department: "IT",position: "Executive", leave: "Casual" },
  { id: 3, department: "IT",position: "Asst. Manager", leave: "Test Type" },
];

export default function LeaveForPosition() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editData, setEditData] = useState({ position: "", leave: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditOpen = (row) => {
    setEditData({ position: row.position, leave: row.leave });
    setSelectedRow(row);
    setOpen(true);
  };

  const handleSave = () => {
    if (selectedRow) {
      setRows(rows.map(row => (row.id === selectedRow.id ? { ...selectedRow, ...editData } : row)));
    } else {
      setRows([...rows, { id: rows.length + 1, ...editData }]);
    }
    setOpen(false);
    setSelectedRow(null);
    setEditData({ position: "", leave: "" });
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

   const [openDelete, setOpenDelete] = useState(false);

   const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <>
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Leave Type For Position
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
              Add Leave Type For Position
            </Button>
          </Box>
          <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="department-label">Position</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                label="Department"
              >
                <MenuItem value={1}>All</MenuItem>
                <MenuItem value={2}>Executive - IT</MenuItem>
                <MenuItem value={3}>Manager - IT</MenuItem>
                <MenuItem value={4}>Manager - HR</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          
            </Typography>
            <div>
            &nbsp;
            <Button variant="contained" color="primary" >
              Search
            </Button>
            </div>
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.leave}</TableCell>
                        <TableCell align="center">
                          <IconButton color="error" onClick={() => handleOpenDelete(row)}>
                              <DeleteIcon />
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>
              Add Leave Type For Position
            </DialogTitle>
            <DialogContent>
              <br />
              <FormControl fullWidth sx={{paddingBottom: '15px'}}>
                <InputLabel id="department-label">Position</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  label="Department"
                >
                  <MenuItem value={2}>Executive - IT</MenuItem>
                  <MenuItem value={3}>Manager - IT</MenuItem>
                  <MenuItem value={4}>Manager - HR</MenuItem>
                </Select>
              </FormControl>
              <br />
              <FormControl fullWidth sx={{paddingBottom: '15px'}}>
                <InputLabel id="department-label">Leave Type</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  label="Department"
                >
                  <MenuItem value={2}>Annual</MenuItem>
                  <MenuItem value={3}>Casual</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary" variant="contained">
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
              <Button variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
