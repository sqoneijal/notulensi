import { setModule } from "@/redux";
import { detail } from "@components/detail";
import EditorTinymce from "@components/editorTinymce";
import { Date } from "@helpers/date";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue } from "@helpers/request";
import dompurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const ModalPemberianTugas = ({ getDetail }) => {
   const { module } = useSelector((e) => e.redux);
   const { openModalPemberianTugas, detailPeserta } = module;
   const dispatch = useDispatch();
   const editorRef = useRef(null);
   const { id } = useParams();

   const [{ input, errors, isSubmit }, setState] = useState({
      input: {},
      errors: {},
      isSubmit: false,
   });

   useEffect(() => {
      if (openModalPemberianTugas && Object.keys(detailPeserta).length > 0) {
         const due_date = typeof detailPeserta?.due_date === "undefined" ? "" : detailPeserta?.due_date;
         setState((prev) => ({ ...prev, input: { ...prev.input, due_date } }));
      }
      return () => {};
   }, [openModalPemberianTugas, detailPeserta]);

   const handleClose = () => {
      dispatch(setModule({ ...module, openModalPemberianTugas: false, detailPeserta: {} }));
      setInput({ input: {}, errors: {}, isSubmit: false });
   };

   const setInput = (name, value) => {
      setState((prev) => ({ ...prev, input: { ...prev.input, [name]: value } }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isSubmit: true }));

      const fetch = post(
         "/notulen/submit-butir-tugas",
         postValue({ ...input, note_id: id, description: editorRef.current.getContent(), assigned_to: detailPeserta.participants_id })
      );
      fetch.then(({ data }) => {
         setState((prev) => ({ ...prev, errors: data.errors }));

         if (data.status) {
            msgSuccess(data.message);
            handleClose();
            getDetail(id);
            return;
         }

         msgError(data.message);
      });
      fetch.finally(() => setState((prev) => ({ ...prev, isSubmit: false })));
   };

   return (
      <Modal show={openModalPemberianTugas} onHide={handleClose} size="lg" backdrop="static">
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
                  value={input?.due_date ? moment(input.due_date, "YYYY-MM-DD").format("YYYY-MM-DD") : null}
                  onChange={(date) => setInput("due_date", moment(date).format("YYYY-MM-DD"))}
                  col={{ md: 4 }}
               />
            </Row>
            <Row>
               <Col xs={12}>
                  <label className="form-label" htmlFor="deskripsi">
                     Deskripsi
                  </label>
                  <EditorTinymce
                     initialValue={dompurify.sanitize(decode(detailPeserta?.description), { format: "html5" })}
                     onInit={(_evt, editor) => (editorRef.current = editor)}
                  />
               </Col>
            </Row>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmit}>
               {isSubmit ? "Loading..." : "Simpan"}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
export default ModalPemberianTugas;
