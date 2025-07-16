import { FormText } from "@helpers/forms";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue } from "@helpers/request";
import { useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Forms = () => {
   const navigate = useNavigate();

   const [{ isSubmit, errors, input }, setState] = useState({
      isSubmit: false,
      errors: {},
      input: {},
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isSubmit: true }));
      const submit = post("/referensi/kategori", postValue(input));
      submit.then((res) => {
         const { data } = res;

         setState((prev) => ({ ...prev, errors: { ...data.errors } }));

         if (data.status) {
            msgSuccess(data.message);
            navigate("/referensi/kategori");
         } else {
            msgError(data.message);
         }
      });
      submit.finally(() => setState((prev) => ({ ...prev, isSubmit: false })));
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
