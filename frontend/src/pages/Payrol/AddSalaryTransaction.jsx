import React from 'react';
import Sidenav from "../../components/Sidenav";
import Box from '@mui/material/Box';
import {
  Typography,
  Container,
  TextField,
  MenuItem,
  Grid,
  Button,
  Divider
} from "@mui/material";

export default function AddSalaryTransaction() {
  return (
    <>
      <Box height={100} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Container>
          {/* Header Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Add Salary Transaction
            </Typography>
          </Box>

          {/* Form Section */}
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              {/* First Name and Last Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employee"
                  variant="outlined"
                  required
                  select
                >
                  <MenuItem value={0}>HH0001 - Enyro Fernando</MenuItem>
                  <MenuItem value={1}>HH0002 - Pasindu Madushka</MenuItem>
                  </TextField>
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Basic Salary"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Allowance"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Overtime Total"
                  variant="outlined"
                  required
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Total Salary"
                  variant="outlined"
                  required
                />
              </Grid>


              {/* Save Button */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button variant="contained" 
                  sx={{
                    backgroundColor: "#61758b",
                    width:'240px',
                    "&:hover": { backgroundColor: "#218838" },
                  }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
