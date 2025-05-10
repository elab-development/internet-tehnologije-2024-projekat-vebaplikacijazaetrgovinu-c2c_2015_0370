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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->dateTime('order_date'); // Datum i vreme narudžbine
            $table->decimal('total_price', 10, 2); // Ukupna cena narudžbine
            $table->enum('status', ['pending', 'completed', 'canceled'])->default('pending'); // Status narudžbine
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
        Schema::dropIfExists('orders');
    }
};
