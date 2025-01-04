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
  InputLabel,
  FormControl
} from "@mui/material";

const rows = [
  {
    id: 1,
    position: "Manager",
    department: "IT",
    count: 1,
    budget: "300,000.00",
    avg_salary: "280,000.00",
    gain_loss: "20,000.00"
  },
  {
    id: 2,
    position: "Executive",
    department: "IT",
    count: 6,
    budget: "150,000.00",
    avg_salary: "151,500.00",
    gain_loss: "-9,000.00"
  }
  // Add more rows as needed
];

const GeneralReport = () => {
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
            Monthly Manning Budget Vs Employee Salary
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Month</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department"
                    label="Department"
                  >
                    <MenuItem value={0}>2024 - October</MenuItem>
                    <MenuItem value={1}>2024 - November</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
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
                    <MenuItem value={4}>Cooking</MenuItem>
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
                  <TableCell>Department</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>No Of Employees</TableCell>
                  <TableCell>Manning Budget (Rs.)</TableCell>
                  <TableCell>Avg Salary Paid (Rs.)</TableCell>
                  <TableCell>Gain/Loss (Rs.)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell>{row.budget}</TableCell>
                      <TableCell>{row.avg_salary}</TableCell>
                      <TableCell>{row.gain_loss}</TableCell>
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

export default GeneralReport;
