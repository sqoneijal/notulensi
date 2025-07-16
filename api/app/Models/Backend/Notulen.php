<?php

namespace App\Models\Backend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Notulen extends Common
{

   public function submit(array $post): array
   {
      try {
         $fields = ['title', 'agenda', 'discussion_points', 'decisions', 'banner_image'];
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

         $data['pemimpin_id'] = $this->checkExistsUsers($post['pemimpin_id']);
         $data['moderator_id'] = $this->checkExistsUsers($post['moderator_id']);

         $table = $this->db->table('tb_notes');
         if (isset($post['id'])) {
         } else {
            $data['create_at'] = new RawSql('now()');

            $table->insert($data);
            $note_id = $this->db->insertID('tb_notes_id_seq');

            $data['note_id'] = $note_id;
            $this->insertParticipants($data);
         }

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function insertParticipants(array $data): void
   {
      $participants = [
         [
            'note_id' => $data['note_id'],
            'user_id' => $data['pemimpin_id']
         ],
         [
            'note_id' => $data['note_id'],
            'user_id' => $data['moderator_id']
         ]
      ];

      $this->db->table('tb_participants')->insertBatch($participants);
   }

   public function getData(): array
   {
      $table = $this->db->table('tb_notes t');
      $table->orderBy('t.id', 'desc');

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

      return [
         'results' => $response,
         'total' => 0
      ];
   }
}
