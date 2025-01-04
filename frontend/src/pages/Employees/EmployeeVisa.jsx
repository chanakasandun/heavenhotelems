import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TablePagination,
  TableRow,
  Button,
  IconButton,
  Box,
  Grid,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useSnackbar } from './../../components/SnackbarContext';
import DialogContentText from '@mui/material/DialogContentText';

const rows = [
  {
    visa_id: 1,
    id: "1",
    first_name: "Pasindu",
    last_name: "Madhushka",
    position_name: "Executive",
    department_name: "IT",
    visa_type:"Work Visa Cat 5",
    country: "India",
    expiry_date: "2025-06-05",
    notes: ""
  },
  {
    visa_id: 2,
    id: "2",
    first_name: "Enyro",
    last_name: "Fernando",
    position_name: "Manager",
    department_name: "IT",
    visa_type:"Work Visa Cat 3",
    country: "England",
    expiry_date: "2025-12-15",
    notes: ""
  }
];

export default function EmployeeVisa() {
  // const [rows, setRows] = React.useState([]);
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = (row) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (row) => {
    setEmployeeEdit(row.id + ' - ' + row.first_name + ' ' + row.last_name);
    setVisaTypeEdit(row.visa_type);
    setCountryEdit(row.country);
    setExpiryDateEdit(row.expiry_date);
    setNotesEdit(row.notes);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = (row) => {
    setPositionId(row.id)
    setDepartmentEdit(row.department_id);
    setPositionName(row.name);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredRows = rows.filter((row) =>
    row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || row.department_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [departmentEdit, setDepartmentEdit] = React.useState(0);

  const handleDepartmentEditChange = (event) => {
    setDepartmentEdit(event.target.value);
  };

  const [positionId, setPositionId] = React.useState('');

  const [positionName, setPositionName] = React.useState('');

  const handlePositionNameChange = (event) => {
    setPositionName(event.target.value);
  };

  useEffect(() => { 
    getDepartments();
    // getEmployees();
  },[]);


  const [departments, setDepartments] = React.useState([]);

  const getDepartments  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/department/all', {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setDepartments(response.data.data.departments);
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

  const [department, setDepartment] = React.useState(0);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  // const getEmployees  = async () =>{
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/employee-bank-details/all', {
  //       department_id: department
  //     },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     if (response.data.code === 1) {
  //       setRows(response.data.data.employees);
  //     } else {
  //       showSnackbar(response.data.message, 'error')
  //     }
  //   } catch (error) {
  //     if(error.status == 401){
  //       showSnackbar(error.message, 'error');
  //     }else{
  //       showSnackbar(error.message, 'error');
  //     }
  //   }
  // };


  const editPosition = async (positionStatus) =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/position/edit', {
        id: positionId,
        name: positionName,
        status: positionStatus
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        showSnackbar(response.data.message, 'success')
        // getEmployees();
        handleCloseDelete();
        handleCloseEdit();
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

  const [employeeEdit, setEmployeeEdit] = React.useState('');
        
  const handleEmployeeChange = (event) => {
      setEmployeeEdit(event.target.value);
  };

  const [visaTypeEdit, setVisaTypeEdit] = React.useState('');
        
  const handleVisaTypeChange = (event) => {
    setVisaTypeEdit(event.target.value);
  };

  const [countryEdit, setCountryEdit] = React.useState('');
        
  const handleCountryChange = (event) => {
    setCountryEdit(event.target.value);
  };

  const [expiryDateEdit, setExpiryDateEdit] = React.useState('');
        
  const handleExpiryDateChange = (event) => {
    setExpiryDateEdit(event.target.value);
  };

  const [notesEdit, setNotesEdit] = React.useState('');
        
  const handleNotesChange = (event) => {
    setNotesEdit(event.target.value);
  };

  return (
    <>
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Container>
          {/* Header Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Employee Visa Details
            </Typography>
             <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
                Add Visa Details
              </Button>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl fullWidth >
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                value={department}
                label="Department"
                onChange={handleDepartmentChange}
              >
                <MenuItem value={0}>All</MenuItem>
                {departments.map((dep) => (
                  <MenuItem 
                  key={dep.id} 
                  value={dep.id}>
                    {dep.name}
                  </MenuItem>
                ))}
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
          {/* Search Box */}
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

          {/* Table Content */}
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table stickyHeader
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Employee ID</TableCell>
                      <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Employee</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Position</TableCell>
                        <TableCell style={{
                            fontWeight: "bold",
                            color: "#3f51b5",
                          }}>Department</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Visa Type</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Country</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Expiry Date</TableCell>
                        <TableCell style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Notes</TableCell>
                        <TableCell align="center" style={{
                          fontWeight: "bold",
                          color: "#3f51b5",
                        }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell>HH000{row.id}</TableCell>
                          <TableCell>{row.first_name} {row.last_name}</TableCell>
                          <TableCell>{row.position_name}</TableCell>
                          <TableCell>{row.department_name}</TableCell>
                          <TableCell>{row.visa_type}</TableCell>
                          <TableCell>{row.country}</TableCell>
                          <TableCell>{row.expiry_date}</TableCell>
                          <TableCell>{row.notes}</TableCell>
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
          </Box>
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
                Are you sure you want to delete this visa details?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>No</Button>
              <Button onClick={() => {editPosition(2)}} variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
              open={openEdit}
              onClose={handleCloseEdit}
              maxWidth="sm" 
              fullWidth 
              sx={{ "& .MuiDialog-paper": { width: "450px", maxWidth: "450px", padding: "15px" } }} 
            >
              <DialogTitle align="center" sx={{ fontSize: '18px'}}>Edit Employee Visa Details</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Employee"
                  margin="dense"
                  variant="outlined"
                  sx={{marginBottom: "15px",}}
                  value={employeeEdit}
                  onChange={handleEmployeeChange}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Visa Type"
                  margin="dense"
                  variant="outlined"
                  sx={{marginBottom: "15px",}}
                  value={visaTypeEdit}
                  onChange={handleVisaTypeChange}
                />
                <TextField
                  fullWidth
                  label="Country"
                  margin="dense"
                  variant="outlined"
                  sx={{marginBottom: "15px",}}
                  value={countryEdit}
                  onChange={handleCountryChange}
                />
                <TextField
                  fullWidth
                  label="Expiry Date"
                  margin="dense"
                  variant="outlined"
                  sx={{marginBottom: "15px",}}
                  value={expiryDateEdit}
                  onChange={handleExpiryDateChange}
                />
                <TextField
                  fullWidth
                  label="Notes"
                  margin="dense"
                  variant="outlined"
                  sx={{marginBottom: "15px",}}
                  value={notesEdit}
                  onChange={handleNotesChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  Cancel
                </Button>
                <Button  color="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
        </Container>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{ "& .MuiDialog-paper": { width: "450px", maxWidth: "450px", padding: "15px" } }}
      >
        <DialogTitle align="center" sx={{ fontSize: "18px" }}>Add Visa Details</DialogTitle>
        <DialogContent>
          <br />
          <FormControl fullWidth sx={{paddingBottom: '15px'}}>
            <InputLabel id="department-label">Employee</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              label="Department"
            >
              <MenuItem value={0}>1 - Enyro Fernando</MenuItem>
              <MenuItem value={1}>1 - Pasindu Madushka</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Visa Type"
            margin="dense"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Country"
            margin="dense"
            variant="outlined"
            select
            >
            <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                  <MenuItem value="Albania">Albania</MenuItem>
                  <MenuItem value="Algeria">Algeria</MenuItem>
                  <MenuItem value="Andorra">Andorra</MenuItem>
                  <MenuItem value="Angola">Angola</MenuItem>
                  <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem>
                  <MenuItem value="Argentina">Argentina</MenuItem>
                  <MenuItem value="Armenia">Armenia</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="Austria">Austria</MenuItem>
                  <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                  <MenuItem value="Bahamas">Bahamas</MenuItem>
                  <MenuItem value="Bahrain">Bahrain</MenuItem>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                  <MenuItem value="Barbados">Barbados</MenuItem>
                  <MenuItem value="Belarus">Belarus</MenuItem>
                  <MenuItem value="Belgium">Belgium</MenuItem>
                  <MenuItem value="Belize">Belize</MenuItem>
                  <MenuItem value="Benin">Benin</MenuItem>
                  <MenuItem value="Bhutan">Bhutan</MenuItem>
                  <MenuItem value="Bolivia">Bolivia</MenuItem>
                  <MenuItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</MenuItem>
                  <MenuItem value="Botswana">Botswana</MenuItem>
                  <MenuItem value="Brazil">Brazil</MenuItem>
                  <MenuItem value="Brunei">Brunei</MenuItem>
                  <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                  <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                  <MenuItem value="Burundi">Burundi</MenuItem>
                  <MenuItem value="Cabo Verde">Cabo Verde</MenuItem>
                  <MenuItem value="Cambodia">Cambodia</MenuItem>
                  <MenuItem value="Cameroon">Cameroon</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Central African Republic">Central African Republic</MenuItem>
                  <MenuItem value="Chad">Chad</MenuItem>
                  <MenuItem value="Chile">Chile</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                  <MenuItem value="Colombia">Colombia</MenuItem>
                  <MenuItem value="Comoros">Comoros</MenuItem>
                  <MenuItem value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</MenuItem>
                  <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                  <MenuItem value="Croatia">Croatia</MenuItem>
                  <MenuItem value="Cuba">Cuba</MenuItem>
                  <MenuItem value="Cyprus">Cyprus</MenuItem>
                  <MenuItem value="Czechia (Czech Republic)">Czechia (Czech Republic)</MenuItem>
                  <MenuItem value="Denmark">Denmark</MenuItem>
                  <MenuItem value="Djibouti">Djibouti</MenuItem>
                  <MenuItem value="Dominica">Dominica</MenuItem>
                  <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                  <MenuItem value="Ecuador">Ecuador</MenuItem>
                  <MenuItem value="Egypt">Egypt</MenuItem>
                  <MenuItem value="El Salvador">El Salvador</MenuItem>
                  <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                  <MenuItem value="Eritrea">Eritrea</MenuItem>
                  <MenuItem value="Estonia">Estonia</MenuItem>
                  <MenuItem value="Eswatini (fmr. 'Swaziland')">Eswatini (fmr. 'Swaziland')</MenuItem>
                  <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                  <MenuItem value="Fiji">Fiji</MenuItem>
                  <MenuItem value="Finland">Finland</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="Gabon">Gabon</MenuItem>
                  <MenuItem value="Gambia">Gambia</MenuItem>
                  <MenuItem value="Georgia">Georgia</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                  <MenuItem value="Ghana">Ghana</MenuItem>
                  <MenuItem value="Greece">Greece</MenuItem>
                  <MenuItem value="Grenada">Grenada</MenuItem>
                  <MenuItem value="Guatemala">Guatemala</MenuItem>
                  <MenuItem value="Guinea">Guinea</MenuItem>
                  <MenuItem value="Guinea-Bissau">Guinea-Bissau</MenuItem>
                  <MenuItem value="Guyana">Guyana</MenuItem>
                  <MenuItem value="Haiti">Haiti</MenuItem>
                  <MenuItem value="Holy See">Holy See</MenuItem>
                  <MenuItem value="Honduras">Honduras</MenuItem>
                  <MenuItem value="Hungary">Hungary</MenuItem>
                  <MenuItem value="Iceland">Iceland</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Indonesia">Indonesia</MenuItem>
                  <MenuItem value="Iran">Iran</MenuItem>
                  <MenuItem value="Iraq">Iraq</MenuItem>
                  <MenuItem value="Ireland">Ireland</MenuItem>
                  <MenuItem value="Israel">Israel</MenuItem>
                  <MenuItem value="Italy">Italy</MenuItem>
                  <MenuItem value="Jamaica">Jamaica</MenuItem>
                  <MenuItem value="Japan">Japan</MenuItem>
                  <MenuItem value="Jordan">Jordan</MenuItem>
                  <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                  <MenuItem value="Kenya">Kenya</MenuItem>
                  <MenuItem value="Kiribati">Kiribati</MenuItem>
                  <MenuItem value="Kuwait">Kuwait</MenuItem>
                  <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                  <MenuItem value="Laos">Laos</MenuItem>
                  <MenuItem value="Latvia">Latvia</MenuItem>
                  <MenuItem value="Lebanon">Lebanon</MenuItem>
                  <MenuItem value="Lesotho">Lesotho</MenuItem>
                  <MenuItem value="Liberia">Liberia</MenuItem>
                  <MenuItem value="Libya">Libya</MenuItem>
                  <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                  <MenuItem value="Lithuania">Lithuania</MenuItem>
                  <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                  <MenuItem value="Madagascar">Madagascar</MenuItem>
                  <MenuItem value="Malawi">Malawi</MenuItem>
                  <MenuItem value="Malaysia">Malaysia</MenuItem>
                  <MenuItem value="Maldives">Maldives</MenuItem>
                  <MenuItem value="Mali">Mali</MenuItem>
                  <MenuItem value="Malta">Malta</MenuItem>
                  <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                  <MenuItem value="Mauritania">Mauritania</MenuItem>
                  <MenuItem value="Mauritius">Mauritius</MenuItem>
                  <MenuItem value="Mexico">Mexico</MenuItem>
                  <MenuItem value="Micronesia">Micronesia</MenuItem>
                  <MenuItem value="Moldova">Moldova</MenuItem>
                  <MenuItem value="Monaco">Monaco</MenuItem>
                  <MenuItem value="Mongolia">Mongolia</MenuItem>
                  <MenuItem value="Montenegro">Montenegro</MenuItem>
                  <MenuItem value="Morocco">Morocco</MenuItem>
                  <MenuItem value="Mozambique">Mozambique</MenuItem>
                  <MenuItem value="Myanmar (formerly Burma)">Myanmar (formerly Burma)</MenuItem>
                  <MenuItem value="Namibia">Namibia</MenuItem>
                  <MenuItem value="Nauru">Nauru</MenuItem>
                  <MenuItem value="Nepal">Nepal</MenuItem>
                  <MenuItem value="Netherlands">Netherlands</MenuItem>
                  <MenuItem value="New Zealand">New Zealand</MenuItem>
                  <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                  <MenuItem value="Niger">Niger</MenuItem>
                  <MenuItem value="Nigeria">Nigeria</MenuItem>
                  <MenuItem value="North Korea">North Korea</MenuItem>
                  <MenuItem value="North Macedonia">North Macedonia</MenuItem>
                  <MenuItem value="Norway">Norway</MenuItem>
                  <MenuItem value="Oman">Oman</MenuItem>
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                  <MenuItem value="Palau">Palau</MenuItem>
                  <MenuItem value="Palestine State">Palestine State</MenuItem>
                  <MenuItem value="Panama">Panama</MenuItem>
                  <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                  <MenuItem value="Paraguay">Paraguay</MenuItem>
                  <MenuItem value="Peru">Peru</MenuItem>
                  <MenuItem value="Philippines">Philippines</MenuItem>
                  <MenuItem value="Poland">Poland</MenuItem>
                  <MenuItem value="Portugal">Portugal</MenuItem>
                  <MenuItem value="Qatar">Qatar</MenuItem>
                  <MenuItem value="Romania">Romania</MenuItem>
                  <MenuItem value="Russia">Russia</MenuItem>
                  <MenuItem value="Rwanda">Rwanda</MenuItem>
                  <MenuItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</MenuItem>
                  <MenuItem value="Saint Lucia">Saint Lucia</MenuItem>
                  <MenuItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</MenuItem>
                  <MenuItem value="Samoa">Samoa</MenuItem>
                  <MenuItem value="San Marino">San Marino</MenuItem>
                  <MenuItem value="Sao Tome and Principe">Sao Tome and Principe</MenuItem>
                  <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                  <MenuItem value="Senegal">Senegal</MenuItem>
                  <MenuItem value="Serbia">Serbia</MenuItem>
                  <MenuItem value="Seychelles">Seychelles</MenuItem>
                  <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                  <MenuItem value="Singapore">Singapore</MenuItem>
                  <MenuItem value="Slovakia">Slovakia</MenuItem>
                  <MenuItem value="Slovenia">Slovenia</MenuItem>
                  <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                  <MenuItem value="Somalia">Somalia</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                  <MenuItem value="South Korea">South Korea</MenuItem>
                  <MenuItem value="South Sudan">South Sudan</MenuItem>
                  <MenuItem value="Spain">Spain</MenuItem>
                  <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                  <MenuItem value="Sudan">Sudan</MenuItem>
                  <MenuItem value="Suriname">Suriname</MenuItem>
                  <MenuItem value="Sweden">Sweden</MenuItem>
                  <MenuItem value="Switzerland">Switzerland</MenuItem>
                  <MenuItem value="Syria">Syria</MenuItem>
                  <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                  <MenuItem value="Tanzania">Tanzania</MenuItem>
                  <MenuItem value="Thailand">Thailand</MenuItem>
                  <MenuItem value="Timor-Leste">Timor-Leste</MenuItem>
                  <MenuItem value="Togo">Togo</MenuItem>
                  <MenuItem value="Tonga">Tonga</MenuItem>
                  <MenuItem value="Trinidad and Tobago">Trinidad and Tobago</MenuItem>
                  <MenuItem value="Tunisia">Tunisia</MenuItem>
                  <MenuItem value="Turkey">Turkey</MenuItem>
                  <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                  <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                  <MenuItem value="Uganda">Uganda</MenuItem>
                  <MenuItem value="Ukraine">Ukraine</MenuItem>
                  <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="United States of America">United States of America</MenuItem>
                  <MenuItem value="Uruguay">Uruguay</MenuItem>
                  <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                  <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                  <MenuItem value="Vatican City">Vatican City</MenuItem>
                  <MenuItem value="Venezuela">Venezuela</MenuItem>
                  <MenuItem value="Vietnam">Vietnam</MenuItem>
                  <MenuItem value="Yemen">Yemen</MenuItem>
                  <MenuItem value="Zambia">Zambia</MenuItem>
                  <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
          </TextField>
          <TextField
            fullWidth
            type="date"
            label="Expiry Date"
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              shrink: true, // Ensures the label stays above the input area
              }}
          />
          <TextField
            fullWidth
            label="Notes"
            margin="dense"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
