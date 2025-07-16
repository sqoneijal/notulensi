import { id } from "date-fns/locale/id";
import { Col, Form } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("id", id);

export default function DatePick({ ...config }) {
   const { label, name, errors, value, onChange, col } = config;

   return (
      <Col xs={12} className="mb-2" {...col}>
         <Form.Label htmlFor={normalizeText(name)}>{label}</Form.Label>
         <DatePicker
            selected={value}
            onChange={onChange}
            className={`form-control ${errors[name] ? "is-invalid" : ""}`}
            id={normalizeText(name)}
            locale="id"
            showMonthDropdown
            showYearDropdown
            placeholderText="Pilih tanggal disini..."
            fixedHeight
            dateFormat="dd-MM-yyyy hh:mm aa"
            {...config}
         />
         <Form.Control.Feedback type="invalid" style={{ display: errors[name] ? "block" : "none" }}>
            {errors[name]}
         </Form.Control.Feedback>
      </Col>
   );
}

const normalizeText = (text) => {
   if (typeof text !== "undefined") {
      return text.toLowerCase().replace(/[^a-z]/g, "");
   }
};
