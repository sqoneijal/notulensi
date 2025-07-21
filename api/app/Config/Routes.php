<?php

use CodeIgniter\Router\RouteCollection;

$routes->group('backend', ['filter' => ['cors:api', 'keycloak-auth'], 'namespace' => 'App\Controllers\Backend'], static function (RouteCollection $routes): void {
   $routes->options('notulen', 'Notulen::options');
   $routes->options('notulen/(:any)', 'Notulen::options');
   $routes->resource('notulen');
   $routes->post('notulen/upload-banner', 'Notulen::uploadBanner');
   $routes->post('notulen/update-status-presensi', 'Notulen::updateStatusPresensi');
   $routes->post('notulen/update-hasil-diskusi', 'Notulen::updateHasilDiskusi');
   $routes->post('notulen/update-hasil-keputusan', 'Notulen::updateHasilKeputusan');

   $routes->group('referensi', ['namespace' => 'App\Controllers\Backend\Referensi'], static function (RouteCollection $routes): void {
      $routes->options('kategori', 'Kategori::options');
      $routes->options('kategori/(:any)', 'Kategori::options');
      $routes->resource('kategori');
   });
});
