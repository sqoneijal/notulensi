<?php

namespace App\Validation\Backend;

class Notulen
{

   public function submitLampiran(): array
   {
      return [
         'file_name' => [
            'rules' => 'required',
            'label' => 'Nama dokumen'
         ]
      ];
   }

   public function submitButirTugas(): array
   {
      return [
         'due_date' => [
            'rules' => 'required',
            'label' => 'Tenggat waktu'
         ],
      ];
   }

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
         'lokasi' => [
            'rules' => 'required',
            'label' => 'Lokasi rapat'
         ],
      ];
   }
}
