<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class XuxemonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('data/xuxemons.json');

        if (File::exists($jsonPath)) {
            $jsonData = File::get($jsonPath);
            $xuxemons = json_decode($jsonData, true);

            foreach ($xuxemons as $xuxemon) {
                DB::table('xuxemons')->insert([
                    'nombre' => $xuxemon['nombre'],
                    'tipo' => $xuxemon['tipo'],
                    'archivo' => $xuxemon['archivo']
                ]);
            }
        } else {
            echo "El archivo JSON no existe.";
        }
    }
}
