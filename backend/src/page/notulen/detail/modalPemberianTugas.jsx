import { setModule } from "@/redux";
import { detail } from "@components/detail";
import EditorTinymce from "@components/editorTinymce";
import { Date } from "@helpers/date";
import dompurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import { useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ModalPemberianTugas = () => {
   const { module } = useSelector((e) => e.redux);
   const { openModalPemberianTugas, detailPeserta } = module;
   const dispatch = useDispatch();
   const editorRef = useRef(null);

   const [{ input, errors }, setState] = useState({
      input: {},
      errors: {},
   });

   const handleClose = () => {
      dispatch(setModule({ ...module, openModalPemberianTugas: false, detailPeserta: {} }));
   };

   const setInput = (name, value) => {
      setState((prev) => ({ ...prev, input: { ...prev.input, [name]: value } }));
   };

   return (
      <Modal show={openModalPemberianTugas} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
         <Modal.Header closeButton>
            <Modal.Title>Butir Tugas</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               {detail("NIP", detailPeserta?.nip, { md: 6 })}
               {detail("Nama", detailPeserta?.nama, { md: 6 })}
            </Row>
            <Row className="mt-2">
               <Date
                  label="Tenggat Waktu"
                  name="due_date"
                  errors={errors}
                  value={input?.due_date ? moment(input.due_date, "YYYY-MM-DD").toDate() : null}
                  onChange={(date) => setInput("due_date", moment(date).toDate())}
                  col={{ md: 4 }}
               />
            </Row>
            <Row>
               <Col xs={12}>
                  <label className="form-label" htmlFor="deskripsi">
                     Deskripsi
                  </label>
                  <EditorTinymce
                     initialValue={dompurify.sanitize(decode(module.decisions), { format: "html5" })}
                     onInit={(_evt, editor) => (editorRef.current = editor)}
                  />
               </Col>
            </Row>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
               Save Changes
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
export default ModalPemberianTugas;
