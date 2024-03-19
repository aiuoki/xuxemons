<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MochilaChucheSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $chuches = [1, 5, 8, 10];
        $cantidades = [3, 2, 2, 1];

        for ($i=0; $i < 4; $i++) {
            DB::table('mochilas_chuches')->insert([
                'mochila_id' => 1,
                'chuche_id' => $chuches[$i],
                'cantidad' => $cantidades[$i],
            ]);
        }
    }
}
