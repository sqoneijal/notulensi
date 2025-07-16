<?php

namespace App\Controllers\Backend\Referensi;

use App\Controllers\BaseController;
use App\Validation\Backend\Referensi\Kategori as Validate;
use App\Models\Backend\Referensi\Kategori as Model;

class Kategori extends BaseController
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

   public function delete(int $id): object
   {
      $model = new Model();
      $content = $model->handleDelete($id);
      return $this->respond($content);
   }

   public function create(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $submit = $model->submit($this->request->getPost());

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['message'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }
}
