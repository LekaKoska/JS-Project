<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
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

    public function store(ProductRequest $request): JsonResponse
    {
       $product = $this->productService->createProduct($request->validated());
        return response()->json([
            'status' => true,
            'message' => "Product created successfully",
            'data' => $product
        ], 201);
    }


    public function update(ProductRequest $request, Product $product): JsonResponse
    {
       $updated = $this->productService->updateProduct($product, $request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Product updated',
            'data' => $updated
        ]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
          return response()->json([
              'status' => true,
              'message' => 'Product deleted successfully',
              'data' => []
          ]);
    }
}
