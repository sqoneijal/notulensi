<?php

namespace App\Models\Backend\Referensi;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Kategori extends Common
{

   public function handleDelete(int $id): array
   {
      try {
         $table = $this->db->table('tb_categories');
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
         $data = $this->cleanDataSubmit(['category_name'], $post);
         $data['update_at'] = new RawSql('now()');

         $table = $this->db->table('tb_categories');
         $table->where('id', $id);
         $table->update($data);

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function createData(array $post): array
   {
      try {
         $data = $this->cleanDataSubmit(['category_name'], $post);
         $data['create_at'] = new RawSql('now()');

         $table = $this->db->table('tb_categories');
         $table->insert($data);

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function countTotalData(): int
   {
      $table = $this->db->table('tb_categories');
      return $table->countAllResults();
   }

   public function getData(array $post): array
   {
      $table = $this->db->table('tb_categories');
      $this->searchData($table, $post, ['category_name']);
      $table->orderBy('id', 'desc');
      $table->limit((int) $post['limit'], (int) $post['offset']);

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
         'total' => $this->countTotalData()
      ];
   }
}
