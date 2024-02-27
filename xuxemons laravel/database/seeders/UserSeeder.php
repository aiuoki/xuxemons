<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Datos de prueba
        $nombres = ['Admin', 'Daniel'];
        $apellidos = ['', 'Ceban'];
        $nicks = ['admin', 'dan'];
        $emails = ['admin@mail.com', 'dan@mail.com'];

        for ($i=0; $i < 2; $i++) {
            //inserta dos usuarios con los datos de prueba
            DB::table('users')->insert([
                'nombre' => $nombres[$i],
                'apellidos' => $apellidos[$i],
                'nick' => $nicks[$i],
                'email' => $emails[$i],
                'password' => '$2y$12$flVhDBA.hvTjkZI.9xg1SuOI6eaz2.gBDnECuw5TX3bzMZnI5vYye'
            ]);
        }
    }
}
