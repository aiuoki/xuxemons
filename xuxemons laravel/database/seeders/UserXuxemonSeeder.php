<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserXuxemonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $xuxemons = [1, 1, 1, 2];
        $tamanios = ['pequenio', 'mediano', 'grande', 'pequenio'];
        $puntos = [2, 4, 5, 0];

        for ($i=0; $i < 4; $i++) {
            DB::table('users_xuxemons')->insert([
                'user_id' => 2,
                'xuxemon_id' => $xuxemons[$i],
                'tamanio' => $tamanios[$i],
                'puntos' => $puntos[$i],
            ]);
        }
    }
}
