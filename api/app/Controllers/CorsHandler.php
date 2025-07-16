<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class CorsHandler extends BaseController
{
   public function options()
   {
      return respondCors(service('response'))->setStatusCode(200);
   }
}
