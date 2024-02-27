<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 2; $i++) {
            DB::table('roles_usuario')->insert([
                'id_usuario' => $i+1,
                'id_rol' => $i+1
            ]);
        }
    }
}
