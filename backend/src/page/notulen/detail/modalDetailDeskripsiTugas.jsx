import { setModule } from "@/redux";
import { detail } from "@components/detail";
import dompurify from "dompurify";
import { decode } from "html-entities";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ModalDetailDeskripsiTugas = () => {
   const { module } = useSelector((e) => e.redux);
   const { detailDeskripsi, openModalDetailDeskripsiTugas } = module;
   const dispatch = useDispatch();

   const handleClose = () => {
      dispatch(setModule({ ...module, detailDeskripsi: {}, openModalDetailDeskripsiTugas: false }));
   };

   return (
      <Modal show={openModalDetailDeskripsiTugas} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Deskripsi</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               {detail("NIP", detailDeskripsi?.nip, { md: 6 })}
               {detail("Nama", detailDeskripsi?.nama, { md: 6 })}
            </Row>
            <Row>
               <Col
                  className="text-wrap fw-light"
                  xs={12}
                  dangerouslySetInnerHTML={{ __html: dompurify.sanitize(decode(detailDeskripsi?.description), { format: "html5" }) }}
               />
            </Row>
         </Modal.Body>
      </Modal>
   );
};
export default ModalDetailDeskripsiTugas;
