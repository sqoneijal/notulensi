<?php

use Config\Cors;
use CodeIgniter\HTTP\ResponseInterface;

function respondCors(ResponseInterface $response): ResponseInterface
{
   $config = new Cors();
   $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

   if (in_array($origin, $config->allowedOrigins)) {
      $response->setHeader('Access-Control-Allow-Origin', $origin);
   }

   $response->setHeader('Access-Control-Allow-Credentials', 'true');
   $response->setHeader('Access-Control-Allow-Methods', implode(', ', $config->allowedMethods));
   $response->setHeader('Access-Control-Allow-Headers', implode(', ', $config->allowedHeaders));
   $response->setHeader('Access-Control-Max-Age', '3600');

   return $response;
}
