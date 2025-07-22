<?php

use CodeIgniter\Router\RouteCollection;

$routes->group('backend', ['filter' => ['cors:api', 'keycloak-auth'], 'namespace' => 'App\Controllers\Backend'], static function (RouteCollection $routes): void {
   $routes->options('(:any)', 'App\Controllers\CorsHandler::options');

   $routes->resource('dashboard');

   $routes->group('notulen', static function (RouteCollection $routes): void {
      // lampiran
      $routes->delete('lampiran/(:num)', 'Notulen::deleteLampiran/$1');
      $routes->post('lampiran', 'Notulen::createLampiran');
      $routes->put('lampiran/(:num)', 'Notulen::updateLampiran/$1');

      $routes->post('upload-banner', 'Notulen::uploadBanner');
      $routes->post('update-status-presensi', 'Notulen::updateStatusPresensi');
      $routes->post('update-hasil-diskusi', 'Notulen::updateHasilDiskusi');
      $routes->post('update-hasil-keputusan', 'Notulen::updateHasilKeputusan');
      $routes->post('submit-butir-tugas', 'Notulen::submitButirTugas');
   });

   $routes->resource('notulen');

   $routes->group('referensi', ['namespace' => 'App\Controllers\Backend\Referensi'], static function (RouteCollection $routes): void {
      $routes->resource('kategori');
   });
});

$routes->group('frontend', ['filter' => ['cors:api'], 'namespace' => 'App\Controllers\Frontend'], static function (RouteCollection $routes): void {
   $routes->resource('home');
});
