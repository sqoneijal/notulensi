import AOS from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router";

const NotulenTerbaru = ({ ...state }) => {
   const { banner } = state;

   useEffect(() => {
      AOS.init({
         duration: 1000,
         once: true,
      });
   }, []);

   const renderKategori = (data = []) => {
      if (data.length <= 0) {
         return;
      }

      const kategori = [];
      data.forEach((row) => {
         kategori.push(row.kategori);
      });

      return <span className="sub-title">{kategori.join(", ")}</span>;
   };

   const insertBreakAfterFirstWord = (text) => {
      const words = text.split(" ");
      if (words.length <= 1) return text;

      return (
         <React.Fragment>
            {words[0]}
            <br />
            {words.slice(1).join(" ")}
         </React.Fragment>
      );
   };

   return (
      <section className="about-section">
         <div className="icon-two bounce-y" />
         <div className="auto-container">
            <div className="outer-box">
               <div className="image-box" data-aos="fade-up">
                  <div className="speaker-box">
                     <i className="icon flaticon-mic" />
                     <div className="count">{moment(banner.meeting_date).format("DD")}</div>
                     <div className="text">
                        {moment(banner.meeting_date).format("MMMM")} <br /> {moment(banner.meeting_date).format("YYYY")}
                     </div>
                  </div>
               </div>
            </div>
            <div className="outer-box">
               <div className="content-box" data-aos="fade-right" data-aos-delay="200">
                  <div className="sec-title">
                     {renderKategori(banner.kategori)}
                     <h2 className="text-reveal-anim">{insertBreakAfterFirstWord(banner.title)}</h2>
                     <div className="text text-anim">{banner.agenda}</div>
                  </div>
                  <div className="btn-box">
                     <Link to={`/detail/event/${banner.id}`} className="theme-btn btn-style-one icon-btn">
                        <i className="icon flaticon-placeholder" />
                        <span className="btn-title">Detail</span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
export default NotulenTerbaru;
