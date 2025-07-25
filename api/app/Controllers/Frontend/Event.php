<?php

namespace App\Controllers\Frontend;

use App\Controllers\BaseController;
use App\Models\Frontend\Event as Model;

class Event extends BaseController
{

   public function show(int $id)
   {
      $model = new Model();
      $content = $model->getShowData($id);
      return $this->respond($content);
   }
}
