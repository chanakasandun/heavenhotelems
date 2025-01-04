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

export default function ApplyLeave() {
  return (
    <>
      <Box height={100} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Container>
          {/* Header Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Apply Leave
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Leave Type"
                  variant="outlined"
                  required
                  select
                >
                  <MenuItem value={0}>Annual</MenuItem>
                  <MenuItem value={1}>Casual</MenuItem>
                  <MenuItem value={2}>No Pay</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Reason"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
