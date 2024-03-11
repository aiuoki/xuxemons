<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'nombre' => 'required',
            'apellidos' => 'required',
            'nick' => 'required',
            'email' => 'required',
            'password' => 'required',
            'rol' => 'sometimes',
        ]);

        $user = User::create($data);

        // seleccionamos el usuario recien creado
        $usuario = User::where('nick', $data['nick'])->first();

        // y le creamos una mochila
        $mochila = new MochilaController();
        $mochila->create($usuario);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Bearer'], 201);
    }

    public function login(Request $request) {
        if(!Auth::attempt($request->only('email', 'password'))) {
            return response(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['accessToken' => $token, 'token_type' => 'Bearer', 'user' => $user], 201);
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return ['message' => 'Logged out'];
    }
}
