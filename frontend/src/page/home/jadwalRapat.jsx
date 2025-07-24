import { potongString } from "@helpers";
import { Each } from "@helpers/each";
import AOS from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const JadwalRapat = ({ jadwalAgendaRapat }) => {
   const [{ tabActive, groupedByWeek }, setState] = useState({
      tabActive: "tab-0",
      groupedByWeek: {},
   });

   useEffect(() => {
      AOS.init({
         duration: 1000,
         once: true,
      });
   }, []);

   const getWeekLabelsInCurrentMonth = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth(); // 0-based

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const labels = [];
      const startOfWeek = new Date(firstDay);

      // Geser ke hari Minggu sebelumnya jika bukan hari Minggu
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      let weekCount = 1;

      while (startOfWeek <= lastDay) {
         labels.push(`Minggu ${weekCount}`);
         startOfWeek.setDate(startOfWeek.getDate() + 7);
         weekCount++;
      }

      return labels;
   };

   const renderTabList = (row, index) => {
      return (
         <li
            key={row}
            className={`tab-btn${tabActive === "tab-" + index ? " active-btn" : ""}`}
            onClick={(e) => {
               e.preventDefault();
               setState((prev) => ({ ...prev, tabActive: "tab-" + index }));
            }}>
            {row}
         </li>
      );
   };

   useEffect(() => {
      const groupedByWeek = {};
      jadwalAgendaRapat.forEach((item, index) => {
         const key = `tab-${index}`;
         if (!groupedByWeek[key]) {
            groupedByWeek[key] = [];
         }
         groupedByWeek[key].push(item);
      });
      setState((prev) => ({ ...prev, groupedByWeek }));
      return () => {};
   }, [jadwalAgendaRapat]);

   return (
      <section className="event-section">
         <div className="shape-three bounce-y" />
         <div className="shape-four bounce-y" />
         <div className="auto-container">
            <div className="sec-title text-center">
               <h2 className="text-reveal-anim">Jadwal Agenda Rapat</h2>
               <div className="text">Lihat jadwal lengkap dan agenda rapat yang akan datang secara terstruktur dan terkini.</div>
            </div>
            <div className="event-tabs tabs-box">
               <ul className="tab-btns tab-buttons" data-aos="fade-up" style={{ cursor: "pointer" }}>
                  {getWeekLabelsInCurrentMonth().map((row, index) => {
                     return renderTabList(row, index);
                  })}
               </ul>
               <div className="tabs-content" data-aos="fade-up" data-aos-delay="200">
                  <div className="tab active-tab">
                     <div className="outer-box">
                        {typeof groupedByWeek[tabActive] !== "undefined" && (
                           <Each
                              of={groupedByWeek[tabActive]}
                              render={(row) => {
                                 return (
                                    <div className="event-block" key={row.id}>
                                       <div className="inner-box event-block-inner">
                                          <div className="date-box">
                                             <div className="date">{moment(row.meeting_date).format("DD")}</div>
                                             <div className="year">
                                                {moment(row.meeting_date).format("MMMM")}, <br /> {moment(row.meeting_date).format("YYYY")}
                                             </div>
                                          </div>
                                          <div className="title-box">
                                             <h3 className="title">
                                                <Link to={`/detail/event/${row.id}`}>{potongString(row.title, 30)}</Link>
                                             </h3>
                                             <ul className="location-box">
                                                <li>
                                                   <i className="icon fal fa-location-dot" />
                                                   {potongString(row.lokasi, 80)}
                                                </li>
                                                <li>
                                                   <i className="icon fal fa-clock" />
                                                   {moment(row.meeting_date).format("hh:mm A")}
                                                </li>
                                             </ul>
                                          </div>
                                          <div className="btn-box">
                                             <Link to={`/detail/event/${row.id}`} className="theme-btn btn-style-one">
                                                <span className="btn-title">Detail</span>
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 );
                              }}
                           />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
export default JadwalRapat;
