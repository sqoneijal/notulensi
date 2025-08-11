import { detail } from "@components/detail";
import moment from "moment";
import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Umum = () => {
   const { module } = useSelector((e) => e.redux);

   const renderKategori = (list) => {
      return (
         list.length > 0 && (
            <ul className="fw-bold list-group list-group-horizontal-sm">
               {list.map((row, index) => {
                  return (
                     <li className={`list-group-item ${index === 0 ? "border-left-primary" : ""}`} key={row.value}>
                        {row.label}
                     </li>
                  );
               })}
            </ul>
         )
      );
   };

   const renderKeywords = (list) => {
      return (
         list.length > 0 && (
            <ul className="fw-bold list-group list-group-horizontal-sm">
               {list.map((row, index) => {
                  return (
                     <li className={`list-group-item ${index === 0 ? "border-left-success" : ""}`} key={row.value}>
                        {row.label}
                     </li>
                  );
               })}
            </ul>
         )
      );
   };

   return (
      <React.Fragment>
         <Row>
            {detail("Tanggal Rapat", moment(module.meeting_date).format("DD-MM-YYYY hh:mm A"), { md: 2 })}
            {detail("Judul Rapat", module.title, { md: 10 })}
         </Row>
         <Row>{detail("Agenda", module.agenda)}</Row>
         <Row>
            {detail("Pemimpin Rapat", `${module.pemimpin} | ${module.nip_pemimpin}`, { md: 6 })}
            {detail("Petugas Notulensi", `${module.moderator} | ${module.nip_moderator}`, { md: 6 })}
         </Row>
         <Row>{detail("Lokasi Rapat", module.lokasi, { md: 12 })}</Row>
         <Row>
            {detail("Kategori", renderKategori(module.kategori), { md: 6 })}
            {detail("Keywords", renderKeywords(module.keywords), { md: 6 })}
         </Row>
      </React.Fragment>
   );
};
export default Umum;
