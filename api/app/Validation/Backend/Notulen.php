<?php

namespace App\Validation\Backend;

class Notulen
{

   public function submit(): array
   {
      return [
         'title' => [
            'rules' => 'required',
            'label' => 'Judul rapat'
         ],
         'meeting_date' => [
            'rules' => 'required',
            'label' => 'Tanggal rapat'
         ],
         'agenda' => [
            'rules' => 'required',
            'label' => 'Agenda rapat'
         ],
      ];
   }
}
