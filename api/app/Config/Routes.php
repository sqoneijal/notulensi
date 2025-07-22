<?php

use CodeIgniter\Router\RouteCollection;

$routes->group('backend', ['filter' => ['cors:api', 'keycloak-auth'], 'namespace' => 'App\Controllers\Backend'], static function (RouteCollection $routes): void {
   $routes->resource('dashboard');
   $routes->options('dashboard', 'Dashboard::options');


   $routes->resource('notulen');
   $routes->options('notulen', 'Notulen::options');

   $routes->group('notulen', static function (RouteCollection $routes): void {
      $routes->options('(:any)', 'Notulen::options');

      $routes->post('upload-banner', 'Notulen::uploadBanner');
      $routes->post('update-status-presensi', 'Notulen::updateStatusPresensi');
      $routes->post('update-hasil-diskusi', 'Notulen::updateHasilDiskusi');
      $routes->post('update-hasil-keputusan', 'Notulen::updateHasilKeputusan');
      $routes->post('submit-butir-tugas', 'Notulen::submitButirTugas');
      $routes->delete('lampiran/(:num)', 'Notulen::deleteLampiran/$1');
      $routes->post('lampiran', 'Notulen::createLampiran');
      $routes->put('lampiran/(:num)', 'Notulen::updateLampiran/$1');
   });

   $routes->group('referensi', ['namespace' => 'App\Controllers\Backend\Referensi'], static function (RouteCollection $routes): void {
      $routes->options('kategori', 'Kategori::options');
      $routes->options('kategori/(:any)', 'Kategori::options');
      $routes->resource('kategori');
   });
});

$routes->group('frontend', ['filter' => ['cors:api'], 'namespace' => 'App\Controllers\Frontend'], static function (RouteCollection $routes): void {
   $routes->resource('home');
   $routes->options('home', 'CorsHandler::options');
});
