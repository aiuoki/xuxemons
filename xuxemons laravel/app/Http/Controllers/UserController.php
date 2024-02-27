<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function show($id) {
        try {
            $user = User::findOrFail($id);
            return response()->json($user, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    }

    public function store(Request $request) {
        try {
            $data = $request->validate([
                'nombre' => 'required',
                'apellidos' => 'required',
                'nick' => 'required',
                'email' => 'required',
                'password' => 'required',
                'rol' => 'sometimes',
            ]);

            if(!isset($data['rol'])) {
                $data['rol'] = 'usuario';
            }

            $user = User::create($data);
            return response()->json(['message' => 'Usuario creado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no insertado'], 404);
        }
    }

    public function update(Request $request, $id) {
        try {
            $data = $request->validate([
                'nombre' => 'required',
                'apellidos' => 'required',
                'nick' => 'required',
                'email' => 'required',
                'password' => 'required',
                'rol' => 'required',
            ]);
    
            $user = User::findOrFail($id);
            $user->update($data);
    
            return response()->json(['User' => $user, 'message' => 'Usuario actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no actualizado'], 404);
        }
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }
}
