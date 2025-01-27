<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\ReviewController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

 
Route::get('/products/{id}', [ProductController::class, 'show']); //vraca sve detalje o pojedinacnom proizvodu kao i prosecnu ocenu, dodato za react domaci

Route::get('/products/user/{user_id}', [ProductController::class, 'getProductsByUserId']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/reviews/{id}', [ReviewController::class, 'show']);
 
  Route::get('/reviews/user/{user_id}', [ReviewController::class, 'getReviewsByUser']);
  Route::get('/reviews/product/{product_id}', [ReviewController::class, 'getReviewsByProduct']);

Route::middleware('auth:sanctum')->group(function () {
  
    Route::post('/products', [ProductController::class, 'store']);   
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
 
       
    Route::post('/reviews', [ReviewController::class, 'store']);   
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

    Route::get('/my-products', [ProductController::class, 'getMyProducts']);  //vraca sve proizvode koje je kreirao ulogovani korisnik
    Route::apiResource('orders', OrderController::class);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

