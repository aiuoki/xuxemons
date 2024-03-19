<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParametroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('parametros')->insert([
            'tamanio_xuxemon' =>  'pequenio',
            'puntos_mediano' => 3,
            'puntos_grande' => 5
        ]);
    }
}
