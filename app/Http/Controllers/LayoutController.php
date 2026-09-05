<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class LayoutController extends Controller
{
    public function categories()
    {
        $categories = Category::root()
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return response()->json([
            'categories' => $categories,
        ]);
    }
}
