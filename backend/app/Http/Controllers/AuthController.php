<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request){

        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required', 
        ]);

        if($validator->fails()){
            return response()->json([
                'code' => 0,
                'message' => $validator->errors()->first()
            ]);
        }
     
        $user = User::where('email', $request->email)->first(); 
     
        if (! $user || ! Hash::check($request->password, $user->password)) {
            if(isset($user->status) && $user->status == 0){
                return response()->json([
                    'code' => 0,
                    'message' => 'User account blocked, please contact administrator'
                ]);
            } 
            return response()->json([
                'code' => 0,
                'message' => 'Invalid credentials.'
            ]);
        }
     
        $audit = new AuditLog();
        $audit->user_id = $user->id;
        $audit->log = "User logged in into the system";
        $audit->save();
        
        return response()->json([
            'code' => 1,
            'role' => $user->role->id,
            'role_name' => $user->role->name,
            'department' => $user->department->id ?? null,
            'department_name' => $user->department->name ?? null,
            'user_name' => $user->name,
            'token' => $user->createToken('eLearning')->plainTextToken
        ]); 
    }

    public function logout(Request $request){ 
        $user = Auth::guard('sanctum')->user(); 
        if ($user) {
            $user->currentAccessToken()->delete();
            return response()->json([
                'code' => 1,
                'message' => 'Logged out successfully'
            ]);
        } 
        return response()->json([
            'code' => 1,
            'message' => 'Unauthorized'
        ]); 
    }
}
