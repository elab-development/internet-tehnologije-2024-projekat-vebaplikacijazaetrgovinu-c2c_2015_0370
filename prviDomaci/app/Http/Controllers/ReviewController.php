<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the reviews.
     */
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews, 200);
    }

    /**
     * Store a newly created review.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
            'product_id' => 'required|exists:products,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review = Review::create([
            'rating' => $request->rating,
            'comment' => $request->comment,
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json(['message' => 'Review created successfully.', 'review' => $review], 201);
    }

    /**
     * Display the specified review.
     */
    public function show($id)
    {
        $review = Review::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($review, 200);
    }

    /**
     * Update the specified review.
     */
    public function update(Request $request, $id)
    {
        $review = Review::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review->update($request->all());

        return response()->json(['message' => 'Review updated successfully.', 'review' => $review], 200);
    }

    /**
     * Remove the specified review.
     */
    public function destroy($id)
    {
        $review = Review::where('user_id', Auth::id())->findOrFail($id);
        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.'], 200);
    }



    /**
     * Display all reviews for a specific user.
     */
    public function getReviewsByUser($user_id)
    {
        $reviews = Review::where('user_id', $user_id)->get();

        if ($reviews->isEmpty()) {
            return response()->json(['message' => 'No reviews found for this user.'], 404);
        }

        return response()->json($reviews, 200);
    }
    /**
     * Display all reviews for a specific product with user names.
     */
    public function getReviewsByProduct($product_id)
    {
        $reviews = Review::where('product_id', $product_id)
            ->with('user:id,name') // Učitavamo samo ID i ime korisnika
            ->get();

        if ($reviews->isEmpty()) {
            return response()->json(['message' => 'No reviews found for this product.'], 404);
        }

        return response()->json($reviews, 200);
    }


}
