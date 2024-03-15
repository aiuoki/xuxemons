<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Xuxemon;
use Illuminate\Support\Facades\Validator;

class XuxemonController extends Controller
{
    public function index()
    {
        $xuxemons = Xuxemon::all();
        return response()->json($xuxemons);
    }

    public function show($id)
    {
        $xuxemon = Xuxemon::find($id);
        if ($xuxemon) {
            return response()->json($xuxemon);
        } else {
            return response()->json(['message' => 'Xuxemon not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|unique:xuxemons',
            'tipo' => 'required|string',
            'archivo' => 'required|string|unique:xuxemons',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = $validator->validated();
        $xuxemon = Xuxemon::create($data);

        return response()->json(['message' => 'Xuxemon created successfully', 'xuxemon' => $xuxemon], 201);
    }

    public function update(Request $request, $id)
    {
        $xuxemon = Xuxemon::find($id);
        if ($xuxemon) {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|unique:xuxemons,nombre,'.$xuxemon->id,
                'tipo' => 'required|string',
                'archivo' => 'required|string|unique:xuxemons,archivo,'.$xuxemon->id,
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $data = $validator->validated();
            $xuxemon->update($data);

            return response()->json(['message' => 'Xuxemon updated successfully', 'xuxemon' => $xuxemon]);
        } else {
            return response()->json(['message' => 'Xuxemon not found'], 404);
        }
    }

    public function destroy($id)
    {
        $xuxemon = Xuxemon::find($id);
        if ($xuxemon) {
            $xuxemon->delete();
            return response()->json(['message' => 'Xuxemon deleted successfully']);
        } else {
            return response()->json(['message' => 'Xuxemon not found'], 404);
        }
    }

    public function checkNombreAvailability(Request $request)
    {
        $nombre = $request->input('nombre');
        $exists = Xuxemon::where('nombre', $nombre)->exists();
        return response()->json(['exists' => $exists], 200);
    }

    public function checkArchivoAvailability(Request $request)
    {
        $archivo = $request->input('archivo');
        $exists = Xuxemon::where('archivo', $archivo)->exists();
        return response()->json(['exists' => $exists], 200);
    }
}
