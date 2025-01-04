
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Login from './pages/Login';
import Departments from './pages/Departments';
import Employee from './pages/Employee';
import PendingEmployees from './pages/Employees/PendingEmployees';
import ManningBudget from './pages/Department/ManningBudget';
import Positions from './pages/Department/Positions';
import HoildayList from './pages/Department/HoildayList';
import LeaveTypes from './pages/Department/LeaveTypes';
import LeaveForPosition from './pages/Department/LeaveForPosition';
import UserRoles from './pages/UserAdministration/UserRoles';
import Users from './pages/UserAdministration/Users';
import AuditLogs from './pages/UserAdministration/AuditLogs';

import EmployeePersonalDetails from './pages/Employees/EmployeePersonalDetails';
import EmployeeBankDetails from './pages/Employees/EmployeeBankDetails';
import EmployeeSalaryDetails from './pages/Employees/EmployeeSalaryDetails';
import PendingResignation from './pages/Employees/PendingResignation';
import PendingTermination from './pages/Employees/PendingTermination';
import ResignedEmployees from './pages/Employees/ResignedEmployees';
import TerminatedEmployees from './pages/Employees/TerminatedEmployees';
import EmployeeVisa from './pages/Employees/EmployeeVisa';
import EligibleLeaveBalance from './pages/Employees/EligibleLeaveBalance';

import DailyAttendance from './pages/Attendance/DailyAttendance';
import MonthlyAttendance from './pages/Attendance/MonthlyAttendance';
import OverTime from './pages/Attendance/OverTime';
import LeaveBalance from './pages/Attendance/LeaveBalance';
import ApplyLeave from './pages/Attendance/ApplyLeave';
import AppliedLeave from './pages/Attendance/AppliedLeave';
import PendingLeaveApproval from './pages/Attendance/PendingLeaveApproval';

import PendingSalary from './pages/Payrol/PendingSalary';
import AddSalaryTransaction from './pages/Payrol/AddSalaryTransaction';
import AddTransaction from './pages/Payrol/AddTransaction';
import PendingTransaction from './pages/Payrol/PendingTransaction';
import CompleteTransaction from './pages/Payrol/CompleteTransaction';
import CancelTransation from './pages/Payrol/CancelTransation';

import AttendanceReport from './pages/Report/AttendanceReport';
import SalaryReport from './pages/Report/SalaryReport';
import GeneralReport from './pages/Report/GeneralReport';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/employee" element={<Employee/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/department" element={<Departments/>}/>
      <Route path="/manning-budget" element={<ManningBudget/>}/>
      <Route path="/positions" element={<Positions/>}/>
      <Route path="/holiday-list" element={<HoildayList/>}/>
      <Route path="/leave-types" element={<LeaveTypes/>}/>
      <Route path="/leave-type-position" element={<LeaveForPosition/>}/>
      <Route path="/user-roles" element={<UserRoles/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/user-logs" element={<AuditLogs/>}/>

      {/* Emplyee Pages*/}
      <Route path="/employees/pending" element={<PendingEmployees/>}/>
      <Route path="/employees/personal/details" element={<EmployeePersonalDetails/>}/>
      <Route path="/employees/bank/details" element={<EmployeeBankDetails/>}/>
      <Route path="/employees/salary/details" element={<EmployeeSalaryDetails/>}/>
      <Route path="/employees/details/pending-resigned" element={<PendingResignation/>}/>
      <Route path="/employees/details/pending-termination" element={<PendingTermination/>}/>
      <Route path="/employees/details/resigned" element={<ResignedEmployees/>}/>
      <Route path="/employees/details/terminated" element={<TerminatedEmployees/>}/>
      <Route path="/employees/details/employee-visa" element={<EmployeeVisa/>}/>
      <Route path="/employees/details/eligible-leave" element={<EligibleLeaveBalance/>}/>

      {/* Attendance Pages*/}
      <Route path="/attendence" element={<DailyAttendance/>}/>
      <Route path="/attendance/monthly" element={<MonthlyAttendance/>}/>
      <Route path="/attendance/over-time" element={<OverTime/>}/>
      <Route path="/attendance/leave-balance" element={<LeaveBalance/>}/>
      <Route path="/attendance/apply-leave-balance" element={<ApplyLeave/>}/>
      <Route path="/attendance/applied-leave-balance" element={<AppliedLeave/>}/>
      <Route path="/attendance/pending-leave" element={<PendingLeaveApproval/>}/>

      {/* Payrol Pages*/}
      <Route path="/payrol" element={<PendingSalary/>}/>
      <Route path="/payrol/add-salary" element={<AddSalaryTransaction/>}/>
      <Route path="/payrol/add-transaction" element={<AddTransaction/>}/>
      <Route path="/payrol/pending-transaction" element={<PendingTransaction/>}/>
      <Route path="/payrol/completed-transaction" element={<CompleteTransaction/>}/>
      <Route path="/payrol/cancel-transaction" element={<CancelTransation/>}/>

      {/* Report Pages*/}
      <Route path="/report-attendance" element={<AttendanceReport/>}/>
      <Route path="/report-salary" element={<SalaryReport/>}/>
      <Route path="/report-general" element={<GeneralReport/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
