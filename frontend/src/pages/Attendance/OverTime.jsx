import React, { useState } from "react";
import Sidenav from "../../components/Sidenav";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Tooltip,
  TablePagination,
  TableSortLabel,
  Checkbox,
  IconButton,
  FormControl
} from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

function createData(id, employee, start, end, hours) {
  return {
    id,
    employee,
    start,
    end,
    hours
  };
}

const rows = [
  createData('HH0001', 'H E Fernando', '2024-12-10 18:30:00', '2024-12-10 20:30:00', 2),
  createData('HH0002', 'H E Fernando', '2024-12-10 19:25:00', '2024-12-10 20:25:00', 1),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Employee ID',
  },
  {
    id: 'employee',
    numeric: false,
    disablePadding: false,
    label: 'Employee',
  },
  {
    id: 'start',
    numeric: false,
    disablePadding: false,
    label: 'Start Time',
  },
  {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'End Time',
  },
  {
    id: 'hours',
    numeric: false,
    disablePadding: false,
    label: 'Hours',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function DailyAttendance() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [position, setPosition] = useState("");
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (event) => setDate(event.target.value);
  const handlePositionChange = (event) => setPosition(event.target.value);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  // Sample data for the table (replace this with actual data)
  // const row = [
  //   {
  //     name: "John Doe",
  //     position: "Manager",
  //     date: "2024-01-01",
  //     status: "Present",
  //   },
  //   {
  //     name: "Jane Smith",
  //     position: "Engineer",
  //     date: "2024-01-01",
  //     status: "Absent",
  //   },
  //   // Add more rows as needed
  // ];

  return (
    <>
    <Box height={100}/>
    <Box sx={{ display: "flex" }}>
      <Sidenav/>
      <Container>
        {/* Header Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold" }}
          >
            Over Time
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Over Time
          </Button>
        </Box>

        {/* Dropdowns for Date and Position */}
        <Grid container spacing={2} mb={2} justifyContent="space-between">
          {/* Date Dropdown - Left Side */}
          <Grid item xs={12} md={12}>
            <InputLabel>Date</InputLabel>
            <Select
              fullWidth
              value={date || "2024-01-01"} // Default value for date
              onChange={handleDateChange}
            >
              <MenuItem value="2024-01-01">2024-01-01</MenuItem>
              <MenuItem value="2024-01-02">2024-01-02</MenuItem>
              {/* Add more dates as needed */}
            </Select>
          </Grid>

          {/* Position Dropdown - Right Side */}
          <Grid item xs={12} md={12}>

            {/* Buttons aligned to the right below Position */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#61758b",
                  "&:hover": { backgroundColor: "#218838" },
                }}
              >
                Search
              </Button>
            </Box>

            {/* Search Label and Input Box */}
            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2} gap={1}>
              <Typography variant="body1">Search</Typography>
              <TextField
                variant="outlined"
                borderRadius= '50px'
                size="small"
                sx={{ width: "300px" }} // Adjust the width as needed              
              />
            </Box>
          </Grid>

          {/* Table content*/}
          <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                       &nbsp;&nbsp; {row.id}
                    </TableCell>
                    <TableCell align="left">{row.employee}</TableCell>
                    <TableCell align="left">{row.start}</TableCell>
                    <TableCell align="left">{row.end}</TableCell>
                    <TableCell align="left">{row.hours}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
        </Grid>

        

        {/* Popup for Adding Attendance */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle align="center">Add Over Time</DialogTitle>
          <DialogContent>
            <br />
            <FormControl fullWidth sx={{paddingBottom: '15px'}}>
              <InputLabel id="department-label">Employee</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                label="Department"
              >
                <MenuItem value={0}>HH0001 - Enyro Fernando</MenuItem>
                <MenuItem value={1}>HH0002 - Pasindu Madushka</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Date"
              margin="dense"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true, // Ensures the label stays above the input area
              }}
            />
            <TextField
              fullWidth
              label="Start Time"
              margin="dense"
              variant="outlined"
              type="time"
            />
            <TextField
              fullWidth
              label="End Time"
              margin="dense"
              variant="outlined"
              type="time"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      </Box>
    </>
  );
}
