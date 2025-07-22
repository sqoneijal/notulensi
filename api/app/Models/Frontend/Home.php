<?php

namespace App\Models\Frontend;

use App\Models\Common;

class Home extends Common
{

   public function getData(): array
   {
      return [
         'banner' => $this->getBannerData()
      ];
   }

   private function getBannerData(): array
   {
      $table = $this->db->table('tb_notes tn');
      $table->select('tn.*, tu.full_name');
      $table->join('tb_users tu', 'tu.id = tn.pemimpin_id');
      $table->orderBy('tn.id', 'desc');
      $table->limit(1);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }
}
