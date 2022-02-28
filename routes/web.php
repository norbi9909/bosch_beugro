<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/center', 'HomeController@center')->name('center');
Route::get('/production', 'HomeController@production')->name('production');
Route::get('/about', 'HomeController@about')->name('about');
Route::post('/get_product_data', 'HomeController@get_product_data');
Route::get('/list_products', 'HomeController@list_products');
Route::post('/delete_production', 'HomeController@delete_production');
