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

   public function insertUsers($username)
   {
      $table = $this->db->table('tb_users');
      $table->insert(['username' => $username]);

      return $this->checkExistsUsers($username);
   }

   public function checkExistsUsers($username): int
   {
      $table = $this->db->table('tb_users');
      $table->select('id');
      $table->where('username', $username);

      $get = $table->get();
      $data = $get->getRowArray();
      $get->freeResult();

      if (isset($data)) {
         return $data['id'];
      } else {
         return $this->insertUsers($username);
      }
   }
}
