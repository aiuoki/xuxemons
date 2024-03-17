<?php

namespace App\Http\Controllers;

use App\Models\Mochila;
use Illuminate\Http\Request;

class MochilaController extends Controller
{
    public function show($user_id)
    {
        $mochila = Mochila::where('user_id', $user_id)->first();
        if ($mochila) {
            return response()->json($mochila);
        } else {
            return response()->json(['message' => 'Mochila not found'], 404);
        }
    }
}
