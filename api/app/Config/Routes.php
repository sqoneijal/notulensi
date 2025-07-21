<?php

use CodeIgniter\Router\RouteCollection;

$routes->group('backend', ['filter' => ['cors:api', 'keycloak-auth'], 'namespace' => 'App\Controllers\Backend'], static function (RouteCollection $routes): void {
   $routes->delete('notulen/lampiran/(:num)', 'Notulen::deleteLampiran/$1');
   $routes->post('notulen/lampiran', 'Notulen::createLampiran');
   $routes->put('notulen/lampiran/(:num)', 'Notulen::updateLampiran/$1');

   $routes->options('notulen', 'Notulen::options');
   $routes->options('notulen/(:any)', 'Notulen::options');
   $routes->resource('notulen');

   $routes->post('notulen/upload-banner', 'Notulen::uploadBanner');
   $routes->post('notulen/update-status-presensi', 'Notulen::updateStatusPresensi');
   $routes->post('notulen/update-hasil-diskusi', 'Notulen::updateHasilDiskusi');
   $routes->post('notulen/update-hasil-keputusan', 'Notulen::updateHasilKeputusan');
   $routes->post('notulen/submit-butir-tugas', 'Notulen::submitButirTugas');

   $routes->group('referensi', ['namespace' => 'App\Controllers\Backend\Referensi'], static function (RouteCollection $routes): void {
      $routes->options('kategori', 'Kategori::options');
      $routes->options('kategori/(:any)', 'Kategori::options');
      $routes->resource('kategori');
   });
});
