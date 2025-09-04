import { detail } from "@components/detail";
import { Each } from "@helpers/each";
import dompurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake.min.js";
import "pdfmake/build/vfs_fonts.js";
import React from "react";
import { Button, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

const CetakHasilNotulensi = () => {
   const { module } = useSelector((e) => e.redux);

   const renderKategoridanKeywords = (list) => {
      const data = [];
      list.map((row) => {
         data.push(row.label);
      });
      return data.join(", ");
   };

   const renderPresensi = (elem) => {
      if (typeof elem === "object" && elem !== null) {
         return elem.attendance_time ? moment(elem.attendance_time).format("hh:mm A") : `-`;
      }
      return `-`;
   };

   const getStatusPresesnsi = (data) => {
      return data.reduce((acc, item) => {
         acc[item.participant_id] = item;
         return acc;
      }, {});
   };

   const getStatusPresensi = (elem) => {
      if (typeof elem === "object") {
         return elem.status;
      }
   };

   const getTugas = (data) => {
      return data.reduce((acc, item) => {
         acc[item.assigned_to] = item;
         return acc;
      }, {});
   };

   const handleCetak = (e) => {
      e.preventDefault();

      const docDefinition = {
         content: [
            { text: "Informasi Rapat", style: "header" },
            { text: " " },
            {
               table: {
                  body: [
                     ["Tanggal", ":", moment(module.meeting_date).format("DD-MM-YYYY hh:mm A")],
                     ["Judul", ":", module?.title],
                     ["Agenda", ":", module?.agenda],
                     ["Pemimpin", ":", `${module.pemimpin} | ${module.nip_pemimpin}`],
                     ["Petugas Notulen", ":", `${module.moderator} | ${module.nip_moderator}`],
                     ["Lokasi", ":", module.lokasi],
                     ["Kategori", ":", renderKategoridanKeywords(module.kategori)],
                     ["Keywords", ":", renderKategoridanKeywords(module.keywords)],
                  ],
               },
               layout: "noBorders",
               fontSize: 11,
            },
            { text: " " },
            { text: " " },
            { text: "Peserta Rapat", style: "header" },
            { text: " " },
            {
               table: {
                  body: [
                     ["No", "NIP", "Nama", "Email", "Presensi", "Status"],
                     ...module.peserta.map((p, i) => [
                        i + 1,
                        p.nip,
                        p.nama,
                        p.email,
                        renderPresensi(getStatusPresesnsi(module.presensi)?.[p.participants_id]),
                        getStatusPresensi(getStatusPresesnsi(module.presensi)?.[p.participants_id])
                           ?.toLowerCase()
                           .replace(/\b[a-z]/g, (letter) => letter.toUpperCase()) || "",
                     ]),
                  ],
               },
               fontSize: 11,
            },
            /* {
               stack: [
                  { text: "Tanggal Rapat", bold: true }, // label
                  { text: "18-09-2025 04:30 PM" }, // isi
               ],
               margin: [0, 5, 0, 10],
            },
            {
               table: {
                  headerRows: 1,
                  widths: ["auto", "*", "auto"],
                  body: [
                     ["NIM", "Nama", "Jurusan"],
                     ["160101", "Budi Santoso", "Informatika"],
                     ["160102", "Siti Aminah", "Sistem Informasi"],
                     ["160103", "Rizky", "Teknik Komputer"],
                  ],
               },
            },

            { text: " " },
            { text: "Dibuat otomatis pada: " + new Date().toLocaleDateString() }, */
         ],
         styles: {
            header: {
               fontSize: 14,
               bold: true,
               alignment: "center",
            },
         },
      };

      pdfMake.createPdf(docDefinition).open();
   };

   return (
      <React.Fragment>
         <Button variant="success" onClick={handleCetak}>
            Cetak
         </Button>
         <Row>
            <h4 className="text-center">Informasi Rapat</h4>
            {detail("Tanggal Rapat", moment(module.meeting_date).format("DD-MM-YYYY hh:mm A"))}
            {detail("Judul Rapat", module.title)}
            {detail("Agenda", module.agenda)}
            {detail("Pemimpin Rapat", `${module.pemimpin} | ${module.nip_pemimpin}`)}
            {detail("Petugas Notulensi", `${module.moderator} | ${module.nip_moderator}`)}
            {detail("Lokasi Rapat", module.lokasi)}
            {detail("Kategori", renderKategoridanKeywords(module.kategori))}
            {detail("Keywords", renderKategoridanKeywords(module.keywords))}
         </Row>
         <Row className="mt-3">
            <h4 className="text-center">Peserta Rapat</h4>
            <Table size="sm">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "5%" }}>
                        No
                     </th>
                     <th>NIP</th>
                     <th>Nama</th>
                     <th>Email</th>
                     <th className="text-center">Presensi</th>
                     <th className="text-center" style={{ width: "10%" }}>
                        Status
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <Each
                     of={module.peserta}
                     render={(row, index) => {
                        const uuid = v4();

                        return (
                           <tr key={`${row.nip}-${uuid}`} style={{ verticalAlign: "middle" }}>
                              <td className="text-center">{index + 1}</td>
                              <td>{row.nip}</td>
                              <td>{row.nama}</td>
                              <td>{row.email}</td>
                              <td className="text-center">{renderPresensi(getStatusPresesnsi(module.presensi)?.[row.participants_id])}</td>
                              <td className="text-center">
                                 {getStatusPresensi(getStatusPresesnsi(module.presensi)?.[row.participants_id])
                                    ?.toLowerCase()
                                    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase()) || ""}
                              </td>
                           </tr>
                        );
                     }}
                  />
               </tbody>
            </Table>
         </Row>
         <Row className="mt-3">
            <h4 className="text-center">Butir Tugas</h4>
            <Table size="sm">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "2%" }}>
                        No
                     </th>
                     <th style={{ width: "12%" }}>NIP</th>
                     <th>Nama</th>
                     <th className="text-center" style={{ width: "10%" }}>
                        Tenggat Waktu
                     </th>
                     <th>Deskripsi</th>
                  </tr>
               </thead>
               <tbody>
                  <Each
                     of={module.peserta}
                     render={(row, index) => {
                        const getIsiTugas = getTugas(module.butir_tugas)?.[row.participants_id];
                        const tugas = typeof getIsiTugas === "undefined" ? {} : getIsiTugas;
                        const uuid = v4();

                        return (
                           <tr key={`${row.nip}-${uuid}`}>
                              <td className="text-center">{index + 1}</td>
                              <td>{row.nip}</td>
                              <td>{row.nama}</td>
                              <td className="text-center">{tugas?.due_date ? moment(tugas?.due_date).format("DD-MM-YYYY") : "-"}</td>
                              <td
                                 dangerouslySetInnerHTML={{
                                    __html: dompurify.sanitize(decode(tugas?.description), { format: "html5" }),
                                 }}
                              />
                           </tr>
                        );
                     }}
                  />
               </tbody>
            </Table>
         </Row>
         <Row className="mt-3">
            <h4 className="text-center">Poin - Poin Diskusi</h4>
            <div dangerouslySetInnerHTML={{ __html: dompurify.sanitize(decode(module.discussion_points), { format: "html5" }) }} />
         </Row>
         <Row className="mt-3">
            <h4 className="text-center">Hasil Keputusan</h4>
            <div dangerouslySetInnerHTML={{ __html: dompurify.sanitize(decode(module.decisions), { format: "html5" }) }} />
         </Row>
         <Row className="mt-3">
            <h4 className="text-center">Lampiran</h4>
            <Table size="sm">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: "5%" }}>
                        No
                     </th>
                     <th>Nama Lampiran</th>
                     <th className="text-center">Link/URL</th>
                  </tr>
               </thead>
               <tbody className="lampiran-tbody">
                  {module?.lampiran.length > 0 ? (
                     <Each
                        of={module?.lampiran}
                        render={(row, index) => (
                           <tr key={row.id}>
                              <td className="text-center">{index + 1}</td>
                              <td>{row.file_name}</td>
                              <td>{row.file_path}</td>
                           </tr>
                        )}
                     />
                  ) : (
                     <tr>
                        <td colSpan={3} className="text-center">
                           Tidak ada lampiran!
                        </td>
                     </tr>
                  )}
               </tbody>
            </Table>
         </Row>
      </React.Fragment>
   );
};
export default CetakHasilNotulensi;
