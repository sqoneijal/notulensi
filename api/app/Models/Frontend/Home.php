<?php

namespace App\Models\Frontend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;
use Config\Mimes;

class Home extends Common
{

   public function getData(): array
   {
      return [
         'banner' => $this->getBannerData(),
         'jadwalAgendaRapat' => $this->getJadwalAgendaRapat(),
         'gallery' => $this->getGallery()
      ];
   }

   private function getGallery(): array
   {
      $table = $this->db->table('tb_attachments');
      $table->groupStart();
      $table->whereIn('file_type', Mimes::$mimes['jpg']);
      $table->orWhereIn('file_type', Mimes::$mimes['jpeg']);
      $table->orWhereIn('file_type', Mimes::$mimes['jpe']);
      $table->orWhereIn('file_type', Mimes::$mimes['png']);
      $table->orWhereIn('file_type', [Mimes::$mimes['webp']]);
      $table->groupEnd();

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $response = [];
      foreach ($result as $row) {
         $response[] = $row['file_path'];
      }
      return $response;
   }

   private function getJadwalAgendaRapat(): array
   {
      $table = $this->db->table('tb_notes tn');
      $table->where('to_char(tn.meeting_date, \'MM\')', date('m'));
      $table->orderBy('tn.meeting_date');

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

   private function getBannerData(): array
   {
      $table = $this->db->table('tb_notes tn');
      $table->select('tn.*, tu.full_name, coalesce(tnc.kategori, \'[]\') as kategori');
      $table->join('tb_users tu', 'tu.id = tn.pemimpin_id');
      $table->join('(' . new RawSql($this->prepareSubQueryKategori()) . ') tnc', 'tnc.note_id = tn.id', 'left');
      $table->orderBy('tn.id', 'desc');
      $table->limit(1);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         $json_decode = ['kategori'];

         foreach ($fieldNames as $field) {
            if (in_array($field, $json_decode)) {
               $response[$field] = json_decode($data[$field], true);
            } else {
               $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
            }
         }
      }
      return $response;
   }

   private function prepareSubQueryKategori(): string
   {
      $table = $this->db->table('tb_note_categories tnc');
      $table->select('tnc.note_id,
         json_agg(json_build_object(
            \'id\', tnc.id,
            \'kategori\', tc.category_name
         )) as kategori');
      $table->join('tb_categories tc', 'tc.id = tnc.category_id');
      $table->groupBy('tnc.note_id');

      return $table->getCompiledSelect();
   }
}
