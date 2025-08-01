import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import PageLoader from "@helpers/pageloader";
import { get } from "@helpers/request";
import moment from "moment";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Index = () => {
   const navigate = useNavigate();

   const [prevMonth, setPrevMonth] = useState(null);
   const [{ isLoading, events }, setState] = useState({
      isLoading: true,
      events: [],
   });

   const getData = (meeting_date) => {
      const fetch = get(`/dashboard?meeting_date=${meeting_date}`);
      fetch.then(({ data }) => {
         setState((prev) => ({ ...prev, events: data }));
      });
      fetch.finally(() => setState((prev) => ({ ...prev, isLoading: false })));
   };

   useEffect(() => {
      if (prevMonth !== null) getData(`${prevMonth.year}-${String(prevMonth.month).padStart(2, "0")}`);
      return () => {};
   }, [prevMonth]);

   useEffect(() => {
      getData(moment().format("YYYY-MM"));
      return () => {};
   }, []);

   const handleDatesSet = (arg) => {
      const date = arg.view.currentStart;
      const newMonth = date.getMonth();
      const newYear = date.getFullYear();

      if (prevMonth !== null) {
         if (newYear > prevMonth.year || (newYear === prevMonth.year && newMonth > prevMonth.month)) {
            console.log("Pindah ke bulan selanjutnya");
         } else if (newYear < prevMonth.year || (newYear === prevMonth.year && newMonth < prevMonth.month)) {
            console.log("Pindah ke bulan sebelumnya");
         }
      }
      setPrevMonth({ month: newMonth + 1, year: newYear });
   };

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
                     weekends={true}
                     events={events}
                     datesSet={handleDatesSet}
                     eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: "short" }}
                     eventClick={(info) => {
                        navigate(`/notulen/detail/${info.el.fcSeg.eventRange.def.publicId}`);
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
