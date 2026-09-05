<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class LayoutController extends Controller
{
    public function categories(): JsonResponse
    {
        $categories = Category::root()
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return response()->json([
            'categories' => $categories,
        ]);
    }
}
