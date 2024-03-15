<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chuches', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->string('archivo')->unique();
            $table->integer('puntos');
            $table->decimal('precio', $precision = 5, $scale = 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chuches');
    }
};
