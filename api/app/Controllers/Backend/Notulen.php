<?php

namespace App\Controllers\Backend;

use App\Controllers\BaseController;
use App\Validation\Backend\Notulen as Validate;
use App\Models\Backend\Notulen as Model;

class Notulen extends BaseController
{

   public function kirimUndangan(): object
   {
      $model = new Model();
      $content = $model->handleKirimUndangan($this->request->getPost());
      return $this->respond($content);
   }

   public function updateLampiran(int $id): object
   {
      $submit = [];
      $validation = $this->validationLampiran();
      if ($validation['status']) {
         $post = $this->request->getJSON(true);
         $model = new Model();
         $submit = $model->updateDataLampiran($id, $post);
      }

      return $this->respond(array_merge($validation, $submit));
   }

   public function createLampiran(): object
   {
      $submit = [];
      $validation = $this->validationLampiran();
      if ($validation['status']) {
         $post = $this->request->getPost();

         $file_lampiran = $this->request->getFile('file_lampiran');
         if ($file_lampiran) {
            $post['file_path'] = cdn_upload($file_lampiran, 'lampiran');
         }

         $model = new Model();
         $submit = $model->createDataLampiran($post);
      }

      return $this->respond(array_merge($validation, $submit));
   }

   private function validationLampiran()
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();

      $input = $this->request->getMethod() === 'POST'
         ? $this->request->getPost()
         : $this->request->getJSON(true);

      if ($this->validateData($input, $validation->submitLampiran())) {
         $response = ['errors' => [], 'status' => true];
      } else {
         $response['message'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $response;
   }

   public function submitButirTugas(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submitButirTugas())) {
         $model = new Model();
         $submit = $model->submitButirTugas($this->request->getPost());

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['message'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function updateHasilKeputusan(): object
   {
      $model = new Model();
      $content = $model->updateHasilKeputusan($this->request->getPost());
      return $this->respond($content);
   }

   public function updateHasilDiskusi(): object
   {
      $model = new Model();
      $content = $model->updateHasilDiskusi($this->request->getPost());
      return $this->respond($content);
   }

   public function updateStatusPresensi(): object
   {
      $model = new Model();
      $content = $model->updateStatusPresensi($this->request->getPost());
      return $this->respond($content);
   }

   public function uploadBanner(): void
   {
      $post = $this->request->getPost();
      $banner_file = $this->request->getFile('banner_file');
      if ($banner_file) {
         $post['banner_image'] = cdn_upload($banner_file, 'banner');
      }

      $model = new Model();
      $model->uploadBanner($post);
   }

   public function show(int $id): object
   {
      $model = new Model();
      $content = $model->getDetail($id);
      return $this->respond($content);
   }

   public function deleteLampiran(int $id): object
   {
      $model = new Model();
      $content = $model->deleteLampiran($id);
      return $this->respond($content);
   }

   public function delete(int $id): object
   {
      $model = new Model();
      $content = $model->deleteData($id);
      return $this->respond($content);
   }

   public function index(): object
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet());
      return $this->respond($content);
   }

   public function new(): object
   {
      $model = new Model();
      $content = $model->getDropdown();
      return $this->respond($content);
   }

   public function update(int $id): object
   {
      $submit = [];
      $validation = $this->validation();
      if ($validation['status']) {
         $post = $this->request->getJSON(true);
         $model = new Model();
         $submit = $model->updateData($id, $post);
      }

      return $this->respond(array_merge($validation, $submit));
   }

   public function create(): object
   {
      $submit = [];
      $validation = $this->validation();
      if ($validation['status']) {
         $post = $this->request->getPost();

         $banner_file = $this->request->getFile('banner_file');
         if ($banner_file) {
            $post['banner_image'] = cdn_upload($banner_file, 'banner');
         }

         $model = new Model();
         $submit = $model->createData($post);
      }

      return $this->respond(array_merge($validation, $submit));
   }

   private function validation()
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
