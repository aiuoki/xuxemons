<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XuxemonUsuario extends Model
{
    use HasFactory;

    protected $table = 'xuxemons_usuarios';

    protected $fillable = [
        'id_usuario',
        'id_xuxemon',
    ];
}
