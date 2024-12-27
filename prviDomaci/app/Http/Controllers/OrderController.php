<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     */
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())->get();
        return response()->json($orders, 200);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_date' => 'required|date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,canceled',
            'product_id' => 'required|exists:products,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::create([
            'order_date' => $request->order_date,
            'total_price' => $request->total_price,
            'status' => $request->status,
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json(['message' => 'Order created successfully.', 'order' => $order], 201);
    }

    /**
     * Display the specified order.
     */
    public function show($id)
    {
        $order = Order::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($order, 200);
    }

    /**
     * Update the specified order.
     */
    public function update(Request $request, $id)
    {
        $order = Order::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'order_date' => 'required|date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,canceled',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order->update($request->all());

        return response()->json(['message' => 'Order updated successfully.', 'order' => $order], 200);
    }

    /**
     * Remove the specified order.
     */
    public function destroy($id)
    {
        $order = Order::where('user_id', Auth::id())->findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully.'], 200);
    }
}
