<?php

use CodeIgniter\Router\RouteCollection;

$routes->options('backend/(:any)', 'BaseController::options', ['filter' => 'cors:api']);
$routes->options('frontend/(:any)', 'BaseController::options', ['filter' => 'cors:api']);

$routes->group('backend', ['filter' => ['cors:api', 'keycloak-auth'], 'namespace' => 'App\Controllers\Backend'], static function (RouteCollection $routes): void {
   $routes->post('getappuser', 'Dashboard::getAppUser');

   $routes->resource('dashboard', ['only' => 'index']);

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
      $routes->post('kirim-undangan', 'Notulen::kirimUndangan');
   });

   $routes->resource('notulen', ['only' => 'updateLampiran,createLampiran,submitButirTugas,updateHasilKeputusan,updateHasilDiskusi,updateStatusPresensi,uploadBanner,show,deleteLampiran,index,new,update,create,delete,kirimUndangan']);

   $routes->group('referensi', ['namespace' => 'App\Controllers\Backend\Referensi'], static function (RouteCollection $routes): void {
      $routes->resource('kategori', ['only' => 'index,delete,update,create']);
   });
});

$routes->group('frontend', ['filter' => ['cors:api'], 'namespace' => 'App\Controllers\Frontend'], static function (RouteCollection $routes): void {
   $routes->resource('home', ['only' => 'index']);
   $routes->resource('event', ['only' => 'index']);

   $routes->post('presensi/(:num)', 'Event::presensi/$1');

   $routes->group('detail', static function (RouteCollection $routes): void {
      $routes->resource('event', ['only' => 'show']);
   });
});
