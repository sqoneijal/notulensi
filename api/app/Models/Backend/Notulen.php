<?php

namespace App\Models\Backend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Notulen extends Common
{

   public function submit(array $post): array
   {
      try {
         $fields = ['title', 'agenda', 'discussion_points', 'decisions', 'pemimpin_id', 'moderator_id', 'banner_image'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $cleanedInput = preg_replace('/\s*\(.*\)$/', '', $post['meeting_date']);

         $date = new \DateTime($cleanedInput);
         $data['meeting_date'] = $date->format('Y-m-d H:i:sP');

         $table = $this->db->table('tb_notes');
         if (isset($post['id'])) {
         } else {
            $data['create_at'] = new RawSql('now()');

            $table->insert($data);
         }

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }
}
