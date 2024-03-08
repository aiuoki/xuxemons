<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Parametro;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ParametroController extends Controller
{
    public function show($id) {
        try {
            $parametros = Parametro::findOrFail($id);
            return response()->json($parametros, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Parametros no encontrados.'], 404);
        }
    }

    public function update(Request $request, $id) {
        try {
            $data = $request->validate([
                'tamanio_xuxemon' => 'required|string',
                'caramelos_mediano' => 'required|integer',
                'caramelos_grande' => 'required|integer',
            ]);
    
            $parametros = Parametro::findOrFail($id);
            $parametros->update($data);
    
            return response()->json(['parametros' => $parametros, 'message' => 'Parametros actualizados correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Parametros no actualizados'], 404);
        }
    }
}
