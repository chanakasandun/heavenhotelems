<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends Controller
{
    public function all_user_roles(Request $request){
        return response()->json([
            'code' => 1,
            'data' => [
                'user_roles' => UserRole::orderBy('id')->get()
            ]
        ]);
    }

    public function create_user(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required', 
            'name' => 'required',
            'user_role' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $existingUser = User::where('email', $request->email)->first();
        if(!empty($existingUser)){
            return response()->json([
                'code' => 0,
                'message' => 'User already exist.'
            ]);
        }

        $user = new User();
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->name = $request->name;
        $user->password_reset_code = '';
        $user->role_id = $request->user_role;
        if(!empty($request->department_id) && $request->department_id != 0){
            $user->department_id = $request->department_id;
        }
        $user->created_by = Auth::guard('sanctum')->user()->id;
        $user->updated_by = $user->created_by;
        $user->save();

        return response()->json([
            'code' => 1,
            'message' => 'User created successfully.'
        ]);

    }

    public function all_users(Request $request){
        $users = User::select('users.*', 'departments.name as department_name', 'user_roles.name as role_name')
                    ->leftJoin('departments', 'departments.id', 'users.department_id')
                    ->leftJoin('user_roles', 'user_roles.id', 'users.role_id')
                    ->where('status', 1);

        if(isset($request->department_id) && $request->department_id != 0){
            $users = $users->where('departments.id', $request->department_id);
        }

        if(isset($request->role_id) && $request->role_id != 0){
            $users = $users->where('users.role_id', $request->role_id);
        }

        return response()->json([
            'code' => 1,
            'data' => [
                'users' =>  $users->orderBy('users.id')->get()
            ]
        ]);
    }

    public function edit_user(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'email' => 'required|email',
            'name' => 'required',
            'user_role' => 'required',
            'status' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $user = User::find($request->id);
        if(empty($user)){
            return response()->json([
                'code' => 0,
                'message' => 'User not exists.'
            ]);
        }

        $user->email = $request->email;
        $user->name = $request->name;
        $user->role_id = $request->user_role;
        $user->status = $request->status;
        $user->department_id = $request->department_id;
        $user->updated_by = Auth::guard('sanctum')->user()->id;
        $user->save();

        return response()->json([
            'code' => 1,
            'message' => 'User updated successfully.'
        ]);

    }

    public function reset_password(Request $request){
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }

        $user = User::find($request->id);
        if(empty($user)){
            return response()->json([
                'code' => 0,
                'message' => 'User not exists.'
            ]);
        }

        $user->password = Hash::make($request->password);
        $user->updated_by = Auth::guard('sanctum')->user()->id;
        $user->save();

        return response()->json([
            'code' => 1,
            'message' => 'Password reseted successfully.'
        ]);
    }

    public function all_logs(Request $request){
        $logs = AuditLog::select('audit_logs.*', 'users.name as user_name')
                            ->leftJoin('users', 'users.id', 'audit_logs.user_id');

        if(isset($request->user_id) && !empty($request->user_id)){
            $logs = $logs->where('users.id', $request->user_id);
        }

        if(isset($request->start_date) && !empty($request->start_date)){
            $logs = $logs->where('audit_logs.created_at', '>=' , $request->start_date);
        }

        if(isset($request->end_date) && !empty($request->end_date)){
            $logs = $logs->where('audit_logs.created_at', '<=' , $request->end_date . ' 23:59:59');
        }

        return response()->json([
            'code' => 1,
            'data' => [
                'logs' => $logs->orderBy('audit_logs.id')->get()
            ]
        ]);
    }
}
