let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/assets/ts/app.ts', 'public/js')
   .autoload({
      "popper.js": ['Popper', 'window.Popper', 'popper', 'window.popper'],
      "jquery": ['$','window.jQusery', 'window.$', 'jQuery']
   })
   .sass('resources/assets/sass/app.scss', 'public/css');
