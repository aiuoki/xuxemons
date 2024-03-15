<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'nick' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string',
            'rol' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = $validator->validated();
        $user = User::create($data);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string',
                'apellidos' => 'required|string',
                'nick' => 'required|string|unique:users,'.$user->id,
                'email' => 'required|email|unique:users,'.$user->id,
                'password' => 'required|string',
                'rol' => 'sometimes|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $data = $validator->validated();
            $user->update($data);

            return response()->json(['message' => 'User updated successfully', 'user' => $user]);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function checkNickAvailability(Request $request)
    {
        $nick = $request->input('nick');
        $exists = User::where('nick', $nick)->exists();
        return response()->json(['exists' => $exists], 200);
    }

    public function checkEmailAvailability(Request $request)
    {
        $email = $request->input('email');
        $exists = User::where('email', $email)->exists();
        return response()->json(['exists' => $exists], 200);
    }
}
