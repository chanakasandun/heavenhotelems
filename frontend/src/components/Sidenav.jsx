import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronRight';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AssessmentIcon from '@mui/icons-material/Assessment';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const role = localStorage.getItem('role');
  const department = localStorage.getItem('department');
  const roleName = localStorage.getItem('roleName');
  const departmentName = localStorage.getItem('departmentName');
  const userName = localStorage.getItem('userName');
  const authToken = localStorage.getItem('authToken');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mainItems, setMainItems] = React.useState([]);
  const mainItemsSuperAdmin = [
    // { text: 'Dashboard', meueName: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'MANAGEMENT', meueName: 'Management', icon: <SettingsIcon />},
    { text: 'EMPLOYEES', meueName: 'Employees', icon: <GroupIcon />},
    { text: 'ATTENDANCE', meueName: 'Attendance', icon: <EventNoteIcon />},
    { text: 'PAYROLL & TRANSACTIONS', meueName: 'Payroll', icon: <AccountBalanceIcon />},
    { text: 'USER ADMINISTRATION', meueName: 'User', icon: <PermIdentityIcon />},
    { text: 'REPORTS', meueName: 'Report', icon: <AssessmentIcon />},
  ];
  const mainItemsAdmin = [
    { text: 'MANAGEMENT', meueName: 'Management', icon: <SettingsIcon />},
    { text: 'EMPLOYEES', meueName: 'Employees', icon: <GroupIcon />},
    { text: 'ATTENDANCE', meueName: 'Attendance', icon: <EventNoteIcon />},
    { text: 'PAYROLL & TRANSACTIONS', meueName: 'Payroll', icon: <AccountBalanceIcon />},
    { text: 'REPORTS', meueName: 'Report', icon: <AssessmentIcon />},
  ];
  const mainItemsHOD = [
    { text: 'ATTENDANCE', meueName: 'Attendance', icon: <EventNoteIcon />},
  ];
  const mainItemsExecutiveIT = [
    { text: 'USER ADMINISTRATION', meueName: 'User', icon: <PermIdentityIcon />},
  ];
  const mainItemsExecutiveFinance = [
    { text: 'ATTENDANCE', meueName: 'Attendance', icon: <EventNoteIcon />},
    { text: 'PAYROLL & TRANSACTIONS', meueName: 'Payroll', icon: <AccountBalanceIcon />},
    { text: 'REPORTS', meueName: 'Report', icon: <AssessmentIcon />},
  ];
  const mainItemsExecutiveHR = [
    { text: 'MANAGEMENT', meueName: 'Management', icon: <SettingsIcon />},
    { text: 'EMPLOYEES', meueName: 'Employees', icon: <GroupIcon />},
    { text: 'ATTENDANCE', meueName: 'Attendance', icon: <EventNoteIcon />},
    { text: 'REPORTS', meueName: 'Report', icon: <AssessmentIcon />},
  ];

  const subItems = {
    Management: [
      { text: 'Departments', path: '/department' },
      { text: 'Positions', path: '/positions' },
      { text: 'Manning Budget', path: '/manning-budget' },
      { text: 'Holiday List', path: '/holiday-list' },
      { text: 'Leave Types', path: '/leave-types' },
      { text: 'Leave Types For Positions', path: '/leave-type-position' }
    ],
    Employees: [
      { text: 'Create Employee', path: '/employee' },
      { text: 'Pending Employees', path: '/employees/pending' },
      // { text: 'Employee Profile', path: '/employees/profile' },
      { text: 'Employee Details', path: '/employees/personal/details' },
      { text: 'Employee Bank Details', path: '/employees/bank/details' },
      { text: 'Employee Salary Details', path: '/employees/salary/details' },
      { text: 'Employee Resignation', path: '/employees/details/resigned' },
      { text: 'Pending Resignations', path: '/employees/details/pending-resigned' },
      { text: 'Employee Termination', path: '/employees/details/terminated' },
      { text: 'Pending Terminations', path: '/employees/details/pending-termination' },
      { text: 'Employee Visa', path: '/employees/details/employee-visa' },
      { text: 'Employee Leaves Eligibility', path: '/employees/details/eligible-leave' },
    ],
    Attendance: [
      { text: 'Daily Attendance', path: '/attendence' },
      { text: 'Monthly Attendance', path: '/attendance/monthly' },
      { text: 'Over TIme', path: '/attendance/over-time' },
      { text: 'Leave Balance', path: '/attendance/leave-balance' },
      { text: 'Apply Leaves', path: '/attendance/apply-leave-balance' },
      { text: 'Applied Leaves', path: '/attendance/applied-leave-balance' },
      { text: 'Pending Leave Approval', path: '/attendance/pending-leave' },
    ],
    Payroll: [
      { text: 'Pending Salaries', path: '/payrol' },
      { text: 'Add Salary Transaction', path: '/payrol/add-salary' },
      { text: 'Add Transaction', path: '/payrol/add-transaction' },
      { text: 'Pending Transaction', path: '/payrol/pending-transaction' },
      { text: 'Completed Transaction', path: '/payrol/completed-transaction' },
      { text: 'Rejected Transactions', path: '/payrol/cancel-transaction' },
    ],
    User: [
      { text: 'User Roles', path: '/user-roles' },
      { text: 'Users', path: '/users' },
      { text: 'Audit Logs', path: '/user-logs' }
    ],
    Report: [
      { text: 'Monthly Department Wise Attendance', path: '/report-attendance' },
      { text: 'Monthly Department Wise Salary', path: '/report-salary' },
      { text: 'Monthly Manning Budget Vs Employee Salary', path: '/report-general' },
    ]
  };

  React.useEffect(() => { 
    if(role == null || role == '' || authToken == null || authToken == ''){
      navigate('/login')
    }

    if(role == 1){
      setMainItems(mainItemsSuperAdmin)
    }else if(role == 2){
      setMainItems(mainItemsAdmin)
    }else if(role == 3){
      if(department == 2 || department == 3){
        setMainItems(mainItemsAdmin)
      }else{
        setMainItems(mainItemsHOD)
      }
    }else if(role == 4){
      if(department == 1){
        setMainItems(mainItemsExecutiveIT)
      }else if(department == 2){
        setMainItems(mainItemsExecutiveFinance)
      }else if(department == 3){
        setMainItems(mainItemsExecutiveHR)
      }
    }
  }, [role, department]);

  const logout = async () => {
    try {
      if (authToken) {
        // Make the sign-out API call
        await axios.post('http://127.0.0.1:8000/api/user/logout', {}, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        localStorage.clear();
        navigate('/login');
      }else{
        localStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      console.error('Sign-out error', error);
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: '#2b2b2d' }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <IconButton onClick={() => navigate('/')} variant="h6" sx={{ color: 'white', marginRight: 'auto', paddingLeft: 2 }}>
            Heaven Hotel EM
          </IconButton>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 'auto',
              position: 'relative',
            }}
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
          >
            <Box
              sx={{
                backgroundColor: '#eedc77',
                borderRadius: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0.01,
                mr: 1,
              }}
            >
              <IconButton color="inherit">
                <AccountCircleIcon sx={{ color: '#333' }} />
              </IconButton>
          </Box>
            <Typography variant="subtitle1" sx={{ color: '#e7e4e4' }}>
              {userName}
            </Typography>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  mt: 2,
                  ml: 1,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <MenuItem
                onClick={logout}
                sx={{ fontWeight: 'bold', fontSize: '14px' }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" sx={{ color: '#007AFF', marginRight: 'auto', paddingLeft: 2 }}>
            {roleName}
            {role > 2 ? (
              <>
              &nbsp;({departmentName})
              </>
            ): (
              <></>
            )}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ bgcolor: '#fff' }}>
          {mainItems.map((item) => (
            <React.Fragment key={item.meueName}>
              <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 20,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  cursor: 'default', // Disable pointer
                  '&:hover': {
                    backgroundColor: 'transparent', // Remove hover effect
                  },
                }}
                onClick={handleDrawerOpen}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    '& .MuiTypography-root': { fontSize: '12px', fontWeight: 'bold' },
                  }}
                />
              </ListItemButton>
            </ListItem>

              {open && (
                <List sx={{ pl: 4 }}>
                  {subItems[item.meueName]?.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          justifyContent: 'center',
                          px: 4.5,
                        }}
                        onClick={() => navigate(subItem.path)}
                      >
                        <ListItemText primary={subItem.text} sx={{ color: '#000', '& .MuiTypography-root': { fontSize: '12px' } }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
