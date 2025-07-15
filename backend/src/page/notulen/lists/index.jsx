import { setActionButton } from "@/redux";
import Lists from "@helpers/grid_table";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Index = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(
         setActionButton({
            type: "add",
            path: "/notulen/forms",
            label: "Tambah Data",
            className: "btn-primary",
         })
      );
      return () => {};
   }, [dispatch]);

   return (
      <Row>
         <Col sm={12}>
            <Card>
               <Card.Body>
                  <Lists />
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};
export default Index;
