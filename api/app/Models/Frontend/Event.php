<?php

namespace App\Models\Frontend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Event extends Common
{

   public function getData(array $post): array
   {
      $table = $this->db->table('tb_notes tn');
      $table->select('tn.id, tn.title, tn.meeting_date, tn.agenda, tn.banner_image, tn.lokasi, tn.embed_youtube, tu.full_name as pemimpin');
      $table->join('tb_users tu', 'tu.id = tn.pemimpin_id', 'left');
      $table->limit(10, (10 * intval($post['page'])));
      $table->orderBy('tn.id', 'desc');

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
      return ['content' => $response, 'total' => $this->hitungTotalData()];
   }

   private function hitungTotalData(): int
   {
      $table = $this->db->table('tb_notes');

      return $table->countAllResults();
   }

   public function getShowData(int $id): array
   {
      $table = $this->db->table('tb_notes tn');
      $table->select('tn.*, tu.username as nip_pemimpin, tu.full_name as nama_pemimpin, tu2.username as nip_moderator, tu2.full_name as nama_moderator, coalesce(tp.peserta, \'[]\') as peserta');
      $table->join('tb_users tu', 'tu.id = tn.pemimpin_id', 'left');
      $table->join('tb_users tu2', 'tu2.id = tn.moderator_id', 'left');
      $table->join('(' . new RawSql($this->prepareSubQueryPeserta()) . ') tp', 'tp.note_id = tn.id', 'left');
      $table->where('tn.id', $id);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         $decode = ['peserta'];

         foreach ($fieldNames as $field) {
            if (in_array($field, $decode)) {
               $response[$field] = json_decode($data[$field], true);
            } else {
               $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
            }
         }
      }
      return $response;
   }

   private function prepareSubQueryPeserta(): string
   {
      $table = $this->db->table('tb_participants tp');
      $table->select('tp.note_id,
         json_agg(json_build_object(
            \'nip\', tu3.username,
            \'nama\', tu3.full_name
         )) as peserta');
      $table->join('tb_users tu3', 'tu3.id = tp.user_id');
      $table->groupBy('tp.note_id');

      return $table->getCompiledSelect();
   }
}
