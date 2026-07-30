<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function latest(int $limit = 5): Collection
    {
        return Product::orderBy('id', 'desc')->limit($limit)->get();
    }

    public function createProduct(array $data): Product
    {
        return Product::create(['name' => $data['name'], 'price' => $data['price']]);
    }

    public function updateProduct(Product $product, array $data): Product
    {
        $product->update($data);

        return $product;
    }
}
