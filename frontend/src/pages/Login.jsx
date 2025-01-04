import React from 'react';
import { Container, Grid, Box, Typography, TextField, Checkbox, FormControlLabel, Button, Link } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from './../components/SnackbarContext';
import registe from "../assets/register.PNG"; // Replace this with your actual image path
import logo from "../assets/logo.PNG"; // Replace this with your logo path

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingBottom: "20px",
};

const center = {
  textAlign: "center",
};

export default function Login() {
  const { showSnackbar } = useSnackbar();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission
    const data = new FormData(event.currentTarget); // Gets form data
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login', {
        email,
        password,
      });

      if (response.data.code === 1) {
        const token = response.data.token;

        // Store token and role in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('roleName', response.data.role_name);
        localStorage.setItem('department', response.data.department);
        localStorage.setItem('departmentName', response.data.department_name);
        localStorage.setItem('userName', response.data.user_name);

        navigate('/'); // Navigate to the homepage
      } else {
        showSnackbar(response.data.message, 'error')
      }
    } catch (error) {
      showSnackbar(error, 'error') 
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Box sx={boxstyle}>
        <Grid container>
          {!isMobile && (
            <Grid item xs={12} sm={12} lg={6}>
              <Typography variant="h4" sx={{ textAlign: "left", fontWeight: "bold", color: "#333", marginLeft: "40px"}}>
                <br />
                  Heaven Hotel EMS
                </Typography>
              <Box
                style={{
                  backgroundImage: `url(${registe})`,
                  backgroundSize: "cover",
                  marginTop: "10px",
                  marginLeft: "40px",
                  marginRight: "10px",
                  height: "50vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
          )}
          <Grid item xs={12} sm={12} lg={isMobile ? 12 : 6}>
            <Box
              style={{
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "20px",
                backgroundColor: "#ffffff",
                height: isMobile ? "100vh" : "70vh",
              }}
            >
              <Container maxWidth="xs">
                <Box sx={center} mb={2}>
                  <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
                </Box>
                <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
                  Sign into your account
                </Typography>
                <Box mt={3} />

                {/* Form Element */}
                <form onSubmit={handleSubmit}>
                  <Typography variant="body1" sx={{ fontWeight: "bold", color: "#454e57", mb: 1 }}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                  />

                  <Box mt={2} />

                  <Typography variant="body1" sx={{ fontWeight: "bold", color: "#454e57", mb: 1 }}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    size="small"
                    placeholder="Enter your password"
                    name="password"
                    id="password"
                  />

                  <Box mt={2} />

                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember the password"
                    sx={{ color: "#333" }}
                  />

                  <Box mt={2} />

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                     
                    <p>&nbsp;</p>
                    <Button
                      type="submit" // Ensure this is a submit button
                      variant="contained"
                      color="primary"
                      sx={{
                        padding: "5px 20px",
                        backgroundColor: "#454e57",
                        '&:hover': {
                          backgroundColor: "#0c0077",
                        }
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </form>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
