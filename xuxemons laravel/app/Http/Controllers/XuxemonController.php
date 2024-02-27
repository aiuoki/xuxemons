<?php

namespace App\Http\Controllers;

use App\Models\RolesUsuario;
use Illuminate\Http\Request;
use App\Models\Xuxemon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\XuxemonsUsuario;

class XuxemonController extends Controller
{
    public function index() {
        $xuxemons = Xuxemon::all();
        return response()->json($xuxemons, 200);
    }

    public function show($id) {
        try {
            $xuxemon = Xuxemon::findOrFail($id);
            return response()->json($xuxemon, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Xuxémon no encontrado'], 404);
        }
    }

    public function store(Request $request) {
        try {
            $data = $request->validate([
                'nombre' => 'required',
                'tipo' => 'required|in:agua,aire,tierra',
                'archivo' => 'required',
            ]);

            $xuxemon = Xuxemon::create($data);
            return response()->json(['message' => 'Xuxémon creado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Xuxémon no insertado'], 404);
        }
    }

    public function update(Request $request, $id) {
        try {
            $data = $request->validate([
                'nombre' => 'required',
                'tipo' => 'required',
                'archivo' => 'required',
            ]);
    
            $xuxemon = Xuxemon::findOrFail($id);
            $xuxemon->update($data);
    
            return response()->json(['xuxemon' => $xuxemon, 'message' => 'Xuxémon actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Xuxémon no actualizado'], 404);
        }
    }

    public function destroy($id) {
        $xuxemon = Xuxemon::findOrFail($id);
        $xuxemon->delete();
        return response()->json(['message' => 'Xuxémon eliminado correctamente'], 200);
    }

    public function xuxemonAleatorio() {
        // Seleccionamos todos los id's de los usuarios con rol de usuario
        $usuario = [];
        foreach (RolesUsuario::all() as $usuario) {
            if ($usuario->id_rol == 2) {
                $usuario[] = $usuario->id_usuario;
            }
        }

        // Reccoremos la lista de usuarios con rol de usuario
        foreach ($usuario as $id) {
            // Seleccionamos un id aleatorio de la lista de xuxemons
            $xuxemon = Xuxemon::inRandomOrder()->first();

            // Asignamos el xuxemon aleatorio al usuario
            //XuxemonsUsuario::create();
        }
    }
}
