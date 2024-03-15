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
        Schema::create('mochilas_chuches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mochila_id')->constrained('mochilas')->onDelete('cascade');
            $table->foreignId('chuche_id')->constrained('chuches')->onDelete('cascade');
            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mochilas_chuches');
    }
};
