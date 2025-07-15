import { Col, Row } from "react-bootstrap";
import HeaderLeft from "./headerLeft";
import HeaderRight from "./headerRight";
import Logo from "./logo";

const Header = () => {
   return (
      <Row as="header" className="page-header">
         <Logo />
         <Col className="page-main-header">
            <HeaderLeft />
            <HeaderRight />
         </Col>
      </Row>
   );
};
export default Header;
