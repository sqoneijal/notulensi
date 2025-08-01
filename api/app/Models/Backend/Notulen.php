<?php

namespace App\Models\Backend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Notulen extends Common
{

   public function updateDataLampiran(int $id, array $post): array
   {
      try {
         $data = $this->cleanDataSubmit(['file_name', 'file_type'], $post);
         $data['update_at'] = new RawSql('now()');

         $table = $this->db->table('tb_attachments');
         $table->where('id', $id);
         $table->update($data);

         return ['status' => true, 'content' => $this->getDaftarLampiran($post['note_id']), 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function deleteLampiran(int $id): array
   {
      try {
         $note_id = $this->db->table('tb_attachments')
            ->select('note_id')
            ->where('id', $id)
            ->get()
            ->getRow()
            ->note_id ?? null;

         $table = $this->db->table('tb_attachments');
         $table->where('id', $id);
         $table->delete();

         return ['status' => true, 'content' => $this->getDaftarLampiran($note_id), 'message' => 'Data berhasil dihapus.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function createDataLampiran(array $post): array
   {
      try {
         $data = $this->cleanDataSubmit(['note_id', 'file_name', 'file_path', 'file_type', 'user_modified'], $post);
         $data['create_at'] = new RawSql('now()');

         $table = $this->db->table('tb_attachments');
         $table->insert($data);

         return ['status' => true, 'message' => 'Data berhasil disimpan.', 'content' => $this->getDaftarLampiran($post['note_id'])];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function getDaftarLampiran(int $note_id): array
   {
      $table = $this->db->table('tb_attachments');
      $table->where('note_id', $note_id);

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

   public function submitButirTugas(array $post): array
   {
      try {
         $table = $this->db->table('tb_action_item_details');
         $table->where('note_id', $post['note_id']);
         $table->where('assigned_to', $post['assigned_to']);

         $found = $table->countAllResults() > 0 ? true : false;

         if ($found) {
            $this->db->table('tb_action_item_details')
               ->where('note_id', $post['note_id'])
               ->where('assigned_to', $post['assigned_to'])
               ->update([
                  'description' => htmlentities($post['description']),
                  'due_date' => $post['due_date'],
                  'update_at' => new RawSql('now()')
               ]);
         } else {
            $this->db->table('tb_action_item_details')
               ->insert([
                  'note_id' => $post['note_id'],
                  'description' => htmlentities($post['description']),
                  'assigned_to' => $post['assigned_to'],
                  'due_date' => $post['due_date'],
                  'create_at' => new RawSql('now()')
               ]);
         }

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function updateHasilKeputusan(array $post): array
   {
      try {
         $table = $this->db->table('tb_notes');
         $table->where('id', $post['id']);
         $table->update([
            'decisions' => htmlentities($post['decisions']),
            'update_at' => new RawSql('now()')
         ]);
         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function updateHasilDiskusi(array $post): array
   {
      try {
         $table = $this->db->table('tb_notes');
         $table->where('id', $post['id']);
         $table->update([
            'discussion_points' => htmlentities($post['discussion_points']),
            'update_at' => new RawSql('now()')
         ]);
         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function updateStatusPresensi(array $post): array
   {
      try {
         $table = $this->db->table('tb_attendances');
         $table->where('note_id', $post['note_id']);
         $table->where('participant_id', $post['participant_id']);

         $found = $table->countAllResults() > 0 ? true : false;

         if (!$found) {
            $this->db->table('tb_attendances')->insert([
               'note_id' => $post['note_id'],
               'participant_id' => $post['participant_id'],
               'status' => $post['status']
            ]);
         } else {
            $this->db->table('tb_attendances')
               ->where('note_id', $post['note_id'])
               ->where('participant_id', $post['participant_id'])
               ->update([
                  'status' => $post['status']
               ]);
         }

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function uploadBanner(array $post): void
   {
      $data = $this->cleanDataSubmit(['banner_image'], $post);
      $data['update_at'] = new RawSql('now()');

      $table = $this->db->table('tb_notes');
      $table->where('id', $post['id']);
      $table->update($data);
   }

   public function getDropdown(): array
   {
      return [
         'daftarKategori' => $this->getDaftarKategori()
      ];
   }

   public function getDetail(int $id): array
   {
      try {
         $table = $this->db->table('tb_notes t');
         $table->select('t.id as note_id, t.title, t.meeting_date, t.agenda, t.discussion_points, t.decisions, t2.full_name as pemimpin, t2.username as nip_pemimpin, t3.full_name as moderator, t3.username as nip_moderator, t.banner_image, coalesce(t4.kategori, \'[]\') as kategori, coalesce(t5.peserta, \'[]\') as peserta, coalesce(t6.presensi, \'[]\') as presensi, coalesce(taid.butir_tugas, \'[]\') as butir_tugas, coalesce(ta.lampiran, \'[]\') as lampiran, t.lokasi');
         $table->join('tb_users t2', 't2.id = t.pemimpin_id', 'left');
         $table->join('tb_users t3', 't3.id = t.moderator_id', 'left');
         $table->join('(' . new RawSql($this->prepareSubQueryKategori()) . ') t4', 't4.note_id = t.id', 'left');
         $table->join('(' . new RawSql($this->prepareSubQueryPeserta()) . ') t5', 't5.note_id = t.id', 'left');
         $table->join('(' . new RawSql($this->prepareSubQueryPresensi()) . ') t6', 't6.note_id = t.id', 'left');
         $table->join('(' . new RawSql($this->prepareSubQueryButirTugas()) . ') taid', 'taid.note_id = t.id', 'left');
         $table->join('(' . new RawSql($this->prepareSubQueryLampiran()) . ') ta', 'ta.note_id = t.id', 'left');
         $table->where('t.id', $id);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         $field_decode_json = ['kategori', 'peserta', 'presensi', 'butir_tugas', 'lampiran'];

         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               if (in_array($field, $field_decode_json)) {
                  $response[$field] = json_decode($data[$field], true);
               } else {
                  $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
               }
            }
         }

         return ['status' => true, 'content' => $response];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function prepareSubQueryLampiran(): string
   {
      $table = $this->db->table('tb_attachments');
      $table->select('note_id,
         json_agg(json_build_object(
            \'id\', id,
            \'file_name\', file_name,
            \'file_path\', file_path,
            \'user_modified\', user_modified
         )) as lampiran');
      $table->groupBy('note_id');

      return $table->getCompiledSelect();
   }

   private function prepareSubQueryButirTugas(): string
   {
      $table = $this->db->table('tb_action_item_details taid');
      $table->select('taid.note_id,
         json_agg(json_build_object(
            \'description\', taid.description,
            \'assigned_to\', taid.assigned_to,
            \'due_date\', taid.due_date,
            \'status\', taid.status
         )) as butir_tugas');
      $table->groupBy('taid.note_id');

      return $table->getCompiledSelect();
   }

   private function prepareSubQueryPresensi(): string
   {
      $table = $this->db->table('tb_participants t');
      $table->select('t.note_id,
		json_agg(json_build_object(
			\'attendance_time\', t2.attendance_time,
			\'status\', t2.status,
			\'participant_id\', t2.participant_id
		)) as presensi');
      $table->join('tb_attendances t2', 't2.participant_id = t.id and t2.note_id = t.note_id');
      $table->groupBy('t.note_id');

      return $table->getCompiledSelect();
   }

   public function deleteData(int $id): array
   {
      try {
         $table = $this->db->table('tb_notes');
         $table->where('id', $id);
         $table->delete();

         return ['status' => true, 'message' => 'Data berhasil dihapus.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function updateData(int $id, array $post): array
   {
      try {
         $data = $this->cleanDataSubmit(['title', 'agenda', 'lokasi', 'embed_youtube'], $post);

         $cleanedInput = preg_replace('/\s*\(.*\)$/', '', $post['meeting_date']);

         $date = new \DateTime($cleanedInput);
         $data['meeting_date'] = $date->format('Y-m-d H:i:sP');

         $data['pemimpin_id'] = $this->getOrCreateUser(json_decode($post['pemimpin'], true));
         $data['moderator_id'] = $this->getOrCreateUser(json_decode($post['moderator'], true));
         $data['update_at'] = new RawSql('now()');

         $table = $this->db->table('tb_notes');
         $table->where('id', $id);
         $table->update($data);

         $data['note_id'] = $id;

         $this->handleModeratorParticipants($data);

         if (@$post['kategori']) {
            $kategori = json_decode($post['kategori'], true);
            if (!empty($kategori)) {
               $this->syncNoteCategories($kategori, $data['note_id']);
            }
         }

         if (@$post['peserta_rapat']) {
            $peserta_rapat = json_decode($post['peserta_rapat'], true);
            if (!empty($peserta_rapat)) {
               $this->generateUserPeserta($peserta_rapat, $data['note_id']);
            }
         }

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function handleModeratorParticipants(array $post): void
   {
      $table = $this->db->table('tb_participants');
      $table->where('status_participants', 'moderator');
      $table->where('note_id', $post['note_id']);
      $table->where('user_id', $post['moderator_id']);

      $count = $table->countAllResults();

      if (!$count > 0) {
         $this->db->table('tb_participants')->insert([
            'note_id' => $post['note_id'],
            'user_id' => $post['moderator_id'],
            'status_participants' => 'moderator',
            'create_at' => new RawSql('now()')
         ]);
      }
   }

   public function createData(array $post): array
   {
      try {
         $data = $this->cleanDataSubmit(['title', 'agenda', 'banner_image', 'lokasi', 'embed_youtube', 'user_modified'], $post);

         $cleanedInput = preg_replace('/\s*\(.*\)$/', '', $post['meeting_date']);

         $date = new \DateTime($cleanedInput);
         $data['meeting_date'] = $date->format('Y-m-d H:i:sP');

         $data['pemimpin_id'] = $this->getOrCreateUser(json_decode($post['pemimpin'], true));
         $data['moderator_id'] = $this->getOrCreateUser(json_decode($post['moderator'], true));
         $data['create_at'] = new RawSql('now()');

         $table = $this->db->table('tb_notes');
         $table->insert($data);
         $note_id = $this->db->insertID('tb_notes_id_seq');

         $data['note_id'] = $note_id;

         $this->insertPemimpinRapat($data);
         $this->insertModeratorRapat($data);

         if (@$post['kategori']) {
            $kategori = json_decode($post['kategori'], true);
            if (!empty($kategori)) {
               $this->syncNoteCategories($kategori, $data['note_id']);
            }
         }

         if (@$post['peserta_rapat']) {
            $peserta_rapat = json_decode($post['peserta_rapat'], true);
            if (!empty($peserta_rapat)) {
               $this->generateUserPeserta($peserta_rapat, $data['note_id']);
            }
         }

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function generateUserPeserta(array $content, int $noteId): void
   {
      $users = [];
      foreach ($content as $row) {
         array_push($users, array_merge($row, ['user_id' => $this->getOrCreateUser($row)]));
      }

      $builder = $this->db->table('tb_participants');
      $existing = $builder->select('user_id')
         ->where('note_id', $noteId)
         ->where('status_participants', 'peserta')
         ->get()
         ->getResultArray();

      $existingIds = array_column($existing, 'user_id');
      $newIds = array_column($users, 'user_id');
      $toInsert = array_diff($newIds, $existingIds);
      $toDelete = array_diff($existingIds, $newIds);

      foreach ($toInsert as $userId) {
         $builder->insert([
            'note_id' => $noteId,
            'user_id' => $userId,
            'status_participants' => 'peserta',
            'create_at' => new RawSql('now()')
         ]);
      }

      if (!empty($toDelete)) {
         $builder->where('note_id', $noteId)
            ->whereIn('user_id', $toDelete)
            ->delete();
      }
   }

   private function syncNoteCategories(array $input, int $noteId): void
   {
      $builder = $this->db->table('tb_note_categories');

      // Ambil semua kategori yg sudah tersimpan untuk note_id ini
      $existing = $builder->select('category_id')
         ->where('note_id', $noteId)
         ->get()
         ->getResultArray();

      // Bentuk array category_id saja
      $existingIds = array_column($existing, 'category_id');

      // Ambil category_id dari input baru
      $newIds = array_column($input, 'value');

      // Hitung kategori yang perlu ditambahkan
      $toInsert = array_diff($newIds, $existingIds);

      // Hitung kategori yang perlu dihapus
      $toDelete = array_diff($existingIds, $newIds);

      // 🔁 INSERT yang belum ada
      foreach ($toInsert as $categoryId) {
         $builder->insert([
            'note_id'     => $noteId,
            'category_id' => $categoryId,
         ]);
      }

      // 🔁 DELETE yang tidak lagi dipilih
      if (!empty($toDelete)) {
         $builder->where('note_id', $noteId)
            ->whereIn('category_id', $toDelete)
            ->delete();
      }
   }

   private function insertPemimpinRapat(array $post): void
   {
      if (!empty($post['pemimpin_id'])) {
         $this->db->table('tb_participants')->insert([
            'note_id' => $post['note_id'],
            'user_id' => $post['pemimpin_id'],
            'status_participants' => 'pemimpin',
            'create_at' => new RawSql('now()')
         ]);
      }
   }

   private function insertModeratorRapat(array $post): void
   {
      if (!empty($post['moderator_id'])) {
         $this->db->table('tb_participants')->insert([
            'note_id' => $post['note_id'],
            'user_id' => $post['moderator_id'],
            'status_participants' => 'moderator',
            'create_at' => new RawSql('now()')
         ]);
      }
   }

   private function prepareSubQueryKategori(): string
   {
      $table = $this->db->table('tb_note_categories t');
      $table->select('t.note_id,
         json_agg(json_build_object(
            \'note_id\', t.note_id,
            \'value\', t.category_id,
            \'label\', t2.category_name
		   )) as kategori');
      $table->join('tb_categories t2', 't2.id = t.category_id');
      $table->groupBy('t.note_id');

      return $table->getCompiledSelect();
   }

   private function prepareSubQueryPeserta($status_participants = false): string
   {
      $table = $this->db->table('tb_participants t');
      $table->select('t.note_id,
         json_agg(json_build_object(
            \'participants_id\', t.id,
            \'note_id\', t.note_id,
            \'nama\', t2.full_name,
            \'email\', t2.email,
            \'nip\', t2.username,
            \'status\', t.status_participants
         )) as peserta');
      $table->join('tb_users t2', 't2.id = t.user_id');
      if ($status_participants) {
         $table->where('t.status_participants', 'peserta');
      }
      $table->groupBy('t.note_id');

      return $table->getCompiledSelect();
   }

   public function getData(array $post): array
   {
      $note_id = @$post['note_id'];
      $where_note_id = [null];
      if ($note_id) {
         $where_note_id = explode(',', $note_id);
      }

      $table = $this->db->table('tb_notes t');
      $table->select('t.*, t2.full_name as pemimpin, t2.username as pemimpin_username, t3.full_name as moderator, t3.username as moderator_username, coalesce(t4.kategori, \'[]\') as kategori, coalesce(t5.peserta, \'[]\') as peserta');
      $table->join('tb_users t2', 't2.id = t.pemimpin_id', 'left');
      $table->join('tb_users t3', 't3.id = t.moderator_id', 'left');
      $table->join('(' . new RawSql($this->prepareSubQueryKategori()) . ') t4', 't4.note_id = t.id', 'left');
      $table->join('(' . new RawSql($this->prepareSubQueryPeserta(true)) . ') t5', 't5.note_id = t.id', 'left');
      $this->searchData($table, $post, ['t.title', 't.agenda']);
      if (@$post['is_admin'] !== 'true' && !empty($where_note_id)) {
         $table->whereIn('t.id', $where_note_id);
      }
      $table->orderBy('t.id', 'desc');
      $table->limit((int) $post['limit'], (int) $post['offset']);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            if ($field === 'kategori') {
               $response[$key][$field] = json_decode($val['kategori'], true);
            } elseif ($field === 'peserta') {
               $response[$key][$field] = json_decode($val['peserta'], true);
            } else {
               $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
         }
      }

      return [
         'results' => $response,
         'total' => $this->countTotalData($post),
      ];
   }

   private function countTotalData(array $post): int
   {
      $note_id = @$post['note_id'];
      $where_note_id = [null];
      if ($note_id) {
         $where_note_id = explode(',', $note_id);
      }

      $table = $this->db->table('tb_notes');
      if (@$post['is_admin'] !== 'true' && !empty($where_note_id)) {
         $table->whereIn('id', $where_note_id);
      }

      return $table->countAllResults();
   }
}
