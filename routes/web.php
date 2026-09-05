<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StaticPageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/category/{slug}', [CategoryController::class, 'index'])->name('category.index');
Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/pedoman-media', [StaticPageController::class, 'show'])
    ->defaults('page', 'pedoman-media')->name('page.pedoman-media');
Route::get('/tentang-kami', [StaticPageController::class, 'show'])
    ->defaults('page', 'tentang-kami')->name('page.tentang-kami');
Route::get('/susunan-redaksi', [StaticPageController::class, 'show'])
    ->defaults('page', 'susunan-redaksi')->name('page.susunan-redaksi');
Route::get('/karir', [StaticPageController::class, 'show'])
    ->defaults('page', 'karir')->name('page.karir');
