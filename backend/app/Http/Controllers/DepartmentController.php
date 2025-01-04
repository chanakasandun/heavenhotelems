<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class DepartmentController extends Controller
{
    public function all(Request $request){
        return response()->json([
            'code' => 1,
            'data' => [
                'departments' => Department::orderBy('id')->get()
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

        $check_dep_exists = Department::where('name',  $request->name)->first();
        if(!empty($check_dep_exists)){
            return response()->json([
                'code' => 0,
                'message' => 'Department already exists.'
            ]);
        }

        $department = new Department();
        $department->name = $request->name;
        $department->created_by = Auth::guard('sanctum')->user()->id;
        $department->updated_by = $department->created_by;
        $department->save();

        return response()->json([
            'code' => 1,
            'message' => 'Department created successfully.'
        ]);
    }

    public function edit(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'name' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $department = Department::find($request->id);
        if(empty($department)){
            return response()->json([
                'code' => 0,
                'message' => 'Department does not exist.'
            ]);
        }

        $department->name = $request->name;
        $department->updated_by = Auth::guard('sanctum')->user()->id;
        $department->save();

        return response()->json([
            'code' => 1,
            'message' => 'Department updated successfully.'
        ]);
    }
}
