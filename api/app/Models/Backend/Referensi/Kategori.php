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

   public function submit(array $post): array
   {
      try {
         $fields = ['category_name'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $table = $this->db->table('tb_categories');

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

   private function countTotalData(): int
   {
      $table = $this->db->table('tb_categories');
      return $table->countAllResults();
   }

   public function getData(): array
   {
      $table = $this->db->table('tb_categories');
      $table->orderBy('id', 'desc');

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
