<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParametrosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Parametros
        DB::table('parametros')->insert([
            'tamanio_xuxemon' => 'pequenio',
            'caramelos_mediano' => 3,
            'caramelos_grande' => 5,
        ]);
    }
}
