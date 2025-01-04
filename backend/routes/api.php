<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\LeaveTypeController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\PositionLeaveTypeController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('user/login', [AuthController::class, 'login']);

Route::middleware('auth.validate')->group(function () {
    Route::post('user/logout', [AuthController::class, 'logout']);

    //Management
    Route::post('department/create', [DepartmentController::class, 'create']);
    Route::post('department/all', [DepartmentController::class, 'all']);
    Route::post('department/edit', [DepartmentController::class, 'edit']);

    Route::post('position/create', [PositionController::class, 'create']);
    Route::post('position/all', [PositionController::class, 'all']);
    Route::post('position/edit', [PositionController::class, 'edit']);
    Route::post('position/edit/budget', [PositionController::class, 'edit_budget']);

    Route::post('holiday/create', [HolidayController::class, 'create']);
    Route::post('holiday/all', [HolidayController::class, 'all']);
    Route::post('holiday/edit', [HolidayController::class, 'edit']);
    Route::post('holiday/delete', [HolidayController::class, 'delete']);

    Route::post('leave-type/create', [LeaveTypeController::class, 'create']);
    Route::post('leave-type/all', [LeaveTypeController::class, 'all']);
    Route::post('leave-type/edit', [LeaveTypeController::class, 'edit']);

    Route::post('position-leave-type/create', [PositionLeaveTypeController::class, 'create']);
    Route::post('position-leave-type/all', [PositionLeaveTypeController::class, 'all']);
    Route::post('position-leave-type/delete', [PositionLeaveTypeController::class, 'delete']);


    //User Administration
    Route::post('user-roles/all', [UserController::class, 'all_user_roles']);

    Route::post('user/create', [UserController::class, 'create_user']);
    Route::post('user/all', [UserController::class, 'all_users']);
    Route::post('user/edit', [UserController::class, 'edit_user']);
    Route::post('user/reset-password', [UserController::class, 'reset_password']);

    Route::post('audit-logs/all', [UserController::class, 'all_logs']);


    //Employee
    Route::post('employee/create', [EmployeeController::class, 'create_employee']);

    Route::post('pending-employee/all', [EmployeeController::class, 'all_pending_employees']);
    Route::post('pending-employee/status', [EmployeeController::class, 'approve_reject_employee']);

    Route::post('employee-personal-details/all', [EmployeeController::class, 'employee_personal_details']);
    Route::post('employee-personal-details/edit', [EmployeeController::class, 'edit_employee_personal_details']);

    Route::post('employee-bank-details/create-emp-list', [EmployeeController::class, 'bankless_employees']);
    Route::post('employee-bank-details/create', [EmployeeController::class, 'create_bank_details']);
    Route::post('employee-bank-details/all', [EmployeeController::class, 'all_bank_details']);
    Route::post('employee-bank-details/edit', [EmployeeController::class, 'edit_bank_details']);
});