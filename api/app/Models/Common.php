<?php

namespace App\Models;

use CodeIgniter\Model;

class Common extends Model
{

   protected $db;

   public function __construct()
   {
      parent::__construct();

      $this->db = \Config\Database::connect();
   }

   public function cleanDataSubmit(array $fields, array $post): array
   {
      foreach ($fields as $field) {
         if (@$post[$field]) {
            $data[$field] = $post[$field];
         } else {
            $data[$field] = null;
         }
      }
      return $data;
   }

   public function getDaftarKategori(): array
   {
      $table = $this->db->table('tb_categories');
      $table->select('id as value, category_name as label');

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

   public function getOrCreateUser(array $post): ?int
   {
      if (empty($post)) {
         return null;
      }

      // 1. Coba cari apakah user sudah ada
      $table = $this->db->table('tb_users');
      $table->select('id')->where('username', $post['id']);
      $row = $table->get()->getRowArray();

      if ($row && isset($row['id'])) {
         return $row['id'];
      }

      // 2. Insert user baru
      try {
         $this->db->table('tb_users')->insert([
            'username'   => $post['id'],
            'email'      => !empty($post['kontak']) ? $post['kontak']['emailUinar'] : null,
            'full_name'  => $post['nama'],
         ]);
      } catch (\Exception $e) {
         // insert gagal, mungkin karena race condition atau data invalid
         log_message('error', 'Gagal insert user: ' . $e->getMessage());
      }

      // 3. Coba ambil lagi setelah insert
      $table = $this->db->table('tb_users');
      $table->select('id')->where('username', $post['id']);
      $row = $table->get()->getRowArray();

      return $row['id'] ?? null;
   }


   public function searchData($table, array $post, array $column_search)
   {
      $i = 0;
      foreach ($column_search as $item) {
         if (@$post['search']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($post['search'])));
            } else {
               $table->orLike('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($post['search'])));
            }

            if (count($column_search) - 1 === $i) {
               $table->groupEnd();
            }
         }
         $i++;
      }
   }
}
