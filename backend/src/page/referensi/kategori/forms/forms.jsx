import { setModule } from "@/redux";
import { FormText } from "@helpers/forms";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue, put } from "@helpers/request";
import { useEffect, useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Forms = () => {
   const { module } = useSelector((e) => e.redux);
   const { detailUpdate } = module;
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [{ isSubmit, errors, input }, setState] = useState({
      isSubmit: false,
      errors: {},
      input: {},
   });

   useEffect(() => {
      if (typeof detailUpdate !== "undefined" && Object.keys(detailUpdate).length !== 0) {
         setState((prev) => ({ ...prev, input: { ...detailUpdate } }));
      }
      return () => {};
   }, [detailUpdate]);

   const createOrUpdate = async () => {
      const apiCall =
         detailUpdate && Object.keys(detailUpdate).length > 0
            ? () => put(`/referensi/kategori/${detailUpdate.id}`, input)
            : () => post("/referensi/kategori", postValue(input));
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
            msgSuccess(data.message);
            dispatch(setModule({ ...module, detailUpdate: {} }));
            navigate("/referensi/kategori");
         } else {
            msgError(data.message);
         }
      } catch (error) {
         msgError(error.message);
      } finally {
         setState((prev) => ({ ...prev, isSubmit: false }));
      }
   };

   const setInput = (name, value) => {
      setState((prev) => ({ ...prev, input: { ...prev.input, [name]: value } }));
   };

   return (
      <Form className="row" onSubmit={handleSubmit} disabled={isSubmit}>
         <Card>
            <Card.Body>
               <Row>
                  <FormText
                     label="Nama Kategori"
                     name="category_name"
                     errors={errors}
                     value={input?.category_name || ""}
                     onChange={(e) => setInput("category_name", e.target.value)}
                  />
               </Row>
            </Card.Body>
            <Card.Footer>
               <Button type="submit" disabled={isSubmit}>
                  {isSubmit ? "Loading..." : "Simpan"}
               </Button>
            </Card.Footer>
         </Card>
      </Form>
   );
};
export default Forms;
