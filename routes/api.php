<?php

use Illuminate\Http\Request;
use App\Models\Article;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;
use App\Config;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function() {
    Route::get('articles',  function() {
        $articles = Article::all();
        return $articles;
    });

    Route::post('contact',function(Request $request){
        // フォームからのリクエストデータ全てを$contactに代入
        // dd(Config::get('mail.username'));
        Mail::to(\Config::get('mail.username'))->send(new ContactMail($request->all())); // 引数にリクエストデータを渡す
        return ['contact' => $request->all()];
    });

});
