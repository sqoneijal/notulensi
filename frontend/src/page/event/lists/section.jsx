import { potongString } from "@helpers";
import { Each } from "@helpers/each";
import AOS from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router";

const Section = ({ content, getData, setState, bottomOfPage, currentPage }) => {
   const paginationRender = useRef(null);

   useEffect(() => {
      if (bottomOfPage) {
         getData(currentPage);
      }
      return () => setState((prev) => ({ ...prev, bottomOfPage: false }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [bottomOfPage]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) {
               setState((prev) => ({ ...prev, bottomOfPage: true }));
            }
         },
         {
            thresholds: 1,
         }
      );

      if (paginationRender.current) {
         observer.observe(paginationRender.current);
      }

      return () => {
         if (paginationRender.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(paginationRender?.current);
         }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [paginationRender]);

   useEffect(() => {
      AOS.init({
         duration: 1000,
         once: true,
      });
   }, []);

   return (
      <React.Fragment>
         <section className="event-section-three" style={{ marginTop: "5%" }}>
            <div className="auto-container">
               <div className="event-tabs-three tabs-box" data-aos="fade-up">
                  <div className="tabs-content">
                     <div className="tab active-tab">
                        <div className="outer-box">
                           <Each
                              of={content}
                              render={(row, index) => {
                                 return (
                                    <div className={`event-block-three has-active ${index % 2 === 0 ? "" : "right"}`} key={row.id}>
                                       <div className="inner-box active">
                                          {index % 2 === 0 && (
                                             <div className="image-box">
                                                <figure className="image">
                                                   <Link to={`/detail/event/${row.id}`}>
                                                      <img src={row.banner_image} alt={row.title} style={{ width: 361, height: 306 }} />
                                                   </Link>
                                                </figure>
                                             </div>
                                          )}
                                          <div className="content-box">
                                             <h3 className="title">
                                                <Link to={`/detail/event/${row.id}`}>{potongString(row.title, 50)}</Link>
                                             </h3>
                                             <ul className="location-box">
                                                <li>
                                                   <i className="icon fa fa-microphone" /> {row.pemimpin} <span>(Pemimpin Rapat)</span>
                                                </li>
                                                <li className="date">
                                                   <i className="icon fa fa-clock" /> {moment(row.meeting_date).format("hh:mm A")}
                                                </li>
                                             </ul>
                                             <div className="text">{row.agenda}</div>
                                             <div className="btn-box">
                                                <Link to={`/detail/event/${row.id}`} className="theme-btn btn-style-one hover-dark light-bg">
                                                   <span className="btn-title">Selengkapnya</span>
                                                </Link>
                                             </div>
                                          </div>
                                          {index % 2 !== 0 && (
                                             <div className="image-box">
                                                <figure className="image">
                                                   <Link to={`/detail/event/${row.id}`}>
                                                      <img src={row.banner_image} alt={row.title} style={{ width: 361, height: 306 }} />
                                                   </Link>
                                                </figure>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 );
                              }}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <div ref={paginationRender} />
      </React.Fragment>
   );
};
export default Section;
