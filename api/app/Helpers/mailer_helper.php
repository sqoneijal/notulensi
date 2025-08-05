<?php

use PHPMailer\PHPMailer\PHPMailer;

function send_email(string $judul, array $daftar_penerima, array $body)
{
   $mail = new PHPMailer(true);
   try {
      $mail->IsSMTP();
      $mail->Mailer = "smtp";

      $mail->SMTPDebug  = 0;
      $mail->SMTPAuth   = true;
      $mail->SMTPSecure = "tls";
      $mail->Port       = 587;
      $mail->Host       = "smtp.gmail.com";
      $mail->Username   = 'notulensi@ar-raniry.ac.id';
      $mail->Password   = 'wxvimfeunmielnsn';
      $mail->SMTPKeepAlive = true;
      $mail->IsHTML(true);
      foreach ($daftar_penerima as $row) {
         $mail->AddAddress($row['email'], $row['nama']);
      }
      $mail->SetFrom('notulensi@ar-raniry.ac.id', "Undangan");
      $mail->Subject = $judul;
      $content = template($body);

      $mail->MsgHTML($content);

      if (!$mail->Send()) {
         return ['status' => false];
      } else {
         return ['status' => true];
      }
      $mail->SmtpClose();
   } catch (\Exception $e) {
      return ['status' => false, 'msg_response' => $mail->ErrorInfo];
   }
}

function template(array $body)
{
   $path = FCPATH . 'logo.png'; // ubah SVG ke PNG dulu
   $type = pathinfo($path, PATHINFO_EXTENSION);
   $data = file_get_contents($path);
   $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

   return '
   <html>
   <head>
      <meta charset="UTF-8">
      <title>Undangan Rapat</title>
      <style>
         body {
            font-family: Arial, "Work Sans", "Noto Sans", sans-serif;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
         }
         .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
         }
         .header-img {
            width: 100%;
            height: auto;
            border-radius: 8px;
         }
         h1 {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #111518;
            margin: 20px 0 10px;
         }
         p {
            text-align: center;
            font-size: 14px;
            color: #111518;
            margin: 5px 0;
         }
         .details {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
         }
         .details td {
            border-top: 1px solid #dbe1e6;
            padding: 10px 0;
            font-size: 14px;
            color: #111518;
         }
         .details td.label {
            color: #60768a;
            width: 25%;
         }
         .button {
            display: inline-block;
            background-color: #0b80ee;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 20px;
         }
      </style>
   </head>
   <body>
      <div class="container">
         <img src="' . $base64 . '" alt="Meeting" class="header-img" />
         <h1>Undangan Rapat</h1>
         <p>' . $body['title'] . '</p>
         <table class="details">
            <tr>
               <td class="label">Tanggal</td>
               <td>' . date('d-m-Y', strtotime($body['meeting_date'])) . '</td>
            </tr>
            <tr>
               <td class="label">Jam</td>
               <td>' . date('g:i A', strtotime($body['meeting_date'])) . '</td>
            </tr>
            <tr>
               <td class="label">Lokasi</td>
               <td>' . $body['lokasi'] . '</td>
            </tr>
            <tr>
               <td class="label">Agenda</td>
               <td>' . $body['agenda'] . '</td>
            </tr>
         </table>
      </div>
   </body>
   </html>
   ';
}
