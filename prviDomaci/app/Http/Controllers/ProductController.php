<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'category' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category' => $request->category,
            'image_url' => $request->image_url,
            'status' => $request->status,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'Product created successfully.', 'product' => $product], 201);
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
    
        // Izračunavanje prosečne ocene
        $averageRating = Review::where('product_id', $id)->avg('rating');
    
        return response()->json([
            'product' => $product,
            'average_rating' => $averageRating ?? 0, // Ako nema ocena, vraća se 0
        ], 200);
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, $id)
    {
        $product = Product::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'category' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product->update($request->all());

        return response()->json(['message' => 'Product updated successfully.', 'product' => $product], 200);
    }

    /**
     * Remove the specified product.
     */
    public function destroy($id)
    {
        $product = Product::where('user_id', Auth::id())->findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.'], 200);
    }
    /**
     * Display all products for a specific user by user_id.
     */
    public function getProductsByUserId($user_id)
    {
        $products = Product::where('user_id', $user_id)->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found for this user.'], 404);
        }

        return response()->json($products, 200);
    }
    /**
     * Display all products belonging to the authenticated user.
     */
    public function getMyProducts()
    {
        $userId = Auth::id(); // Uzimanje ID-a trenutno ulogovanog korisnika
        $products = Product::where('user_id', $userId)->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found for the authenticated user.'], 404);
        }

        return response()->json($products, 200);

    }
}