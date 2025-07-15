import { useRef } from "react";
import { Col, Form } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

export default function AsyncFormTypeahead({ ...config }) {
   const typeaheadRef = useRef(null);
   const { label, errors, name, col, isLoading, onSearch } = config;

   return (
      <Col className="mb-2" {...col} xs={12}>
         <Form.Label htmlFor={normalizeText(label)}>{label}</Form.Label>
         <AsyncTypeahead
            isLoading={isLoading}
            ref={typeaheadRef}
            onSearch={onSearch}
            id={normalizeText(label)}
            placeholder="Ketikkan disini..."
            isInvalid={checkIsInvalid(name, errors)}
            {...config}
         />
         <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
      </Col>
   );
}

const checkIsInvalid = (fieldName, errorsObject) => {
   return !!errorsObject?.[fieldName];
};

const normalizeText = (text) => {
   return text.toLowerCase().replace(/[^a-z]/g, "");
};
