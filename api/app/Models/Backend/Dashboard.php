<?php

namespace App\Models\Backend;

use App\Models\Common;

class Dashboard extends Common
{

   public function getData(): array
   {
      $table = $this->db->table('tb_notes tn');
      $table->select('tn.id, tn.title, to_char(tn.meeting_date, \'YYYY-MM-DD\') as date, tn.meeting_date as start, tn.agenda as keterangan');
      $table->where('to_char(tn.meeting_date, \'YYYY-MM\')', date('Y-m'));

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }
}
