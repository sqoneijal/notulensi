import { setInit } from "@/redux";
import { Date } from "@helpers/date";
import { AsyncFormTypeahead, DropzoneUpload, FormText, FormTextArea, FormTypeaheadMultiple } from "@helpers/forms";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue, put } from "@helpers/request";
import { cariPegawai } from "@helpers/simpeg";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Forms = () => {
   const { init, module } = useSelector((e) => e.redux);
   const { pemimpin, token } = init;
   const { detailUpdate } = module;
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [{ errors, input, isSubmit, isLoadingSearch, dropdown, selected }, setState] = useState({
      errors: {},
      input: {},
      isSubmit: false,
      isLoadingSearch: false,
      dropdown: { daftarPegawai: [] },
      peserta_rapat: [],
      selected: {
         moderator: [],
         kategori: [],
         peserta_rapat: [],
      },
   });

   useEffect(() => {
      if (typeof detailUpdate !== "undefined" && Object.keys(detailUpdate).length > 0) {
         setState((prev) => ({
            ...prev,
            input: {
               id: detailUpdate.id,
               title: detailUpdate.title,
               agenda: detailUpdate.agenda,
               meeting_date: detailUpdate.meeting_date,
               moderator: [{ value: detailUpdate.moderator_id, label: detailUpdate.moderator, id: detailUpdate.moderator_username }],
               lokasi: detailUpdate.lokasi,
            },
            selected: {
               ...prev.selected,
               moderator: [
                  {
                     value: detailUpdate.moderator_id,
                     label: `${detailUpdate.moderator} | ${detailUpdate.moderator_username}`,
                     id: detailUpdate.moderator_username,
                  },
               ],
               kategori: detailUpdate.kategori,
               peserta_rapat: detailUpdate.peserta.map((row) => ({ ...row, id: row.nip, value: row.nip, label: `${row.nama} | ${row.nip}` })),
            },
         }));
      }
      return () => {};
   }, [detailUpdate]);

   const createOrUpdate = async () => {
      const moderator = JSON.stringify(selected.moderator.length > 0 ? selected.moderator[0] : []);
      const kategori = JSON.stringify(selected.kategori.length > 0 ? selected.kategori : []);
      const peserta_rapat = JSON.stringify(selected.peserta_rapat.length > 0 ? selected.peserta_rapat : []);

      const nip = { pemimpin: JSON.stringify(pemimpin), moderator };
      const combined = { ...input, ...nip, ...{ kategori }, ...{ peserta_rapat } };

      const apiCall =
         detailUpdate && Object.keys(detailUpdate).length > 0
            ? () => put(`/notulen/${detailUpdate.id}`, combined)
            : () => post("/notulen", postValue(combined));
      return apiCall();
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, isSubmit: true }));

      try {
         const res = await createOrUpdate();
         const { data } = res;

         setState((prev) => ({ ...prev, errors: { ...data.errors } }));

         if (data.status) {
            dispatch(
               setInit({
                  ...init,
                  userApp: { ...init.userApp, note_id_pemimpin: data.note_id.note_id_pemimpin, note_id_petugas: data.note_id.note_id_petugas },
               })
            );
            msgSuccess(data.message);
            navigate("/notulen");
         } else {
            msgError(data.message);
         }
      } catch (error) {
         msgError(error.message);
      } finally {
         setState((prev) => ({ ...prev, isSubmit: false }));
      }
   };

   const handleColor = (time) => {
      return time.getHours() > 12 ? "fw-bold text-success" : "fw-bold text-danger";
   };

   const setInput = (name, value) => {
      setState((prev) => ({ ...prev, input: { ...prev.input, [name]: value } }));
   };

   return (
      <Form className="row">
         <Card>
            <Card.Body>
               <Row>
                  <FormText
                     label="Judul Rapat"
                     name="title"
                     errors={errors}
                     value={input?.title || ""}
                     onChange={(e) => setInput("title", e.target.value)}
                     col={{ md: 8 }}
                  />
                  <Date
                     showTimeSelect
                     timeClassName={handleColor}
                     label="Tanggal Rapat"
                     name="meeting_date"
                     errors={errors}
                     value={input?.meeting_date ? moment(input.meeting_date, "YYYY-MM-DD").toDate() : null}
                     onChange={(date) => setInput("meeting_date", moment(date).toDate())}
                     col={{ md: 4 }}
                  />
               </Row>
               <Row>
                  <FormText
                     label="Agenda"
                     name="agenda"
                     errors={errors}
                     value={input?.agenda || ""}
                     onChange={(e) => setInput("agenda", e.target.value)}
                     col={{ md: 12 }}
                  />
               </Row>
               <Row>
                  <FormText
                     label="Pemimpin Rapat"
                     name="pemimpin_id"
                     errors={errors}
                     value={`${pemimpin.nama} | ${pemimpin.id}`}
                     col={{ md: 6 }}
                     disabled={true}
                  />
                  <AsyncFormTypeahead
                     label="Petugas Notulensi"
                     errors={errors}
                     name="moderator_id"
                     col={{ md: 6 }}
                     isLoading={isLoadingSearch}
                     onSearch={(query) =>
                        cariPegawai(query, token.Authorization.replace(/^Bearer\s+/i, "")).then((res) => {
                           const daftarPegawai = [];
                           res.forEach((row) => {
                              daftarPegawai.push({ value: row.id, label: `${row.nama} | ${row.id}`, ...row });
                           });
                           setState((prev) => ({ ...prev, dropdown: { ...prev.dropdown, daftarPegawai } }));
                        })
                     }
                     options={dropdown.daftarPegawai}
                     onChange={(data) => setState((prev) => ({ ...prev, selected: { ...prev.selected, moderator: data } }))}
                     selected={selected?.moderator}
                  />
               </Row>
               <Row>
                  <FormTypeaheadMultiple
                     label="Kategori"
                     name="kategori"
                     col={{ md: 12 }}
                     options={module.daftarKategori}
                     selected={selected.kategori}
                     onChange={(data) => setState((prev) => ({ ...prev, selected: { ...prev.selected, kategori: data } }))}
                  />
                  <AsyncFormTypeahead
                     label="Peserta Rapat"
                     errors={errors}
                     name="peserta"
                     col={{ md: 12 }}
                     isLoading={isLoadingSearch}
                     multiple={true}
                     onSearch={(query) =>
                        cariPegawai(query, token.Authorization.replace(/^Bearer\s+/i, "")).then((res) => {
                           const daftarPesertaRapat = [];
                           res.forEach((row) => {
                              daftarPesertaRapat.push({ value: row.id, label: `${row.nama} | ${row.id}`, ...row });
                           });
                           setState((prev) => ({ ...prev, dropdown: { ...prev.dropdown, daftarPesertaRapat } }));
                        })
                     }
                     options={dropdown.daftarPesertaRapat}
                     onChange={(data) => setState((prev) => ({ ...prev, selected: { ...prev.selected, peserta_rapat: data } }))}
                     selected={selected.peserta_rapat}
                  />
               </Row>
               <Row>
                  <FormTextArea
                     label="Lokasi Rapat"
                     name="lokasi"
                     errors={errors}
                     value={input?.lokasi || ""}
                     onChange={(e) => setInput("lokasi", e.target.value)}
                     col={{ sm: 12 }}
                  />
               </Row>
               <Row>
                  <FormText
                     label="Embed Youtube Link"
                     name="embed_youtube"
                     errors={errors}
                     value={input?.embed_youtube || ""}
                     onChange={(e) => setInput("embed_youtube", e.target.value)}
                     col={{ md: 12 }}
                  />
               </Row>
               <Row>
                  <Col xs={12} className="mt-2">
                     <DropzoneUpload
                        accept="image/*"
                        onFileSelect={(file) => {
                           if (typeof detailUpdate !== "undefined" && Object.keys(detailUpdate).length > 0 && file) {
                              post("/notulen/upload-banner", postValue({ id: detailUpdate.id, banner_file: file }));
                           } else {
                              setInput("banner_file", file);
                           }
                        }}
                        label="Klik atau seret gambar banner ke sini"
                     />
                  </Col>
               </Row>
            </Card.Body>
            <Card.Footer>
               <Button type="submit" disabled={isSubmit} onClick={isSubmit ? null : handleSubmit}>
                  {isSubmit ? "Loading..." : "Simpan"}
               </Button>
            </Card.Footer>
         </Card>
      </Form>
   );
};
export default Forms;
