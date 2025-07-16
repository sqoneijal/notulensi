<?php

use CodeIgniter\Router\RouteCollection;

$routes->group('', ['filter' => 'cors:api'], static function (RouteCollection $routes): void {
   $routes->options('backend/notulen', 'Notulen::options');
   $routes->resource('backend/notulen');
});
