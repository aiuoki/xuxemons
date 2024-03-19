<?php

namespace App\Http\Controllers;

use App\Models\Parametro;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Xuxemon;
use Illuminate\Support\Facades\DB;
use App\Models\Chuche;

class UserXuxemonController extends Controller
{
    public function asignarXuxemonAleatorio()
    {
        $tamanio = Parametro::find(1)->tamanio_xuxemon;
        if ($tamanio) {
            $usuarios = User::where('rol', 'usuario')->get();
            $xuxemons = Xuxemon::all();
        
            foreach ($usuarios as $usuario) {
                $xuxemonAleatorio = $xuxemons->random();
                $usuario->xuxemons()->attach($xuxemonAleatorio->id, ['tamanio' => $tamanio]);
            }
            return response()->json(['message' => 'Xuxemons asignados correctamente a usuarios con rol usuario']);
        } else {
            return response()->json(['message' => 'Parametro not found'], 404);
        }
    }

    public function obtenerXuxemonsDeUsuario($userId)
    {
        $usuario = User::find($userId);
        if ($usuario) {
            $xuxemons = $usuario->xuxemons()->get();
            return response()->json(['xuxemons' => $xuxemons]);
        } else {
            return response()->json(['message' => 'Usuario not found'], 404);
        }
    }

    public function obtenerXuxemonEspecificoDeUsuario($userId, $xuxemonId)
    {
        $usuario = User::find($userId);
        if ($usuario) {
            $xuxemon = $usuario->xuxemons()->find($xuxemonId);
            if ($xuxemon) {
                return response()->json(['xuxemon' => $xuxemon]);
            } else {
                return response()->json(['message' => 'Xuxemon not found'], 404);
            }
        } else {
            return response()->json(['message' => 'Usuario not found'], 404);
        }
    }

    public function alimentarXuxemonUsuario($mochilaChucheId, $userXuxemonId)
    {
        $mochilaChuche = DB::table('mochilas_chuches')->where('id', $mochilaChucheId)->first();
        $userXuxemon = DB::table('users_xuxemons')->where('id', $userXuxemonId)->first();

        if ($mochilaChuche->cantidad === 1) {
            DB::table('mochilas_chuches')->where('id', $mochilaChucheId)->delete();
        } else if ($mochilaChuche->cantidad > 1) {
            DB::table('mochilas_chuches')->where('id', $mochilaChucheId)->decrement('cantidad', 1);
        }

        $puntos = $userXuxemon->puntos + Chuche::find($mochilaChuche->chuche_id)->puntos;
        DB::table('users_xuxemons')->where('id', $userXuxemonId)->update(['puntos' => $puntos]);

        $parametro = Parametro::find(1);
        if ($puntos >= $parametro->puntos_grande) {
            DB::table('users_xuxemons')->where('id', $userXuxemonId)->update(['tamanio' => 'grande']);
        } else if ($puntos >= $parametro->puntos_mediano) {
            DB::table('users_xuxemons')->where('id', $userXuxemonId)->update(['tamanio' => 'mediano']);
        }

        return response()->json(['message' => 'Xuxemon alimentado correctamente']);
    }
}
