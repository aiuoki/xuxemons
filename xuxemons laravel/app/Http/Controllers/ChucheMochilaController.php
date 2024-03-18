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
    public function AlimentarXuxemon($id_mochila_chuche, $id_user_xuxemon){
    
        $mochilaChuche = Mochila::whereHas('chuches', function($query) use ($id_mochila_chuche) {
            $query->where('chuches.id', $id_mochila_chuche);
        })->with(['chuches' => function($query) use ($id_mochila_chuche) {
            $query->where('chuches.id', $id_mochila_chuche)->select('puntos');
        }])->first();
    
        $userXuxemon = User::whereHas('xuxemons', function($query) use ($id_user_xuxemon) {
            $query->where('xuxemons.id', $id_user_xuxemon);
        })->first();
    
        if ($mochilaChuche && $mochilaChuche->chuches->isNotEmpty()) {
            $puntos = $mochilaChuche->chuches->first()->puntos;
        } else {
            $puntos = 0; // Asumir 0 si no se encuentra la chuche específica
        }
    
        // Actualizar puntos en users_xuxemons
        if ($userXuxemon && $userXuxemon->xuxemons->isNotEmpty()) {
            $xuxemon = $userXuxemon->xuxemons->where('id', $id_user_xuxemon)->first();
            $xuxemon->pivot->puntos += $puntos;
            $xuxemon->pivot->save();
        }

        // Restar cantidad en mochilas_chuches y eliminar si llega a 0
        if ($mochilaChuche && $mochilaChuche->chuches->isNotEmpty()) {
            $chuche = $mochilaChuche->chuches->where('id', $id_mochila_chuche)->first();
            $cantidadActual = $chuche->pivot->cantidad - 1;
            if ($cantidadActual > 0) {
                $mochilaChuche->chuches()->updateExistingPivot($id_mochila_chuche, ['cantidad' => $cantidadActual]);
            } else {
                $mochilaChuche->chuches()->detach($id_mochila_chuche);
            }
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
