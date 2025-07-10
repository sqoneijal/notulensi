<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');

$routes->group('frontend', ['namespace' => 'App\Controllers\Frontend'], function ($routes) {
   $routes->get('home', 'Home::getData');
});
