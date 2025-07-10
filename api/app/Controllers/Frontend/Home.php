<?php

namespace App\Controllers\Frontend;

use App\Controllers\BaseController;
use App\Models\Frontend\Home as Model;

class Home extends BaseController
{

   public function getData()
   {
      $model = new Model();
      $data = $model->getData();
      return $this->respond($data);
   }
}
