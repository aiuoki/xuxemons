<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class XuxemonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // datos de prueba
        $nombres = ['Bambino', 'Flipper', 'Beebo', 'Cabrales', 'Eldientes'];
        $tipos = ['tierra', 'agua', 'aire', 'tierra', 'agua'];
        $archivos = ['bambino.png', 'flipper.png', 'beebo.png', 'cabrales.png', 'eldientes.png'];

        for ($i=0; $i < 5; $i++) {
            // inserta xuxemons con los datos de prueba
            DB::table('xuxemons')->insert([
                'nombre' => $nombres[$i],
                'tipo' => $tipos[$i],
                'archivo' => $archivos[$i]
            ]);
        }
    }
}
