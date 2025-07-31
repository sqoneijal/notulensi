<?php

namespace App\Controllers\Backend\Referensi;

use App\Controllers\BaseController;
use App\Validation\Backend\Referensi\Kategori as Validate;
use App\Models\Backend\Referensi\Kategori as Model;

class Kategori extends BaseController
{

   public function index(): object
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet());
      return $this->respond($content);
   }

   public function delete(int $id): object
   {
      $model = new Model();
      $content = $model->handleDelete($id);
      return $this->respond($content);
   }

   public function update(int $id): object
   {
      $submit = [];
      $validation = $this->validation();
      if ($validation['status']) {
         $model = new Model();
         $submit = $model->updateData($id, $this->request->getJSON(true));
      }

      return $this->respond(array_merge($validation, $submit));
   }

   public function create(): object
   {
      $submit = [];
      $validation = $this->validation();
      if ($validation['status']) {
         $model = new Model();
         $submit = $model->createData($this->request->getPost());
      }

      return $this->respond(array_merge($validation, $submit));
   }

   private function validation(): array
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();

      $input = $this->request->getMethod() === 'POST'
         ? $this->request->getPost()
         : $this->request->getJSON(true);

      if ($this->validateData($input, $validation->submit())) {
         $response = ['errors' => [], 'status' => true];
      } else {
         $response['message'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $response;
   }
}
