<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chuche extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'archivo',
        'puntos',
        'precio',
    ];

    public function mochilas()
    {
        return $this->belongsToMany(Mochila::class, 'mochilas_chuches')->withPivot('cantidad');
    }
}
