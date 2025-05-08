<?php

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
        Route::post('files', [FileController::class, 'store'])->name('api.file.store');
    });
