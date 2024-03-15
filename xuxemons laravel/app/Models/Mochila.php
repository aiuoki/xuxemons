<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mochila extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'monedas',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function chuches()
    {
        return $this->belongsToMany(Chuche::class, 'mochilas_chuches')->withPivot('cantidad');
    }
}
