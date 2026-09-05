<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/category/{slug}', [CategoryController::class, 'index'])->name('category.index');
Route::get('/search', [SearchController::class, 'index'])->name('search');
