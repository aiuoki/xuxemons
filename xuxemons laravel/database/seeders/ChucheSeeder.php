<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ChucheSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('data/chuches.json');

        if (File::exists($jsonPath)) {
            $jsonData = File::get($jsonPath);
            $chuches = json_decode($jsonData, true);

            foreach ($chuches as $chuche) {
                DB::table('chuches')->insert([
                    'nombre' => $chuche['nombre'],
                    'archivo' => $chuche['archivo'],
                    'puntos' => $chuche['puntos'],
                    'precio' => $chuche['precio']
                ]);
            }
        } else {
            echo "El archivo JSON no existe.";
        }
    }
}
