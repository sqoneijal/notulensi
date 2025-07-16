<?php

use CodeIgniter\Router\RouteCollection;

$routes->group('backend', ['filter' => ['cors:api', 'keycloak-auth']], static function (RouteCollection $routes): void {
   $routes->options('notulen', 'Notulen::options');
   $routes->resource('notulen');

   $routes->group('referensi', ['namespace' => 'App\Controllers\Backend\Referensi'], static function (RouteCollection $routes): void {
      $routes->options('kategori', 'Kategori::options');
      $routes->options('kategori/(:any)', 'Kategori::options');
      $routes->resource('kategori');
   });
});
