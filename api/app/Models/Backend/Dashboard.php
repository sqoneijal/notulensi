<?php

namespace App\Models\Backend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Dashboard extends Common
{

   public function getAppUser(array $post): array
   {
      $check = $this->checkExistsUsers($post['username']);

      if (!$check) {
         $this->insertUsers($post['simpeg']);
      } else {
         $this->updateUsers($post['simpeg']);
      }

      return $this->getRowAppUser($post['username']);
   }

   private function updateUsers(string $data): void
   {
      $post = json_decode($data, true);
      $unitKerjaSaatIni = $post['unitKerjaSaatIni'];
      $level = (@$unitKerjaSaatIni[0]['posisi']['kategori'] === 1 ? 'bos' : 'default');

      $table = $this->db->table('tb_users');
      $table->where('username', $post['id']);
      $table->update([
         'email' => @$post['kontak']['emailPribadi'] ?? null,
         'full_name' => $post['nama'],
         'level' => $level
      ]);
   }

   private function insertUsers(string $data): void
   {
      $post = json_decode($data, true);
      $unitKerjaSaatIni = $post['unitKerjaSaatIni'];
      $level = (@$unitKerjaSaatIni[0]['posisi']['kategori'] === 1 ? 'bos' : 'default');

      $this->db->table('tb_users')->insert([
         'username' => $post['id'],
         'email' => @$post['kontak']['emailPribadi'] ?? null,
         'full_name' => $post['nama'],
         'level' => $level
      ]);
   }

   private function getRowAppUser(string $username): array
   {
      $table = $this->db->table('tb_users tu');
      $table->select('tu.*, coalesce(tn.note_id_petugas, \'[]\') as note_id_petugas, coalesce(tn2.note_id_pemimpin, \'[]\') as note_id_pemimpin');
      $table->join('(' . new RawSql($this->prepareFunctionNotesPetugas()) . ') tn', 'tn.moderator_id = tu.id', 'left');
      $table->join('(' . new RawSql($this->prepareFunctionNotesPemimpin()) . ') tn2', 'tn2.pemimpin_id = tu.id', 'left');
      $table->where('tu.username', $username);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         $decode = ['note_id_petugas', 'note_id_pemimpin'];

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

   private function checkExistsUsers(string $username): bool
   {
      $table = $this->db->table('tb_users');
      $table->where('username', $username);

      return $table->countAllResults() > 0 ? true : false;
   }

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
