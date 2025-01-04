<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class PositionController extends Controller
{
    public function all(Request $request){
        $validator = Validator::make($request->all(),[
            'department_id' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $postions = [];

        if($request->department_id == 0){
            $postions = Position::select('positions.*', 'departments.name as department_name')
                                ->leftJoin('departments', 'departments.id', 'positions.department_id')
                                ->where('positions.status', 1)
                                ->orderBy('positions.id')
                                ->get();
        }else{
            $postions = Position::select('positions.*', 'departments.name as department_name')
                                ->leftJoin('departments', 'departments.id', 'positions.department_id')
                                ->where('department_id', $request->department_id)
                                ->where('positions.status', 1)
                                ->orderBy('positions.id')
                                ->get();
        }

        return response()->json([
            'code' => 1,
            'data' => [
                'positions' => $postions
            ]
        ]);
    }

    public function create(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'department_id' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        if($request->department_id != 0){
            $check_dep_exists = Department::find($request->department_id);
            if(empty($check_dep_exists)){
                return response()->json([
                    'code' => 0,
                    'message' => 'Department does not exist.'
                ]);
            }
        }

        if($request->department_id == 0){
            $request->department_id = null;
        }
        $check_pos_exists = Position::where('name',  $request->name)->where('department_id', $request->department_id)->first();
        if(!empty($check_pos_exists)){
            return response()->json([
                'code' => 0,
                'message' => 'Position already exists.'
            ]);
        }

        $position = new Position();
        $position->name = $request->name;
        $position->department_id = $request->department_id;
        $position->created_by = Auth::guard('sanctum')->user()->id;
        $position->updated_by = $position->created_by;
        $position->status = 1;
        $position->save();

        return response()->json([
            'code' => 1,
            'message' => 'Position created successfully.'
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

        $position = Position::find($request->id);
        if(empty($position)){
            return response()->json([
                'code' => 0,
                'message' => 'Position does not exist.'
            ]);
        }

        $position->name = $request->name;
        $position->status = $request->status;
        $position->updated_by = Auth::guard('sanctum')->user()->id;
        $position->save();

        if($request->status == 1){
            return response()->json([
                'code' => 1,
                'message' => 'Position updated successfully.'
            ]);
        }else{
            return response()->json([
                'code' => 1,
                'message' => 'Position deleted successfully.'
            ]);
        }
        
    }

    public function edit_budget(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'manning_budget' => 'numeric|nullable'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $position = Position::find($request->id);
        if(empty($position)){
            return response()->json([
                'code' => 0,
                'message' => 'Position does not exist.'
            ]);
        }

        $position->manning_budget = $request->manning_budget;
        $position->updated_by = Auth::guard('sanctum')->user()->id;
        $position->save();

        return response()->json([
            'code' => 1,
            'message' => 'Manning budget updated successfully.'
        ]);
        
    }
}
