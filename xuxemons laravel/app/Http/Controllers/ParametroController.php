<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Parametro;
use Illuminate\Support\Facades\Validator;

class ParametroController extends Controller
{
    public function index()
    {
        $parametro = Parametro::find(1);
        if ($parametro) {
            return response()->json($parametro);
        } else {
            return response()->json(['message' => 'Parametro not found'], 404);
        }
    }

    public function update(Request $request)
    {
        $parametro = Parametro::find(1);
        if ($parametro) {
            $validator = Validator::make($request->all(), [
                'tamanio_xuxemon' => 'string',
                'caramelos_mediano' => 'integer',
                'caramelos_grande' => 'integer',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $data = $validator->validated();
            $parametro->update($data);

            return response()->json(['message' => 'Parametro updated successfully', 'parametro' => $parametro]);
        } else {
            return response()->json(['message' => 'Parametro not found'], 404);
        }
    }
}
