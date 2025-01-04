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
  Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { id: "date", label: "Date", minWidth: 150, align: "center" },
  { id: "reason", label: "Holiday Name", minWidth: 300, align: "left" },
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];

const rows = [
  { id: 1, date: "2024-12-25", reason: "Christmas Holiday" },
  { id: 2, date: "2024-01-01", reason: "New Year's Day" },
  { id: 3, date: "2024-11-01", reason: "Diwali Festival" },
];

export default function HolidayList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = (row) => {
    setSelectedRow(row); // Set selected row data
    setOpen(true);
  };

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = (row) => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setSelectedRow(null); // Reset selected row
    setOpen(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.date.includes(searchTerm) ||
      row.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Holiday List
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenCreate(null)}>
              Create Holiday
            </Button>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="year-label">Year</InputLabel>
                  <Select
                    labelId="department-label"
                    id="year"
                    label="Year"
                  >
                    <MenuItem value={1}>2020</MenuItem>
                    <MenuItem value={2}>2021</MenuItem>
                    <MenuItem value={3}>2022</MenuItem>
                    <MenuItem value={4}>2023</MenuItem>
                    <MenuItem value={5}>2024</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Month</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department"
                    label="Department"
                  >
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>February</MenuItem>
                    <MenuItem value={3}>March</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>July</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>
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
            <Button variant="contained" color="primary" >
              Search
            </Button>
            </div>
          </Box>

          {/* Search Box below Header */}
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
              <Table stickyHeader aria-label="holiday table">
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
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell>{row.reason}</TableCell>
                        <TableCell align="center">
                          <IconButton color="success" onClick={() => handleOpen(row)}>
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

          {/* Popup for Editing Holiday */}
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            sx={{
              "& .MuiDialog-paper": {
                width: "450px",
                maxWidth: "450px",
                padding: "15px",
              },
            }}
          >
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>
              Edit Holiday
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Date"
                margin="dense"
                variant="outlined"
                value={selectedRow ? selectedRow.date : ""}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, date: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Reason"
                margin="dense"
                variant="outlined"
                value={selectedRow ? selectedRow.reason : ""}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, reason: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openCreate}
            onClose={handleCloseCreate}
            maxWidth="sm"
            fullWidth
            sx={{
              "& .MuiDialog-paper": {
                width: "450px",
                maxWidth: "450px",
                padding: "15px",
              },
            }}
          >
            <DialogTitle align="center" sx={{ fontSize: "18px" }}>
              Create Holiday
            </DialogTitle>
            <DialogContent>
            <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                type="date"
                label="Date"
                InputLabelProps={{
                shrink: true, // Ensures the label stays above the input area
                }}
              />
              <TextField
                fullWidth
                label="Holiday Name"
                margin="dense"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCreate} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseCreate} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
