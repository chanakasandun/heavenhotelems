<?php

namespace App\Http\Controllers;

use App\Models\PositionLeaveType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
class PositionLeaveTypeController extends Controller
{
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            "position_id" => 'required|integer',
            "leave_type_id" => 'required|integer'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $check_leave_exists = PositionLeaveType::where('position_id',  $request->position_id)
                                                ->where('leave_type_id', $request->leave_type_id)->first();

        if(!empty($check_leave_exists)){
            return response()->json([
                'code' => 0,
                'message' => 'Position leave type already exists.'
            ]);
        }

        $leave = new PositionLeaveType();
        $leave->position_id = $request->position_id;
        $leave->leave_type_id = $request->leave_type_id;
        $leave->created_by = Auth::guard('sanctum')->user()->id;
        $leave->save();

        return response()->json([
            'code' => 1,
            'message' => 'Leave type created successfully.'
        ]);
    }  
    
    public function all(Request $request){
        $position_leave_types = PositionLeaveType::select('position_leave_types.*', 'positions.name as position_name', 'leave_types.name as leave_type_name', 'departments.name as department_name')
                                                    ->leftJoin('positions', 'positions.id', 'position_leave_types.position_id')
                                                    ->leftJoin('leave_types', 'leave_types.id', 'position_leave_types.leave_type_id')
                                                    ->leftJoin('departments', 'departments.id', 'positions.department_id');

        if(isset($request->department_id) && $request->department_id != 0){
            $position_leave_types = $position_leave_types->where('departments.id', $request->department_id);
        }

        if(isset($request->position_id) && $request->position_id != 0){
            $position_leave_types = $position_leave_types->where('positions.id', $request->position_id);
        }

        return response()->json([
            'code' => 1,
            'data' => [
                'position_leave_types' =>  $position_leave_types->get()
            ]
        ]);
    }

    public function delete(Request $request){
        $validator = Validator::make($request->all(), [
            "position_id" => 'required|integer',
            "leave_type_id" => 'required|integer'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $position_leave_type = PositionLeaveType::where('position_id',  $request->position_id)
                                                ->where('leave_type_id', $request->leave_type_id)->first();

        if(empty($position_leave_type)){
            return response()->json([
                'code' => 0,
                'message' => 'Position leave type not exists.'
            ]);
        }

        PositionLeaveType::where('position_id',  $request->position_id)
                          ->where('leave_type_id', $request->leave_type_id)->delete();

        return response()->json([
            'code' => 0,
            'message' => 'Position leave type deleted successfully.'
        ]);
    }
}
