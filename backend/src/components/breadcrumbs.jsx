import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Breadcrumbs = () => {
   const { actionButton } = useSelector((e) => e.redux);

   const renderActionButton = (item) => {
      if (Object.keys(item).length > 0 && (item.type === "add" || item.type === "back")) {
         return (
            <Link to={item.path} className={`btn ${item.className} fw-bold`}>
               {item.label}
            </Link>
         );
      }
   };

   return (
      <Container fluid>
         <div className="page-title">
            <Row>
               <Col sm={6} xs={12}>
                  {renderActionButton(actionButton)}
               </Col>
               <Col sm={6} xs={12}>
                  <ol className="breadcrumb">
                     <li className="breadcrumb-item">
                        <Link to="/dashboard">
                           <i className="iconly-Home icli svg-color" />
                        </Link>
                     </li>
                     <li className="breadcrumb-item">Pages</li>
                     <li className="breadcrumb-item active">Sample Page</li>
                  </ol>
               </Col>
            </Row>
         </div>
      </Container>
   );
};
export default Breadcrumbs;
