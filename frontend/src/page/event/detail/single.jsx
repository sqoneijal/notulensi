import moment from "moment";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import Diskusi from "./diskusi";
import Keputusan from "./keputusan";
import Peserta from "./peserta";
import PlayYoutube from "./play_youtube";

const Single = ({ data }) => {
   const navigate = useNavigate();
   const location = useLocation();

   const [{ key }, setState] = useState({
      key: "peserta",
   });

   const { embed_youtube } = data;

   function getYouTubeID(url) {
      const u = new URL(url);

      // youtu.be/<id>
      if (u.hostname === "youtu.be") {
         return u.pathname.slice(1);
      }

      // youtube.com/watch?v=<id>
      if (u.pathname === "/watch" || u.searchParams.has("v")) {
         return u.searchParams.get("v");
      }

      // youtube.com/embed/<id>
      if (u.pathname.startsWith("/embed/")) {
         return u.pathname.split("/")[2];
      }

      // youtube.com/shorts/<id>
      if (u.pathname.startsWith("/shorts/")) {
         return u.pathname.split("/")[2];
      }

      // fallback: cari pola ID 11 karakter di string
      const m = url.match(/([A-Za-z0-9_-]{11})/);
      return m ? m[1] : null;
   }

   return (
      <React.Fragment>
         <PlayYoutube hash={location.hash} embedId={getYouTubeID(embed_youtube)} />
         {getYouTubeID(embed_youtube) && (
            <section className="video-section-two pt-5 mb-0 pb-0">
               <div className="outer-box expand-section">
                  <div
                     className="bg bg-image bg-reveal"
                     style={{ backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeID(embed_youtube)}/hqdefault.jpg)` }}
                  />
                  <div className="auto-container">
                     <div className="icon-ten" />
                     <div className="icon-eleven" />
                     <div className="btn-box hide-sm wow zoomIn">
                        <a
                           href="https://www.youtube.com/watch?v=Fvae8nxzVz4"
                           className="play-now"
                           onClick={(e) => {
                              e.preventDefault();
                              navigate(`${location.pathname}#${getYouTubeID(embed_youtube)}`);
                           }}>
                           <div className="play-icon" />
                           <span className="ripple" />
                        </a>
                     </div>
                     <div className="content-box wow fadeInLeft">
                        <h2 className="title">{data.title}</h2>
                     </div>
                  </div>
               </div>
            </section>
         )}
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
      </React.Fragment>
   );
};
export default Single;
