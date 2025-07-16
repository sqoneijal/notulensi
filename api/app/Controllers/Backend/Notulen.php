<?php

namespace App\Controllers\Backend;

use App\Controllers\BaseController;
use App\Validation\Backend\Notulen as Validate;
use App\Models\Backend\Notulen as Model;

class Notulen extends BaseController
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

   public function create(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $post = $this->request->getPost();

         $banner_file = $this->request->getFile('banner_file');
         if ($banner_file) {
            $post['banner_image'] = cdn_upload($banner_file, 'banner');
         }

         $model = new Model();
         $submit = $model->submit($post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['message'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }

      return $this->respond($response);
   }
}
