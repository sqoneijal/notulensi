import { setActionButton } from "@/redux";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Forms from "./forms";

const Index = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(
         setActionButton({
            type: "back",
            path: "/notulen",
            label: "Batal",
            className: "btn-danger",
         })
      );
      return () => {};
   }, [dispatch]);

   return (
      <Row>
         <Col sm={12}>
            <Forms />
         </Col>
      </Row>
   );
};
export default Index;
