import { setModule } from "@/redux";
import path from "@/routes_path";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

const Breadcrumbs = () => {
   const { actionButton, module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const location = useLocation();

   const renderActionButton = (item) => {
      if (Object.keys(item).length > 0 && (item.type === "add" || item.type === "back")) {
         return (
            <Link to={item.path} className={`btn ${item.className} fw-bold`} onClick={() => dispatch(setModule({ ...module, detailUpdate: {} }))}>
               {item.label}
            </Link>
         );
      }
   };

   const getLastNumberFromPath = (path) => {
      const match = path.match(/\/(\d+)$/);
      if (match) {
         return Number(match[1]) ? `${path.replace(/\/\d+$/, "")}/:id` : null;
      } else {
         return null;
      }
   };

   const renderNavPath = (path, pathname) => {
      const html = [];
      html.push(
         <li className="breadcrumb-item" key="default">
            <Link to="/dashboard">
               <i className="iconly-Home icli svg-color" />
            </Link>
         </li>
      );

      const last_url = getLastNumberFromPath(pathname);
      const route = path.find((e) => e.path === (last_url === null ? pathname : last_url));
      if (typeof route !== "undefined") {
         route.breadcrumbs.forEach((item, index) => {
            html.push(
               <li className="breadcrumb-item" key={index}>
                  {item}
               </li>
            );
         });
      }

      return html;
   };

   return (
      <Container fluid>
         <div className="page-title">
            <Row>
               <Col sm={6} xs={12}>
                  {renderActionButton(actionButton)}
               </Col>
               <Col sm={6} xs={12}>
                  <ol className="breadcrumb">{renderNavPath(path, location.pathname)}</ol>
               </Col>
            </Row>
         </div>
      </Container>
   );
};
export default Breadcrumbs;
