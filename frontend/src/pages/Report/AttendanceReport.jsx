import React, { useState } from "react";
import Sidenav from "../../components/Sidenav";
import {
  Box,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel
} from "@mui/material";

const rows = [
  {
    id: 1,
    employee: "Enyro Fernando",
    position: "Manager",
    attendance: "85%",
    working_days: "21",
    department: "IT"
  },
  {
    id: 2,
    employee: "Pasindu Madushka",
    attendance: "95%",
    position: "Executive",
    working_days: "21",
    department: "Finance"
  },
  {
    id: 3,
    employee: "Isuru Ranatunga",
    attendance: "90.5%",
    position: "Asst. Manager",
    working_days: "21",
    department: "HR"
  },
  // Add more rows as needed
];

const AttendaceReport = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDownloadReport = () => {
    // Implement download functionality here
    console.log("Download report clicked");
  };

  return (
    <>
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Container>
          <Box mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Monthly Department Wise Attendance
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Month</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department"
                    label="Department"
                  >
                    <MenuItem value={0}>October 2024</MenuItem>
                    <MenuItem value={1}>November 2024</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      label="Department"
                    >
                      <MenuItem value={0}>All</MenuItem>
                      <MenuItem value={1}>IT</MenuItem>
                      <MenuItem value={2}>Finance</MenuItem>
                      <MenuItem value={3}>HR</MenuItem>
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
              &nbsp;
              <Button variant="contained" color="primary" >
                Export CSV
              </Button>
              </div>
            </Box>

          {/* Table Section */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>No Of Working Days</TableCell>
                  <TableCell>Attendance (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>HH000{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{row.employee}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.working_days}</TableCell>
                      <TableCell>{row.attendance}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>
    </>
  );
};

export default AttendaceReport;
