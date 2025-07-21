import { useRef } from "react";
import { Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function FormTypeaheadMultiple({ ...config }) {
   const typeaheadRef = useRef(null);
   const { label, errors, name, col, onSearch } = config;

   return (
      <Col className="mb-2" {...col} xs={12}>
         <Form.Label htmlFor={normalizeText(label)}>{label}</Form.Label>
         <Typeahead
            ref={typeaheadRef}
            onSearch={onSearch}
            id={normalizeText(label)}
            placeholder="Ketikkan disini..."
            isInvalid={checkIsInvalid(name, errors)}
            multiple={true}
            {...config}
         />
      </Col>
   );
}

const checkIsInvalid = (fieldName, errorsObject) => {
   return !!errorsObject?.[fieldName];
};

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
