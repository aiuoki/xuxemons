<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthController extends Controller
{
    public function auth(Request $request) {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);
    
            $user = User::where('email', $credentials['email'])->first();
    
            if($user && password_verify($credentials['password'], $user->password)) {
                Auth::login($user);
                return response()->json(true, 200);
            } else {
                return response()->json(false, 200);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(false, 200);
        }
    }

    public function logout() {
        try {
            Auth::logout();
            return response()->json(['message' => 'Usuario deslogueado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Error al desloguear el usuario'], 404);
        }
    }
}
