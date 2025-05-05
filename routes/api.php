<?php

use App\Http\Controllers\Api\ItemHistoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Default\Api\SelectTableController;
use App\Http\Controllers\Default\FileController;
use App\Http\Middleware\JwtCustomApiVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware([JwtCustomApiVerification::class])
    ->prefix('_default')
    ->group(function () {
        Route::get('/select/{table}', SelectTableController::class)->name('api.select.table');
        Route::get('item-histories', [ItemHistoryController::class, 'index'])->name('api.item-history.index');
        Route::get('/sales', [SaleController::class, 'index'])->name('api.sale.index');
        Route::get('/purchases', [PurchaseController::class, 'index'])->name('api.purchase.index');
        Route::get('/products', [ProductController::class, 'index'])->name('api.product.index');
        Route::post('files', [FileController::class, 'store'])->name('api.file.store');
    });
