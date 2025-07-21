import { setActionButton, setModule } from "@/redux";
import PageLoader from "@helpers/pageloader";
import { get } from "@helpers/request";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Forms from "./forms";

const Index = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const [{ isLoadingPage }, setState] = useState({
      isLoadingPage: true,
   });

   useEffect(() => {
      const initPage = () => {
         const send = get("/notulen/new");
         send.then((res) => {
            const { data } = res;
            dispatch(setModule({ ...module, ...data }));
            dispatch(
               setActionButton({
                  type: "back",
                  path: "/notulen",
                  label: "Batal",
                  className: "btn-danger",
               })
            );
         });
         send.finally(() => setState({ isLoadingPage: false }));
      };

      initPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return isLoadingPage ? (
      <PageLoader />
   ) : (
      <Row>
         <Col sm={12}>
            <Forms />
         </Col>
      </Row>
   );
};
export default Index;
