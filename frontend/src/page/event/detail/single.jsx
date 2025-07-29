import moment from "moment";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Diskusi from "./diskusi";
import Keputusan from "./keputusan";
import Peserta from "./peserta";

const Single = ({ data }) => {
   const [{ key }, setState] = useState({
      key: "peserta",
   });

   return (
      <section className="event-single">
         <div className="shape-fourty" />
         <div className="auto-container">
            <div className="outer-box">
               <div className="event-single-block">
                  <div className="inner-box">
                     <div className="content">
                        <ul className="location-box">
                           <li>
                              <i className="icon fa fa-microphone" />
                              {data.nama_pemimpin} <span>(Pemimpin Rapat)</span>
                           </li>
                           <li>
                              <i className="icon fa fa-calendar" />
                              {moment(data.meeting_date).format("DD-MM-YYYY")}
                           </li>
                           <li className="date">
                              <i className="icon fa fa-clock" /> {moment(data.meeting_date).format("hh:mm A")}
                           </li>
                           <li>
                              <i className="icon fa fa-map-marker-alt" /> {data.lokasi}
                           </li>
                        </ul>
                        <h2 className="title">{data.agenda}</h2>
                     </div>
                  </div>
               </div>
               <Tabs
                  id="controlled-event"
                  activeKey={key}
                  onSelect={(k) => setState((prev) => ({ ...prev, key: k }))}
                  className="mb-3"
                  transition={true}>
                  <Tab eventKey="peserta" title="Peserta Rapat">
                     <Peserta {...data} />
                  </Tab>
                  <Tab eventKey="diskusi" title="Diskusi">
                     <Diskusi {...data} />
                  </Tab>
                  <Tab eventKey="keputusan" title="Keputusan">
                     <Keputusan {...data} />
                  </Tab>
               </Tabs>
            </div>
         </div>
      </section>
   );
};
export default Single;
