<?php

namespace App\Controllers\Frontend;

use App\Controllers\BaseController;
use App\Models\Frontend\Event as Model;

class Event extends BaseController
{

   public function index(): object
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet());
      return $this->respond($content);
   }

   public function show(int $id): object
   {
      $model = new Model();
      $content = $model->getShowData($id);
      return $this->respond($content);
   }

   public function presensi(int $note_id): object
   {
      $model = new Model();
      $content = $model->handlePresensi($note_id, $this->request->getPost());
      return $this->respond($content);
   }
}
