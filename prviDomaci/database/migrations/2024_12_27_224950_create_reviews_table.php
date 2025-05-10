<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('rating'); // Ocena (1-5)
            $table->text('comment')->nullable(); // Komentar (opciono)
            $table->unsignedBigInteger('user_id'); // Spoljni ključ za korisnika
            $table->unsignedBigInteger('product_id'); // Spoljni ključ za proizvod
            $table->timestamps(); // created_at i updated_at kolone

            // Definisanje spoljnih ključeva
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
