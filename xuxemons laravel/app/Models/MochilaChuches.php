<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MochilaChuches extends Model
{
    use HasFactory;

    protected $table = 'mochilas_chuches';

    protected $fillable = [
        'id_mochila',
        'id_chuche',
        'cantidad',
    ];
}
