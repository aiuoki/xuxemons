<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Datos de prueba
        $nombres = ['Administrador', 'Usuario'];
        $descripciones = ['Usuario Administrador', 'Usuario normal'];

        for ($i=0; $i < 2; $i++) {
            //inserta roles con los datos de prueba
            DB::table('roles')->insert([
                'nombre' => $nombres[$i],
                'descripcion' => $descripciones[$i]
            ]);
        }
    }
}
