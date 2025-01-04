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
    employeeName: "John Doe",
    department: "Engineering",
    date: "2024-01-01",
    overtimeHours: 5,
    remarks: "Completed additional tasks",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    department: "HR",
    date: "2024-01-02",
    overtimeHours: 3,
    remarks: "Assisted in recruitment",
  },
  // Add more rows as needed
];

const PenddngSalary = () => {
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

  return (
    <>
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Container>
          <Box mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Pending Salary
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
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
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          
            </Typography>
            <div>
            &nbsp;
            <Button variant="contained" color="primary">
              Search
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
                  <TableCell>Month</TableCell>
                  <TableCell>No of Working Days in Month</TableCell>
                  <TableCell>No of Days Worked</TableCell>
                  <TableCell>Basic Salary (Rs.)</TableCell>
                  <TableCell>Allowance (Rs.)</TableCell>
                  <TableCell>No of NoPay Leaves</TableCell>
                  <TableCell>NoPay Deduction Total</TableCell>
                  <TableCell>Basic Salary After Deduction (Rs.)</TableCell>
                  <TableCell>Allowance After Deduction (Rs.)</TableCell>
                  <TableCell>Total Overtime (hrs)</TableCell>
                  <TableCell>Overtime Hourly Charge</TableCell>
                  <TableCell>Total Overtime Charge</TableCell>
                  <TableCell>Total Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow key={1}>
                    <TableCell>HH0001</TableCell>
                    <TableCell>Enyro Fernando</TableCell>
                    <TableCell>IT</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>November 2024</TableCell>
                    <TableCell>21</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>200,000.00</TableCell>
                    <TableCell>80,000.00</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0.00</TableCell>
                    <TableCell>200,000.00</TableCell>
                    <TableCell>80,000.00</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>1,000.00</TableCell>
                    <TableCell>7,000.00</TableCell>
                    <TableCell>287,000.00</TableCell>
                  </TableRow>
                  <TableRow key={2}>
                    <TableCell>HH0002</TableCell>
                    <TableCell>Pasindu Madhuska</TableCell>
                    <TableCell>IT</TableCell>
                    <TableCell>Executive</TableCell>
                    <TableCell>November 2024</TableCell>
                    <TableCell>21</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>120,000.00</TableCell>
                    <TableCell>48,000.00</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>8,000.00</TableCell>
                    <TableCell>114,286.00</TableCell>
                    <TableCell>45,714.00</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>1,000.00</TableCell>
                    <TableCell>0.00</TableCell>
                    <TableCell>160,000.00</TableCell>
                  </TableRow>
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

export default PenddngSalary;
