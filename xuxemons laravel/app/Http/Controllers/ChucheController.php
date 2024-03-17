<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chuche;
use Illuminate\Support\Facades\Validator;

class ChucheController extends Controller
{
    public function index()
    {
        $chuches = Chuche::all();
        return response()->json($chuches);
    }

    public function show($id)
    {
        $chuche = Chuche::find($id);
        if ($chuche) {
            return response()->json($chuche);
        } else {
            return response()->json(['message' => 'Chuche not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|unique:chuches',
            'archivo' => 'required|string|unique:chuches',
            'puntos' => 'required|integer|min:1',
            'precio' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = $validator->validated();
        $chuche = Chuche::create($data);

        return response()->json(['message' => 'Chuche created successfully', 'chuche' => $chuche], 201);
    }

    public function update(Request $request, $id)
    {
        $chuche = Chuche::find($id);
        if ($chuche) {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|unique:chuches,nombre,'.$chuche->id,
                'archivo' => 'required|string|unique:chuches,archivo,'.$chuche->id,
                'puntos' => 'required|integer|min:1',
                'precio' => 'required|integer|min:1',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $data = $validator->validated();
            $chuche->update($data);

            return response()->json(['message' => 'Chuche updated successfully', 'chuche' => $chuche]);
        } else {
            return response()->json(['message' => 'Chuche not found'], 404);
        }
    }

    public function destroy($id)
    {
        $chuche = Chuche::find($id);
        if ($chuche) {
            $chuche->delete();
            return response()->json(['message' => 'Chuche deleted successfully']);
        } else {
            return response()->json(['message' => 'Chuche not found'], 404);
        }
    }

    public function checkNombreAvailability(Request $request)
    {
        $nombre = $request->input('nombre');
        $exists = Chuche::where('nombre', $nombre)->exists();
        return response()->json(['exists' => $exists], 200);
    }

    public function checkArchivoAvailability(Request $request)
    {
        $archivo = $request->input('archivo');
        $exists = Chuche::where('archivo', $archivo)->exists();
        return response()->json(['exists' => $exists], 200);
    }
}
