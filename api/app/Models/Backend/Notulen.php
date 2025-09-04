<?php

namespace App\Models\Backend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Notulen extends Common
{

   public function handleKirimUndangan(array $post): array
   {
      $result = ['status' => false, 'message' => 'Undangan gagal terkirim, silahkan coba lagi.'];
      try {
         helper('mailer');

         $peserta = json_decode($post['peserta'], true);
         $note = $this->getDetail($post['note_id']);

         if (!empty($peserta)) {
            $daftar_penerima = [];
            foreach ($peserta as $row) {
               array_push($daftar_penerima, [
                  'email' => $row['email'],
                  'nama' => $row['nama']
               ]);
            }

            $send_email = send_email($note['content']['title'], $daftar_penerima, $note['content']);

            if ($send_email) {
               $result = ['status' => true, 'message' => 'Undangan berhasil dikirim.'];
            }
         }
      } catch (\Exception $e) {
         $result = ['status' => false, 'message' => $e->getMessage()];
      }
      return $result;
   }

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
         'daftarKategori' => $this->getDaftarKategori(),
         'daftarKeywords' => $this->getDaftarKeywords()
      ];
   }

   private function getDaftarKeywords(): array
   {
      $table = $this->db->table('tb_notes_keywords');
      $table->select('keyword as label, id as value');
      $table->orderBy('keyword');

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

   public function getDetail(int $id): array
   {
      try {
         $table = $this->db->table('tb_notes tn');
         $table->select('tn.*, tu.full_name as pemimpin, tu.username as nip_pemimpin, tu2.full_name as moderator, tu2.username as nip_moderator');
         $table->join('tb_users tu', 'tu.id = tn.pemimpin_id', 'left');
         $table->join('tb_users tu2', 'tu2.id = tn.moderator_id', 'left');
         $table->where('tn.id', $id);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
            }

            $response['kategori'] = $this->getNotesCategories($id);
            $response['peserta'] = $this->getDaftarPesertaRapat($id);
            $response['presensi'] = $this->getDaftarPresensi($id);
            $response['butir_tugas'] = $this->getDaftarButirTugas($id);
            $response['lampiran'] = $this->getDaftarLampiran($id);
            $response['keywords'] = $this->getDaftarKeywordsDetail($id);
         }

         return ['status' => true, 'content' => $response];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function getDaftarKeywordsDetail(int $note_id): array
   {
      $table = $this->db->table('tb_notes_keywords');
      $table->select('id, note_id, keyword as label, slug as value');
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

   private function getDaftarButirTugas(int $note_id): array
   {
      $table = $this->db->table('tb_action_item_details');
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

   private function getDaftarPresensi(int $note_id): array
   {
      $table = $this->db->table('tb_participants tp');
      $table->select('ta.attendance_time, ta.status, tp.id as participant_id');
      $table->join('tb_attendances ta', 'ta.participant_id = tp.id and ta.note_id = tp.note_id');
      $table->where('tp.note_id', $note_id);

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

   private function getDaftarPesertaRapat(int $note_id): array
   {
      $table = $this->db->table('tb_participants tp');
      $table->select('tp.id as participants_id, tp.note_id, tu.full_name as nama, tu.email as email, tu.username as nip, tp.status_participants');
      $table->join('tb_users tu', 'tu.id = tp.user_id');
      $table->where('tp.note_id', $note_id);

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

   private function getNotesCategories(int $note_id): array
   {
      $table = $this->db->table('tb_note_categories tnc');
      $table->select('tnc.note_id, tnc.id as value, tc.category_name as label');
      $table->join('tb_categories tc', 'tc.id = tnc.category_id');
      $table->where('tnc.note_id', $note_id);

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

         if (@$post['keywords']) {
            $keywords = json_decode($post['keywords'], true);
            if (!empty($keywords)) {
               $this->syncNoteKeywords($keywords, $data['note_id']);
            }
         }

         $this->handleModeratorParticipants($data);
         $this->handlePemimpinParticipants($data);

         return ['status' => true, 'message' => 'Data berhasil disimpan.', 'note_id' => $this->getNoteIDList($post['user_modified'])];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function handlePemimpinParticipants(array $post): void
   {
      $table = $this->db->table('tb_participants');
      $table->where('status_participants', 'pemimpin');
      $table->where('note_id', $post['note_id']);
      $table->where('user_id', $post['pemimpin_id']);

      $found = $table->countAllResults() > 0 ? true : false;

      if (!$found) {
         $this->db->table('tb_participants')->where([
            'note_id' => $post['note_id'],
            'status_participants' => 'pemimpin',
         ])->delete();

         $this->db->table('tb_participants')->ignore(true)->insert([
            'note_id' => $post['note_id'],
            'user_id' => $post['pemimpin_id'],
            'status_participants' => 'pemimpin',
            'create_at' => new RawSql('now()')
         ]);
      }
   }

   private function handleModeratorParticipants(array $post): void
   {
      $table = $this->db->table('tb_participants');
      $table->where('status_participants', 'moderator');
      $table->where('note_id', $post['note_id']);
      $table->where('user_id', $post['moderator_id']);

      $found = $table->countAllResults() > 0 ? true : false;

      if (!$found) {
         $this->db->table('tb_participants')->where([
            'note_id' => $post['note_id'],
            'status_participants' => 'moderator',
         ])->delete();

         $this->db->table('tb_participants')->ignore(true)->insert([
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

         if (@$post['keywords']) {
            $keywords = json_decode($post['keywords'], true);
            if (!empty($keywords)) {
               $this->syncNoteKeywords($keywords, $data['note_id']);
            }
         }

         return ['status' => true, 'message' => 'Data berhasil disimpan.', 'note_id' => $this->getNoteIDList($post['user_modified'])];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function syncNoteKeywords(array $keywordsLists, int $note_id): void
   {
      $this->db->table('tb_notes_keywords')
         ->where('note_id', $note_id)
         ->delete();

      $data = [];
      foreach ($keywordsLists as $row) {
         array_push($data, [
            'note_id' => $note_id,
            'keyword' => ucwords(strtolower($row['label'])),
            'slug' => url_title($row['label'], '-', true),
         ]);
      }

      if (!empty($data)) {
         $this->db->table('tb_notes_keywords')->insertBatch($data);
      }
   }

   private function getNoteIDList(string $username): array
   {
      $table = $this->db->table('tb_users tu');
      $table->select('coalesce(tn.note_id_petugas, \'[]\') as note_id_petugas, coalesce(tn2.note_id_pemimpin, \'[]\') as note_id_pemimpin');
      $table->join('(' . new RawSql($this->prepareFunctionNotesPetugas()) . ') tn', 'tn.moderator_id = tu.id', 'left');
      $table->join('(' . new RawSql($this->prepareFunctionNotesPemimpin()) . ') tn2', 'tn2.pemimpin_id = tu.id', 'left');
      $table->where('tu.username', $username);

      $get = $table->get();
      $data = $get->getRowArray();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         $response['note_id_pemimpin'] = json_decode($data['note_id_pemimpin'], true);
         $response['note_id_petugas'] = json_decode($data['note_id_petugas'], true);
      }
      return $response;
   }

   private function prepareFunctionNotesPemimpin(): string
   {
      $table = $this->db->table('tb_notes tn');
      $table->select('tn.pemimpin_id, json_agg(tn.id) as note_id_pemimpin');
      $table->groupBy('tn.pemimpin_id');

      return $table->getCompiledSelect();
   }

   private function prepareFunctionNotesPetugas(): string
   {
      $table = $this->db->table('tb_notes tn');
      $table->select('tn.moderator_id, json_agg(tn.id) as note_id_petugas');
      $table->groupBy('tn.moderator_id');

      return $table->getCompiledSelect();
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
         $builder->ignore(true)->insert([
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
      $this->db->table('tb_participants')->where([
         'note_id' => $post['note_id'],
         'user_id' => $post['pemimpin_id']
      ])->delete();

      $this->db->table('tb_participants')->insert([
         'note_id' => $post['note_id'],
         'user_id' => $post['pemimpin_id'],
         'status_participants' => 'pemimpin',
         'create_at' => new RawSql('now()')
      ]);
   }

   private function insertModeratorRapat(array $post): void
   {
      $this->db->table('tb_participants')->where([
         'note_id' => $post['note_id'],
         'user_id' => $post['moderator_id']
      ])->delete();

      $this->db->table('tb_participants')->insert([
         'note_id' => $post['note_id'],
         'user_id' => $post['moderator_id'],
         'status_participants' => 'moderator',
         'create_at' => new RawSql('now()')
      ]);
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
      $table->select('t.*, t2.full_name as pemimpin, t2.username as pemimpin_username, t3.full_name as moderator, t3.username as moderator_username, coalesce(t4.kategori, \'[]\') as kategori, coalesce(t5.peserta, \'[]\') as peserta, coalesce(tnk.keywords, \'[]\') as keywords');
      $table->join('tb_users t2', 't2.id = t.pemimpin_id', 'left');
      $table->join('tb_users t3', 't3.id = t.moderator_id', 'left');
      $table->join('(' . new RawSql($this->prepareSubQueryKategori()) . ') t4', 't4.note_id = t.id', 'left');
      $table->join('(' . new RawSql($this->prepareSubQueryPeserta(true)) . ') t5', 't5.note_id = t.id', 'left');
      $table->join('(' . new RawSql($this->prepareSubQueryKeywords()) . ') tnk', 'tnk.note_id = t.id', 'left');
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

      $json_decode = ['kategori', 'peserta', 'keywords'];

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            if (in_array($field, $json_decode)) {
               $response[$key][$field] = json_decode($val[$field], true);
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

   private function prepareSubQueryKeywords(): string
   {
      $table = $this->db->table('tb_notes_keywords');
      $table->select('note_id,
		json_agg(json_build_object(
			\'id\', id,
			\'note_id\', note_id,
			\'label\', keyword,
			\'value\', slug
		)) as keywords');
      $table->groupBy('note_id');

      return $table->getCompiledSelect();
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
