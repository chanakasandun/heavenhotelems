import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import {
  Box,
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const employees = [
  { name: "Janica Manosan", position: "IT Executive", department: "IT Department", joinedDate: "01-01-2024" },
  { name: "Rolin Fadel", position: "HR Manager", department: "HR Department", joinedDate: "01-01-2024" },
  { name: "Lera Storman", position: "Finance Executive", department: "Finance Department", joinedDate: "01-01-2024" },
  { name: "Adan Schiller", position: "Receptionist", department: "Front Office", joinedDate: "01-01-2024" },
  { name: "John Alfield", position: "Chief", department: "Cooking Department", joinedDate: "01-01-2024" },
];

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} ${year}`;
};

export default function Home() {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const [date, setDate] = useState(new Date());

  const userName = localStorage.getItem('userName');
  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, paddingLeft: '50px', backgroundColor:'#f9f9fb'}}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            Welcome back, {userName}!
          </Typography>
          
          {/* Dashboard cards */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, border: "1px solid #d9d9d9", textAlign: "center", height: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#454e57", backgroundColor: "#f5f5f6", padding: "8px 0" }}>
                      Date
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 2 }}>{formattedDate}</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, border: "1px solid #d9d9d9", textAlign: "center", height: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#454e57", backgroundColor: "#f5f5f6", padding: "8px 0" }}>
                      Birthdays
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 2 }}>3</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, textAlign: "center", height: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#454e57", backgroundColor: "#f5f5f6", padding: "8px 0" }}>
                      Employees
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 2 }}>105</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, border: "1px solid #d9d9d9", textAlign: "center", height: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#454e57", backgroundColor: "#f5f5f6", padding: "8px 0" }}>
                      Departments
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 2 }}>6</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: 2, border: "1px solid #d9d9d9", textAlign: "center", height: '95%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    displayStaticWrapperAs="desktop"
                  />
                </LocalizationProvider>
              </Card>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Typography variant="h6">Newly Joined Employees</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#9ca4ca" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#9ca4ca" }}>Position</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#9ca4ca" }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#9ca4ca" }}>Joined Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.name}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.joinedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}
