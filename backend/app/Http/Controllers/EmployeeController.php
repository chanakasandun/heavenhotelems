<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeBank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class EmployeeController extends Controller
{
    public function create_employee(Request $request){
        $validator = Validator::make($request->all(),[
            'first_name' => 'required',
            'last_name' => 'required',
            'position_id' => 'required|integer',
            'dob' => 'required|date',
            'joined_date' => 'required|date',
            'address1' => 'required',
            'address2' => 'nullable',
            'suburb' => 'required',
            'district' => 'required',
            'province' => 'required',
            'country' => 'required',
            'citizenship_country' => 'required',
            'maritial_status' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $employee = new Employee();
        $employee->first_name = $request->first_name;
        $employee->last_name = $request->last_name;
        $employee->position_id = $request->position_id;
        $employee->dob = $request->dob;
        $employee->joined_date = $request->joined_date;
        $employee->address1 = $request->address1;
        $employee->address2 = $request->address2;
        $employee->suburb = $request->suburb;
        $employee->district = $request->district;
        $employee->province = $request->province;
        $employee->country = $request->country;
        $employee->citizenship_country = $request->citizenship_country;
        $employee->phone = $request->phone;
        $employee->landline = $request->landline;
        $employee->maritial_status = $request->maritial_status;
        $employee->identity_number = $request->identity_number;
        $employee->passport_number = $request->passport_number;
        $employee->status = 0;
        $employee->created_by = Auth::guard('sanctum')->user()->id;

        // if( Auth::guard('sanctum')->user()->role_id < 3){
        //     $employee->status = 1;
        // }

        $employee->save();

        return response()->json([
            'code' => 1,
            'message' => 'Employee created successfully.'
        ]);

    }

    public function all_pending_employees(Request $request){
        $employees = Employee::select('employees.*', 'positions.name as position_name', 'departments.name as department_name')
                                ->where('employees.status', 0)
                                ->leftJoin('positions', 'positions.id', 'employees.position_id')
                                ->leftJoin('departments', 'departments.id', 'positions.department_id')
                                ->orderBy('employees.id')->get();

        return response()->json([
            'code' => 1,
            'data' => [
                'employees' => $employees
            ]
        ]);
    }

    public function approve_reject_employee(Request $request){
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|integer',
            'status' => 'required|integer'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $employee = Employee::find($request->employee_id);
        if(empty($employee)){
            return response()->json([
                'code' => 0,
                'message' => 'Employee not available.'
            ]);
        }

        $employee->status = $request->status;
        $employee->updated_by = Auth::guard('sanctum')->user()->id;
        $employee->save();

        return response()->json([
            'code' => 1,
            'message' => 'Employee updated successfully.'
        ]);
    }

    public function employee_personal_details(Request $request){
        $employees = Employee::select('employees.*', 'positions.name as position_name', 'departments.name as department_name')
                                ->leftJoin('positions', 'positions.id', 'employees.position_id')
                                ->leftJoin('departments', 'departments.id', 'positions.department_id');

        if(isset($request->status) && $request->status != 0){
            $employees =  $employees->where('employees.status', $request->status);
        }

        if(isset($request->department_id) && $request->department_id != 0){
            $employees =  $employees->where('departments.id', $request->department_id);
        }

        if(isset($request->position_id) && $request->position_id != 0){
            $employees = $employees->where('positions.id', $request->position_id);
        }

        return response()->json([
            'code' => 1,
            'data' => [
                'employees' => $employees->orderBy('employees.id')->get()
            ]
        ]);
    }

    public function edit_employee_personal_details(Request $request){
        $validator = Validator::make($request->all(),[
            'employee_id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'position_id' => 'required|integer',
            'dob' => 'required|date',
            'joined_date' => 'required|date',
            'address1' => 'required',
            'address2' => 'nullable',
            'suburb' => 'required',
            'district' => 'required',
            'province' => 'required',
            'country' => 'required',
            'citizenship_country' => 'required',
            'maritial_status' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $employee = Employee::find($request->employee_id);
        $employee->first_name = $request->first_name;
        $employee->last_name = $request->last_name;
        $employee->position_id = $request->position_id;
        $employee->dob = $request->dob;
        $employee->joined_date = $request->joined_date;
        $employee->address1 = $request->address1;
        $employee->address2 = $request->address2;
        $employee->suburb = $request->suburb;
        $employee->district = $request->district;
        $employee->province = $request->province;
        $employee->country = $request->country;
        $employee->citizenship_country = $request->citizenship_country;
        $employee->phone = $request->phone;
        $employee->landline = $request->landline;
        $employee->maritial_status = $request->maritial_status;
        $employee->identity_number = $request->identity_number;
        $employee->passport_number = $request->passport_number;
        $employee->updated_by = Auth::guard('sanctum')->user()->id;
        $employee->save();

        return response()->json([
            'code' => 1,
            'message' => 'Employee updated successfully.'
        ]);
    }

    public function bankless_employees(Request $request){
        return response()->json([
            'code' => 1,
            'data' => [
                'employees' => Employee::select('employees.*')->leftJoin('employee_banks', 'employees.id', 'employee_banks.employee_id')->where('employee_banks.id', null)->orderBy('employees.id')->get()
            ]
        ]);
    }

    public function create_bank_details(Request $request){
        $validator = Validator::make($request->all(),[
            'employee_id' => 'required',
            'bank_code' => 'required',
            'bank_name' => 'required',
            'branch' => 'required',
            'account_number' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $existing_bank_details = EmployeeBank::where('employee_id', $request->employee_id)->get();

        if(count($existing_bank_details) > 0){
            return response()->json([
                'code' => 0,
                'message' => 'Employee bank details already exists.'
            ]);
        }

        $bank_details = new EmployeeBank();
        $bank_details->employee_id = $request->employee_id;
        $bank_details->bank_code = $request->bank_code;
        $bank_details->bank_name = $request->bank_name;
        $bank_details->branch = $request->branch;
        $bank_details->account_number = $request->account_number;
        $bank_details->created_by = Auth::guard('sanctum')->user()->id;
        $bank_details->save();

        return response()->json([
            'code' => 0,
            'message' => 'Employee bank details created successfully.'
        ]);
    }

    public function all_bank_details(Request $request){
        $bank_details =  Employee::select('employees.*', 'employee_banks.id as bank_id','employee_banks.bank_code', 'employee_banks.bank_name', 'employee_banks.branch', 'employee_banks.account_number', 'positions.name as position_name', 'departments.name as department_name')
                                ->leftJoin('positions', 'positions.id', 'employees.position_id')
                                ->leftJoin('departments', 'departments.id', 'positions.department_id')
                                ->leftJoin('employee_banks', 'employees.id', 'employee_banks.employee_id');

        if(isset($request->department_id) && $request->department_id != 0){
            $bank_details = $bank_details->where('positions.department_id', $request->department_id);
        }

        return response()->json([
            'code' => 1,
            'data' => [
                'employees' => $bank_details->orderBy('employees.id')->get()
            ]
        ]);
    }

    public function edit_bank_details(Request $request){
        $validator = Validator::make($request->all(),[
            'bank_details_id' => 'required',
            'bank_code' => 'required',
            'bank_name' => 'required',
            'branch' => 'required',
            'account_number' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $bank_details = EmployeeBank::find($request->bank_details_id);

        if(empty($bank_details)){
            return response()->json([
                'code' => 0,
                'message' => 'Employee bank details does not exists.'
            ]);
        }

        $bank_details->bank_code = $request->bank_code;
        $bank_details->bank_name = $request->bank_name;
        $bank_details->branch = $request->branch;
        $bank_details->account_number = $request->account_number;
        $bank_details->updated_by = Auth::guard('sanctum')->user()->id;
        $bank_details->save();

        return response()->json([
            'code' => 0,
            'message' => 'Employee bank details updated successfully.'
        ]);
    }
}
