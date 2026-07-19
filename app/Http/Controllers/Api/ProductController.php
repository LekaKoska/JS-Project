<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function __construct(private readonly ProductService $productService)
    {
    }

    public function index(): JsonResponse
    {
        $products = $this->productService->latest();

        return response()->json([
            'status' => 'success',
            'message' => 'Products fetched successfully.',
            'data' => $products,
        ], 200);
    }
}
