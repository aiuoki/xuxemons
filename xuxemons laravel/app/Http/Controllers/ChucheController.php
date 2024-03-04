<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chuche;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ChucheController extends Controller
{
    public function index() {
        $chuches = Chuche::all();
        return response()->json($chuches, 200);
    }

    public function show($id) {
        try {
            $chuche = Chuche::findOrFail($id);
            return response()->json($chuche, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Chuche no encontrada'], 404);
        }
    }

    public function store(Request $request) {
        try {
            $data = $request->validate([
                'nombre' => 'required',
                'archivo' => 'required',
                'puntos' => 'required',
                'precio' => 'required',
            ]);

            $chuche = Chuche::create($data);
            return response()->json(['message' => 'Chuche creada correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Chuche no insertada'], 404);
        }
    }

    public function update(Request $request, $id) {
        try {
            $data = $request->validate([
                'nombre' => 'required',
                'archivo' => 'required',
                'puntos' => 'required',
                'precio' => 'required',
            ]);
    
            $chuche = Chuche::findOrFail($id);
            $chuche->update($data);
    
            return response()->json(['xuxemon' => $chuche, 'message' => 'Chuche actualizada correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Chuche no actualizada'], 404);
        }
    }

    public function destroy($id) {
        $chuche = Chuche::findOrFail($id);
        $chuche->delete();
        return response()->json(['message' => 'Chuche eliminada correctamente'], 200);
    }
}
