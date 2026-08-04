<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $models = [
            'iPhone 15 Pro Max',
            'iPhone 15',
            'iPhone 14',
            'Samsung Galaxy S24 Ultra',
            'Samsung Galaxy S23',
            'Samsung Galaxy A54',
            'Xiaomi Redmi Note 13',
            'Xiaomi 14',
            'Google Pixel 8 Pro',
            'Google Pixel 8',
            'OnePlus 12',
            'Huawei P60 Pro',
            'Sony Xperia 1 V',
            'Motorola Edge 40',
            'Nothing Phone 2',
        ];

        return [
            'name' => fake()->randomElement($models),
            'price' => fake()->randomFloat(2, 150, 1500),
        ];
    }
}
