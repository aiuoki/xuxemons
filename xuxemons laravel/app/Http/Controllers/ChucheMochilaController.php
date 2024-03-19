<?php

namespace App\Http\Controllers;

use App\Models\Chuche;
use App\Models\Mochila;
use Illuminate\Http\Request;

class ChucheMochilaController extends Controller
{
    public function asignarChucheAleatoria()
    {
        $mochilas = Mochila::all();
        $chuches = Chuche::all();
    
        foreach ($mochilas as $mochila) {
            $chucheAleatoria = $chuches->random();
            $chucheExistente = $mochila->chuches()->find($chucheAleatoria->id);
    
            if ($chucheExistente) {
                $cantidadActual = $chucheExistente->pivot->cantidad;
                $mochila->chuches()->updateExistingPivot($chucheAleatoria->id, ['cantidad' => $cantidadActual + 1]);
            } else {
                $mochila->chuches()->attach($chucheAleatoria->id, ['cantidad' => 1]);
            }
        }
        return response()->json(['message' => 'Chuches asignadas correctamente a las mochilas']);
    }

    public function obtenerChuchesDeMochila($userId)
    {
        $mochila = Mochila::where('user_id', $userId)->first();
        if ($mochila) {
            $chuches = $mochila->chuches()->get();
            return response()->json(['chuches' => $chuches]);
        } else {
            return response()->json(['message' => 'Mochila not found'], 404);
        }
    }

    public function obtenerChucheEspecificaDeMochila($userId, $chucheId)
    {
        $mochila = Mochila::where('user_id', $userId)->first();
        if ($mochila) {
            $chuche = $mochila->chuches()->find($chucheId);
            if ($chuche) {
                return response()->json(['chuche' => $chuche]);
            } else {
                return response()->json(['message' => 'Chuche not found'], 404);
            }
        } else {
            return response()->json(['message' => 'Mochila not found'], 404);
        }
    }
}
