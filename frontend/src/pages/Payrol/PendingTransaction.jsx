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
  DialogContentText
} from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

function createData(id,employee_id, employee, reason, date, amount) {
  return {
    id,
    employee_id,
    employee,
    reason,
    date,
    amount
  };
}

const rows = [
  createData(1,'HH0001', 'H E Fernando','Salary', '2024-12-01', '287,000.00'),
  createData(2,'HH0002', 'H E Fernando', 'Salary Adjustment','2024-12-05', '7,000.00'),
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
    label: 'Transaction ID',
  },
  {
    id: 'employee_id',
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
    id: 'reason',
    numeric: false,
    disablePadding: false,
    label: 'Transaction Type',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  }
  ,
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
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

export default function PendingTransaction() {
  const userRole = localStorage.getItem('role');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [position, setPosition] = useState("");
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = (row) => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = (row) => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

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
            Pending Transactions
          </Typography>
        </Box>

        {/* Dropdowns for Date and Position */}
        <Grid container spacing={2} mb={2} justifyContent="space-between">
        <br />
          {/* Table content*/}
          <Box sx={{ width: '100%'}}>
            <br />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>

              <TableCell style={{
                    fontWeight: "bold",
                    color: "#3f51b5",
                  }}>Transaction ID</TableCell>
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
                  }}>Transaction Type</TableCell>
                  <TableCell style={{
                    fontWeight: "bold",
                    color: "#3f51b5",
                  }}>Amount</TableCell>
                  <TableCell style={{
                      fontWeight: "bold",
                      color: "#3f51b5",
                    }}>Date</TableCell>
                  {userRole < 3 ? 
                  <TableCell align="center" style={{
                    fontWeight: "bold",
                    color: "#3f51b5",
                  }}>Actions</TableCell>
                  : 
                      <></>
                    }
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
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
                    <TableCell align="left">{row.employee_id}</TableCell>
                    <TableCell align="left">{row.employee}</TableCell>
                    <TableCell align="left">{row.reason}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    {userRole < 3 ? 
                    <TableCell align="center">
                      <Button style={{
                        marginBottom: "5px"
                      }}  variant="contained" color="success" onClick={() => handleOpenEdit(row)}>
                        Approve
                      </Button><br />
                      <Button variant="contained" color="error" onClick={() => handleOpenDelete(row)}>
                        Reject
                      </Button>
                    </TableCell>
                    : 
                    <></>
                  }
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
      
    </Box>
        </Grid>

        

        {/* Popup for Adding Attendance */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle align="center">Add Attendance</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              margin="dense"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Position"
              margin="dense"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Date"
              margin="dense"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Status"
              margin="dense"
              variant="outlined"
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
                Are you sure you want to reject this transaction?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>No</Button>
              <Button variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openEdit}
            onClose={handleOpenEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to approve this transaction?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>No</Button>
              <Button variant="contained" autoFocus >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
      </Container>
      </Box>
    </>
  );
}
