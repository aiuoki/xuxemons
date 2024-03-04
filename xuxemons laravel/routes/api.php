<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\XuxemonController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\XuxemonUsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth', [AuthController::class, 'auth'])->name('auth');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

Route::get('users', [UserController::class, 'index'])->name('users.index');
Route::get('users/{id}', [UserController::class, 'show'])->name('users.show');
Route::post('users', [UserController::class, 'store'])->name('users.store');
Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

Route::get('xuxemons', [XuxemonController::class, 'index'])->name('xuxemons.index');
Route::get('xuxemons/{id}', [XuxemonController::class, 'show'])->name('xuxemons.show');
Route::post('xuxemons', [XuxemonController::class, 'store'])->name('xuxemons.store');
Route::put('xuxemons/{id}', [XuxemonController::class, 'update'])->name('xuxemons.update');
Route::delete('xuxemons/{id}', [XuxemonController::class, 'destroy'])->name('xuxemons.destroy');

// Ruta para obtener un xuxemon aleatorio
Route::get('xuxemon/aleatorio', [XuxemonUsuarioController::class, 'xuxemonAleatorio'])->name('xuxemons.aleatorio');