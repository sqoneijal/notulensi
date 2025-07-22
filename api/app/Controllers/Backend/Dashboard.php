<?php

namespace App\Controllers\Backend;

use App\Controllers\BaseController;
use App\Models\Backend\Dashboard as Model;

class Dashboard extends BaseController
{

   public function options()
   {
      return respondCors($this->response)->setStatusCode(200);
   }

   public function index(): object
   {
      $model = new Model();
      $content = $model->getData();
      return $this->respond($content);
   }
}
