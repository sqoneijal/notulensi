<?php

namespace App\Validation\Backend\Referensi;

class Kategori
{

   public function submit(): array
   {
      return [
         'category_name' => [
            'rules' => 'required',
            'label' => 'Nama kategori'
         ]
      ];
   }
}
