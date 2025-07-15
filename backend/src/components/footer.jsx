import sprite from "@assets/images/iconly-sprite.svg";
import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
   return (
      <footer className="footer">
         <Container fluid>
            <Row>
               <Col md={6} className="footer-copyright">
                  <p className="mb-0">Copyright 2025 © Notulensi - {moment().format("YYYY")}.</p>
               </Col>
               <Col md={6}>
                  <p className="float-end mb-0">
                     Hand crafted &amp; made with{" "}
                     <svg className="svg-color footer-icon">
                        <use href={`${sprite}#heart`} />
                     </svg>
                  </p>
               </Col>
            </Row>
         </Container>
      </footer>
   );
};
export default Footer;
