<?php

namespace App\Http\Controllers;

use App\Models\Holiday;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class HolidayController extends Controller
{
    public function all(Request $request){
        $validator = Validator::make($request->all(),[
            'month' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $dates = [];

        if($request->month == 0){
            $dates = Holiday::all();
        }else{
            $dates = Holiday::whereMonth('date', $request->month)->get();
        }

        return response()->json([
            'code' => 1,
            'data' => [
                'holidays' => $dates
            ]
        ]);
    }

    public function create(Request $request){
        $validator = Validator::make($request->all(),[
            'date' => 'required|date',
            'reason' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $check_date_exists = Holiday::where('date', $request->date)->first();
        if(!empty($check_date_exists)){
            return response()->json([
                'code' => 0,
                'message' => 'Date already exists.'
            ]);
        }

        $holiday = new Holiday();
        $holiday->date = $request->date;
        $holiday->reason = $request->reason;
        $holiday->created_by = Auth::guard('sanctum')->user()->id;
        $holiday->updated_by = $holiday->created_by;
        $holiday->save();

        return response()->json([
            'code' => 1,
            'message' => 'Holiday created successfully.'
        ]);
    }

    public function edit(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'reason' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $day = Holiday::find($request->id);
        if(empty($day)){
            return response()->json([
                'code' => 0,
                'message' => 'Holiday does not exist.'
            ]);
        }

        $day->reason = $request->reason;
        $day->updated_by = Auth::guard('sanctum')->user()->id;
        $day->save();

        return response()->json([
            'code' => 1,
            'message' => 'Holiday updated successfully.'
        ]);
    }

    public function delete(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $day = Holiday::find($request->id);
        if(empty($day)){
            return response()->json([
                'code' => 0,
                'message' => 'Holiday does not exist.'
            ]);
        }else{
            $day->delete();
            return response()->json([
                'code' => 1,
                'message' => 'Holiday deleted successfully.'
            ]);
        }
    }
}
