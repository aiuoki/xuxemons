<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XuxemonUsuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_usuario',
        'id_xuxemon',
    ];
}
