<?php

namespace App\Controllers\Backend;

use App\Controllers\BaseController;
use App\Models\Backend\Dashboard as Model;

class Dashboard extends BaseController
{

   public function index(): object
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet('meeting_date'));
      return $this->respond($content);
   }

   public function getAppUser()
   {
      $model = new Model();
      $content = $model->getAppUser($this->request->getPost());
      return $this->respond($content);
   }
}
