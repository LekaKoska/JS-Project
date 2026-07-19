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
}
