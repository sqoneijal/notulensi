<?php

namespace App\Models\Frontend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Event extends Common
{

   public function handlePresensi(int $note_id, array $post): array
   {
      $result = ['status' => false, 'message' => 'Gagal melakukan presensi, mungkin anda bukan peserta rapat.'];
      try {
         $table = $this->db->table('tb_notes tn');
         $table->select('ta.*, tp.id as participant_id');
         $table->join('tb_participants tp', 'tp.note_id = tn.id');
         $table->join('tb_users tu', 'tu.id = tp.user_id');
         $table->join('tb_attendances ta', 'ta.participant_id = tp.id', 'left');
         $table->where('tn.id', $note_id);
         $table->where('tu.username', $post['preferred_username']);

         $get = $table->get();
         $data = $get->getRowArray();
         $get->freeResult();

         if (isset($data)) {
            if (!$data['attendance_time']) {
               $this->handleAttendances($note_id, $data['participant_id']);
               $result = ['status' => true, 'content' => $post, 'message' => 'Presensi berhasil dilakukan.'];
            }
            $result = ['status' => true, 'content' => $post, 'message' => 'Presensi berhasil dilakukan.'];
         }
      } catch (\Exception $e) {
         $result = ['status' => false, 'message' => $e->getMessage()];
      }
      return $result;
   }

   private function handleAttendances(int $note_id, int $participant_id): void
   {
      $table = $this->db->table('tb_attendances');
      $table->insert([
         'note_id' => $note_id,
         'participant_id' => $participant_id,
         'attendance_time' => new RawSql('now()'),
         'status' => 'hadir'
      ]);
   }

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
      $table->join('(' . new RawSql($this->prepareSubQueryPeserta($id)) . ') tp', 'tp.note_id = tn.id', 'left');
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

   private function prepareSubQueryPeserta(int $note_id): string
   {
      $table = $this->db->table('tb_participants tp');
      $table->select('tp.note_id,
         json_agg(json_build_object(
            \'nip\', tu3.username,
            \'nama\', tu3.full_name,
            \'presensi\', ta.status
         )) as peserta');
      $table->join('tb_users tu3', 'tu3.id = tp.user_id');
      $table->join('tb_attendances ta', 'ta.participant_id = tp.id and ta.note_id = tp.note_id', 'left');
      $table->where('tp.note_id', $note_id);
      $table->groupBy('tp.note_id');

      return $table->getCompiledSelect();
   }
}
