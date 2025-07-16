import { Date } from "@helpers/date";
import { AsyncFormTypeahead, DropzoneUpload, FormText } from "@helpers/forms";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue } from "@helpers/request";
import { cariPegawai } from "@helpers/simpeg";
import moment from "moment";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Forms = () => {
   const { init } = useSelector((e) => e.redux);
   const { simpeg } = init;
   const navigate = useNavigate();

   const [{ errors, input, isSubmit, isLoadingSearch, dropdown }, setState] = useState({
      errors: {},
      input: {},
      isSubmit: false,
      isLoadingSearch: false,
      dropdown: { daftarPegawai: [] },
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, isSubmit: true }));

      const nip = { pemimpin_id: simpeg.id, user_id: simpeg.id };
      const combined = { ...input, ...nip };

      const fetch = post("/notulen", postValue(combined));
      fetch.then((res) => {
         const { data } = res;

         if (data.status) {
            msgSuccess(data.message);
            navigate("/notulen");
         } else {
            setState((prev) => ({ ...prev, errors: { ...data.errors } }));
            msgError(data.message);
         }
      });
      fetch.finally(() => setState((prev) => ({ ...prev, isSubmit: false })));
   };

   const handleColor = (time) => {
      return time.getHours() > 12 ? "fw-bold text-success" : "fw-bold text-danger";
   };

   const setInput = (name, value) => {
      setState((prev) => ({ ...prev, input: { ...prev.input, [name]: value } }));
   };

   return (
      <Card>
         <Card.Body>
            <Form className="row">
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
                     value={`${simpeg.nama} | ${simpeg.id}`}
                     col={{ md: 6 }}
                     disabled={true}
                  />
                  <AsyncFormTypeahead
                     label="Moderator Rapat"
                     errors={errors}
                     name="moderator_id"
                     col={{ md: 6 }}
                     isLoading={isLoadingSearch}
                     onSearch={(query) =>
                        cariPegawai(query).then((res) => {
                           const daftarPegawai = [];
                           res.forEach((row) => {
                              daftarPegawai.push({ value: row.id, label: `${row.nama} | ${row.id}` });
                           });
                           setState((prev) => ({ ...prev, dropdown: { ...prev.dropdown, daftarPegawai } }));
                        })
                     }
                     options={dropdown.daftarPegawai}
                     onChange={(data) => (data.length > 0 ? setInput("moderator_id", data[0].value) : "")}
                  />
               </Row>
               <Row>
                  <Col xs={12} className="mt-2">
                     <DropzoneUpload
                        accept="image/*"
                        onFileSelect={(file) => setInput("banner_file", file)}
                        label="Klik atau seret gambar banner ke sini"
                     />
                  </Col>
               </Row>
            </Form>
         </Card.Body>
         <Card.Footer>
            <Button type="submit" disabled={isSubmit} onClick={isSubmit ? null : handleSubmit}>
               {isSubmit ? "Loading..." : "Simpan"}
            </Button>
         </Card.Footer>
      </Card>
   );
};
export default Forms;
