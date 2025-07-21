import { Col } from "react-bootstrap";

const detail = (title, value, col = {}) => {
   return (
      <Col xs={12} {...col} className="mt-3 mb-2">
         <label className="form-label">{title}</label>
         <span style={{ display: "block" }}>{value}</span>
      </Col>
   );
};
export { detail };
