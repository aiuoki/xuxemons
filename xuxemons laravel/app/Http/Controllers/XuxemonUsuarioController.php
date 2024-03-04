<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Xuxemon;
use App\Models\XuxemonUsuario;

class XuxemonUsuarioController extends Controller
{
    public function xuxemonAleatorio() {
        // Reccoremos la lista de usuarios con rol de usuario
        foreach (User::all() as $usuario) {
            if ($usuario->rol == 'usuario') {
                // Seleccionamos un id aleatorio de la lista de xuxemons
                $xuxemon = Xuxemon::inRandomOrder()->first();

                // Asignamos el xuxemon aleatorio al usuario
                XuxemonUsuario::create([
                    'id_usuario' => $usuario->id,
                    'id_xuxemon' => $xuxemon->id
                ]);

                // Devolvemos un mensaje de éxito
                return response()->json(['message' => 'Xuxemon asignado correctamente'], 200);
            }
        }
    }
}
