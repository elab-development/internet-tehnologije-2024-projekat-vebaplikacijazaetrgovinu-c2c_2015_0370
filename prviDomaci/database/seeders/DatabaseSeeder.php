<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Product;
use App\Models\Review;
use App\Models\Order;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Kreiranje korisnika
        $user1 = User::create([
            'name' => 'Milan Jovanović',
            'email' => 'milan.jovanovic@example.com',
            'password' => Hash::make('password123'),
            'address' => 'Bulevar Kralja Aleksandra 25, Beograd',
            'phone_number' => '0611234567',
            'profile_picture' => 'https://example.com/profile1.jpg',
            'bio' => 'Ljubitelj tehnologije i online prodaje.',
        ]);

        $user2 = User::create([
            'name' => 'Ana Petrović',
            'email' => 'ana.petrovic@example.com',
            'password' => Hash::make('password123'),
            'address' => 'Njegoševa 12, Novi Sad',
            'phone_number' => '0647894561',
            'profile_picture' => 'https://example.com/profile2.jpg',
            'bio' => 'Voli da piše recenzije proizvoda.',
        ]);

        // Kreiranje proizvoda
        $product1 = Product::create([
            'name' => 'Laptop Dell Inspiron',
            'description' => 'Odličan laptop za svakodnevne poslove.',
            'price' => 85000.99,
            'stock' => 5,
            'category' => 'Elektronika',
            'image_url' => 'https://example.com/laptop.jpg',
            'status' => 'active',
            'user_id' => $user1->id,
        ]);

        $product2 = Product::create([
            'name' => 'Pametni telefon Samsung Galaxy',
            'description' => 'Pametni telefon visokih performansi.',
            'price' => 65000.50,
            'stock' => 3,
            'category' => 'Elektronika',
            'image_url' => 'https://example.com/phone.jpg',
            'status' => 'active',
            'user_id' => $user1->id,
        ]);

        $product3 = Product::create([
            'name' => 'Knjiga - Uvod u Laravel',
            'description' => 'Odlična knjiga za učenje Laravel framework-a.',
            'price' => 1500.00,
            'stock' => 20,
            'category' => 'Knjige',
            'image_url' => 'https://example.com/book.jpg',
            'status' => 'active',
            'user_id' => $user2->id,
        ]);

        // Kreiranje recenzija
        Review::create([
            'rating' => 5,
            'comment' => 'Odličan laptop, radi brzo i pouzdano.',
            'user_id' => $user2->id,
            'product_id' => $product1->id,
        ]);

        Review::create([
            'rating' => 4,
            'comment' => 'Telefon ima odlične performanse, ali je baterija mogla biti bolja.',
            'user_id' => $user2->id,
            'product_id' => $product2->id,
        ]);

        Review::create([
            'rating' => 5,
            'comment' => 'Knjiga je sjajna za početnike!',
            'user_id' => $user1->id,
            'product_id' => $product3->id,
        ]);

        // Kreiranje porudžbina
        Order::create([
            'order_date' => now(),
            'total_price' => 85000.99,
            'status' => 'completed',
            'user_id' => $user2->id,
            'product_id' => $product1->id,
        ]);

        Order::create([
            'order_date' => now(),
            'total_price' => 1500.00,
            'status' => 'completed',
            'user_id' => $user1->id,
            'product_id' => $product3->id,
        ]);
    }
}
