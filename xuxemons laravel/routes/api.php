<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\XuxemonController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChucheController;
use App\Http\Controllers\ChucheMochilaController;
use App\Http\Controllers\MochilaController;
use App\Http\Controllers\ParametroController;
use App\Http\Controllers\UserXuxemonController;
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

Route::post('/check-nick', [UserController::class, 'checkNickAvailability']);
Route::post('/check-email', [UserController::class, 'checkEmailAvailability']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('logout', [AuthController::class, 'logout']);

    Route::apiResource('mochilas', MochilaController::class);

    Route::get('xuxemonsUsuario/{userId}', [UserXuxemonController::class, 'obtenerXuxemonsDeUsuario']);
    Route::get('xuxemonUsuario/{userId}/{xuxemonId}', [UserXuxemonController::class, 'obtenerXuxemonEspecificoDeUsuario']);

    Route::get('chuchesMochila/{userId}', [ChucheMochilaController::class, 'obtenerChuchesDeMochila']);
    Route::get('chucheMochila/{userId}/{chucheId}', [ChucheMochilaController::class, 'obtenerChucheEspecificaDeMochila']);

    Route::group(['middleware' => ['check.admin']], function () {
        Route::apiResource('parametros', ParametroController::class);

        Route::apiResource('users', UserController::class);

        Route::apiResource('xuxemons', XuxemonController::class);
        Route::post('/xuxemon/check-nombre', [XuxemonController::class, 'checkNombreAvailability']);
        Route::post('/xuxemon/check-archivo', [XuxemonController::class, 'checkArchivoAvailability']);
        Route::get('xuxemonAleatorio', [UserXuxemonController::class, 'asignarXuxemonAleatorio']);

        Route::apiResource('chuches', ChucheController::class);
        Route::post('/chuche/check-nombre', [ChucheController::class, 'checkNombreAvailability']);
        Route::post('/chuche/check-archivo', [ChucheController::class, 'checkArchivoAvailability']);
        Route::get('chucheAleatoria', [ChucheMochilaController::class, 'asignarChucheAleatoria']);
    });
});