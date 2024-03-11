<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
use App\Models\Mochila;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MochilaController extends Controller
{
    public function create(User $user) {
        try {
            $id = $user->id;
            $rol = $user->rol;

            if ($rol == 'usuario') {
                Mochila::create([
                    'id_usuario' => $id,
                    'monedas' => 0,
                ]);
            }

            return response()->json(['message' => 'Mochila creada correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Mochila no creada'], 404);
        }
    }
=======
use Illuminate\Http\Request;

class MochilaController extends Controller
{
    //
>>>>>>> 346b5399a2370b218266d28e284b7ea67dc4a406
}
