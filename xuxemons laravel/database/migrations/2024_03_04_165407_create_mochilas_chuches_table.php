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
            $table->unsignedBigInteger('id_mochila');
            $table->unsignedBigInteger('id_chuche');
            $table->integer('cantidad');
            $table->timestamps();

            $table->foreign('id_mochila')->references('id')->on('mochilas')->onDelete('cascade');
            $table->foreign('id_chuche')->references('id')->on('chuches')->onDelete('cascade');
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
