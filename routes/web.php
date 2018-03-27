<?php

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
    return view('auth/login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
Route::get('/charts', 'ChartsController@index')->name('charts');
Route::get('/account', 'AccountController@index')->name('account');


// marker routes
Route::get('/showMapMarkers', 'MarkerController@showMapMarkers');
Route::get('/destroy/{id}', 'MarkerController@destroy');
Route::get('/searchMarkers/{manufacturer}/{model}', 'MarkerController@searchMarkers');
Route::get('/searcManufacturerhMarkers/{manufacturer}', 'MarkerController@searcManufacturerhMarkers');
Route::get('/searchRegistration/{registration}', 'MarkerController@searchRegistration');
Route::get('/linkMarkers/{id}', 'MarkerController@linkMarkers');
Route::post('/editMarker/{id}', 'MarkerController@update');
Route::get('/getMarker/{id}', 'MarkerController@getMarker');
Route::resource('markers', 'MarkerController');

// account routes
Route::resource('account', 'AccountController');
Route::post('/update', 'AccountController@update');


