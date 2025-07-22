import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import PageLoader from "@helpers/pageloader";
import { get } from "@helpers/request";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const Index = () => {
   const [{ isLoading, events }, setState] = useState({
      isLoading: true,
      events: [],
   });

   const getData = () => {
      const fetch = get("/dashboard");
      fetch.then(({ data }) => {
         setState((prev) => ({ ...prev, events: data }));
      });
      fetch.finally(() => setState((prev) => ({ ...prev, isLoading: false })));
   };

   useEffect(() => {
      getData();
      return () => {};
   }, []);

   return isLoading ? (
      <PageLoader />
   ) : (
      <Row>
         <Col sm={12}>
            <Card>
               <Card.Body>
                  <FullCalendar
                     plugins={[dayGridPlugin]}
                     initialView="dayGridMonth"
                     weekends={false}
                     events={events}
                     eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: "short" }}
                     eventClick={(info) => {
                        console.log(info.el);
                        console.log(info);
                     }}
                     eventMouseEnter={(info) => {
                        info.el.style.cursor = "pointer";
                     }}
                  />
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};
export default Index;
