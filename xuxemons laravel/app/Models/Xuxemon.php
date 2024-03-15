<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Xuxemon extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'nombre',
        'tipo',
        'archivo',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_xuxemons')->withPivot('tamanio');
    }
}
