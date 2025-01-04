import React, { useState, useEffect } from 'react';
import Sidenav from "../components/Sidenav";
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
import axios from 'axios';
import { useSnackbar } from './../components/SnackbarContext';

export default function Employee() {
  const authToken = localStorage.getItem('authToken');
  const { showSnackbar } = useSnackbar();
  const createEmployee  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/employee/create', {
        first_name: firstName,
        last_name: lastName,
        position_id: position,
        joined_date: joinedDate,
        dob: dob,
        address1: address1,
        address2: address2,
        suburb: suburb,
        district: district,
        province: province,
        country: country,
        citizenship_country: citizenship,
        maritial_status: maritial,
        identity_number: identity,
        passport_number: passport,
        phone: phone,
        landline: landline
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setFirstName('');
        setLastName('');
        setPosition('');
        setJoinedDate('');
        setDob('');
        setAddress1('');
        setAddress2('');
        setSuburb('');
        setDistrict('');
        setProvince('');
        setCountry('');
        setCitizenship('');
        setMaritial(0);
        setIdentity('');
        setPassport('');
        setPhone('');
        setLandline('');
        showSnackbar(response.data.message, 'success')
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

  const [firstName, setFirstName] = React.useState('');
  
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const [lastName, setLastName] = React.useState('');
  
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const [positions, setPositions] = React.useState([]);

  const getPositions  = async () =>{
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/position/all', {
        department_id:0
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.code === 1) {
        setPositions(response.data.data.positions)
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

  useEffect(() => { 
      getPositions();
    },[]);
  
  const [position, setPosition] = React.useState('');

  const handlePosition = (event) => {
    setPosition(event.target.value);
  };

  const [joinedDate, setJoinedDate] = React.useState('');

  const handleJoinedDate = (event) => {
    setJoinedDate(event.target.value);
  };

  const [dob, setDob] = React.useState('');

  const handleDob = (event) => {
    setDob(event.target.value);
  };

  const [address1, setAddress1] = React.useState('');

  const handleAddress1 = (event) => {
    setAddress1(event.target.value);
  };

  const [address2, setAddress2] = React.useState('');

  const handleAddress2 = (event) => {
    setAddress2(event.target.value);
  };

  const [suburb, setSuburb] = React.useState('');

  const handleSuburb = (event) => {
    setSuburb(event.target.value);
  };

  const [district, setDistrict] = React.useState('');

  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const [province, setProvince] = React.useState('');

  const handleProvince = (event) => {
    setProvince(event.target.value);
  };

  const [country, setCountry] = React.useState('');

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const [citizenship, setCitizenship] = React.useState('');

  const handleCitizenship = (event) => {
    setCitizenship(event.target.value);
  };

  const [maritial, setMaritial] = React.useState(0);

  const handleMaritial = (event) => {
    setMaritial(event.target.value);
  };

  const [identity, setIdentity] = React.useState('');

  const handleIdentity = (event) => {
    setIdentity(event.target.value);
  };

  const [passport, setPassport] = React.useState('');

  const handlePassport = (event) => {
    setPassport(event.target.value);
  };

  const [phone, setPhone] = React.useState('');

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const [landline, setLandline] = React.useState('');

  const handleLandline = (event) => {
    setLandline(event.target.value);
  };
  return (
    <>
      <Box height={100} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Container>
          {/* Header Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Create Employee
            </Typography>
          </Box>

          {/* Form Section */}
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              {/* First Name and Last Name */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  required
                  value={firstName}
                  onChange={handleFirstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  required
                  onChange={handleLastName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Position"
                  variant="outlined"
                  value={position}
                  required
                  onChange={handlePosition}
                >
                  {positions.map((pos) => (
                      <MenuItem 
                      key={pos.id} 
                      value={pos.id}>
                        {pos.name} - {pos.department_name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Joined Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={joinedDate}
                  required
                  onChange={handleJoinedDate}

                />
              </Grid>

              {/* DOB, Citizenship, and Marital Status */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="D.O.B"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={dob}
                  required
                  onChange={handleDob}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  select
                  label="Nationality"
                  variant="outlined"
                  value={citizenship}
                        required
                        onChange={handleCitizenship}
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
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  select
                  label="Marital Status"
                  variant="outlined"
                  value={maritial}
                  required
                  onChange={handleMaritial}
                >
                  <MenuItem value="0">Single</MenuItem>
                  <MenuItem value="1">Married</MenuItem>=
                  <MenuItem value="2">Divorced</MenuItem>
                </TextField>
              </Grid>

              {/* Identity Number and Passport Number */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Identity No"
                  variant="outlined"
                  required
                  value={identity}
                  onChange={handleIdentity}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Passport No"
                  variant="outlined"
                  alue={passport}
                  onChange={handlePassport}
                />
              </Grid>

              {/* Phone and Landline */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  variant="outlined"
                  value={phone}
                  onChange={handlePhone}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Home"
                  variant="outlined"
                  value={landline}
                  onChange={handleLandline}
                />
              </Grid>

              {/* Address Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Address
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #a5a3a3",
                    padding: 2,
                    mt: 1,
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Street1 and Street2 */}
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="No"
                        variant="outlined"
                        value={address1}
                        required
                        onChange={handleAddress1}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Street"
                        variant="outlined"
                        alue={address2}
                        required
                        onChange={handleAddress2}
                      />
                    </Grid>

                    {/* Suburb and District */}
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="City"
                        variant="outlined"
                        value={suburb}
                        required
                        onChange={handleSuburb}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="District"
                        variant="outlined"
                        value={district}
                        required
                        onChange={handleDistrict}
                      />
                    </Grid>

                    {/* Province and Country */}
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Region"
                        variant="outlined"
                        value={province}
                        required
                        onChange={handleProvince}
                      />
                    </Grid>
                    <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Country"
                  variant="outlined"

                  value={country}
                  required
                  onChange={handleCountry}
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
              </Grid>
                  </Grid>
                </Box>
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
                  onClick={createEmployee}
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
