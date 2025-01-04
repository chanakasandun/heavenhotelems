<?php

namespace App\Http\Controllers;

use App\Models\LeaveType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class LeaveTypeController extends Controller
{
    public function all(Request $request){
        return response()->json([
            'code' => 1,
            'data' => [
                'leave_types' => LeaveType::orderBy('id')->whereIn('status', [1,0])->get()
            ]
        ]);
    }

    public function create(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $check_leave_exists = LeaveType::where('name',  $request->name)->first();
        if(!empty($check_leave_exists)){
            return response()->json([
                'code' => 0,
                'message' => 'Leave type already exists.'
            ]);
        }

        $leave = new LeaveType();
        $leave->name = $request->name;
        $leave->status = 1;
        $leave->created_by = Auth::guard('sanctum')->user()->id;
        $leave->updated_by = $leave->created_by;
        $leave->save();

        return response()->json([
            'code' => 1,
            'message' => 'Leave type created successfully.'
        ]);
    }

    public function edit(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'name' => 'required',
            'status' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $leave = LeaveType::find($request->id);
        if(empty($leave)){
            return response()->json([
                'code' => 0,
                'message' => 'Leave type does not exist.'
            ]);
        }

        $leave->name = $request->name;
        $leave->status = $request->status;
        $leave->updated_by = Auth::guard('sanctum')->user()->id;
        $leave->save();

        if($request->status == 2){
            return response()->json([
                'code' => 1,
                'message' => 'Leave type deleted successfully.'
            ]);
        }else{
            return response()->json([
                'code' => 1,
                'message' => 'Leave type updated successfully.'
            ]);
        }   
    }
}
