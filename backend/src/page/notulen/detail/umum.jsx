import { detail } from "@components/detail";
import moment from "moment";
import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Umum = () => {
   const { module } = useSelector((e) => e.redux);

   return (
      <React.Fragment>
         <Row>
            {detail("Tanggal Rapat", moment(module.meeting_date).format("DD-MM-YYYY hh:mm A"), { md: 2 })}
            {detail("Judul Rapat", module.title, { md: 10 })}
         </Row>
         <Row>{detail("Agenda", module.agenda)}</Row>
         <Row>
            {detail("Pemimpin Rapat", `${module.pemimpin} | ${module.nip_pemimpin}`, { md: 6 })}
            {detail("Moderator Rapat", `${module.moderator} | ${module.nip_moderator}`, { md: 6 })}
         </Row>
      </React.Fragment>
   );
};
export default Umum;
