import { setModule } from "@/redux";
import { DropzoneUpload, FormText } from "@helpers/forms";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue, put } from "@helpers/request";
import { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const FormsLampiran = () => {
   const { module } = useSelector((e) => e.redux);
   const { openFormsLampiran, detailLampiran } = module;
   const dispatch = useDispatch();

   const [{ errors, input, isSubmit }, setState] = useState({
      input: {},
      errors: {},
      isSubmit: false,
   });

   useEffect(() => {
      if (openFormsLampiran && typeof detailLampiran !== "undefined" && Object.keys(detailLampiran).length > 0) {
         setState((prev) => ({ ...prev, input: detailLampiran }));
      }
      return () => {};
   }, [openFormsLampiran, detailLampiran]);

   const handleClose = () => {
      dispatch(setModule({ ...module, openFormsLampiran: false, detailLampiran: {} }));
      setState({
         input: {},
         errors: {},
         isSubmit: false,
      });
   };

   const setInput = (name, value) => {
      setState((prev) => ({ ...prev, input: { ...prev.input, [name]: value } }));
   };

   const handleFile = (file) => {
      setState((prev) => ({ ...prev, input: { ...prev.input, file_lampiran: file, file_type: file.type } }));
   };

   const createOrUpdate = async () => {
      const apiCall =
         openFormsLampiran && typeof detailLampiran !== "undefined" && Object.keys(detailLampiran).length > 0
            ? () => put(`/notulen/lampiran/${detailLampiran.id}`, { ...input, ...{ note_id: module.note_id } })
            : () => post("/notulen/lampiran", postValue({ ...input, ...{ note_id: module.note_id } }));
      return apiCall();
   };

   const handleSubmit = async () => {
      setState((prev) => ({ ...prev, isSubmit: true }));

      try {
         const res = await createOrUpdate();
         const { data } = res;

         setState((prev) => ({ ...prev, errors: { ...data.errors } }));

         if (data.status) {
            dispatch(setModule({ ...module, lampiran: data.content, openFormsLampiran: false, detailLampiran: {} }));
            msgSuccess(data.message);
            setState({
               input: {},
               errors: {},
               isSubmit: false,
            });
            return;
         }

         msgError(data.message);
      } catch (error) {
         msgError(error.message);
      } finally {
         setState((prev) => ({ ...prev, isSubmit: false }));
      }
   };

   return (
      <Modal show={openFormsLampiran} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Lampiran</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               <FormText
                  label="Nama Dokumen"
                  name="file_name"
                  errors={errors}
                  value={input?.file_name || ""}
                  onChange={(e) => setInput("file_name", e.target.value)}
               />
            </Row>
            <Row>
               <DropzoneUpload onFileSelect={handleFile} label="Klik atau seret file lampiran ke sini" />
            </Row>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={() => (isSubmit ? null : handleSubmit())} disabled={isSubmit}>
               {isSubmit ? "Loading..." : "Simpan"}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
export default FormsLampiran;
