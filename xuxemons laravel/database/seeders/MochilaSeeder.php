<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MochilaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mochila de usuario 1
        DB::table('mochilas')->insert([
            'id_usuario' => 2,
            'monedas' => 100,
        ]);
    }
}
