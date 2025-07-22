import SvgTextImage from "@components/SvgTextImage";
import AOS from "aos";
import "aos/dist/aos.css";
import DOMPurify from "dompurify";
import moment from "moment";
import { useEffect } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router";

const Banner = ({ ...state }) => {
   const { banner } = state;
   console.log(banner);

   useEffect(() => {
      AOS.init({
         duration: 1000,
         once: true,
      });
   }, []);

   const insertBreakAfterFirstWord = (text) => {
      const words = text.split(" ");
      if (words.length <= 1) return text;
      return `${words[0]}<br/><span>${words.slice(1).join(" ")}</span>`;
   };

   const rendererCountdown = ({ days, hours, minutes, seconds }) => {
      return (
         <div className="time-countdown">
            <div className="counter-column">
               <span className="count">{days}</span>
               <sub>Hari</sub>
            </div>
            <span className="separator">:</span>
            <div className="counter-column">
               <span className="count">{hours}</span>
               <sub>Jam</sub>
            </div>
            <span className="separator">:</span>
            <div className="counter-column">
               <span className="count">{minutes}</span>
               <sub>Menit</sub>
            </div>
            <span className="separator">:</span>
            <div className="counter-column">
               <span className="count">{seconds}</span>
               <sub>Detik</sub>
            </div>
         </div>
      );
   };

   return (
      <section className="banner-section">
         <div className="bg bg-image" style={{ backgroundImage: `url('${banner.banner_image}')` }} />
         <div className="auto-container">
            <div className="content-box">
               <div className="author-box">
                  <div className="inner-box">
                     <div className="sign" data-aos="fade-up" data-aos-delay="500">
                        <SvgTextImage text={banner.full_name} />
                     </div>
                     <div className="designation" data-aos="fade-up" data-aos-delay="700">
                        Pemimpin Rapat
                     </div>
                  </div>
               </div>
               <div style={{ width: "80%" }}>
                  <h1
                     className="title title-anim"
                     style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                     }}
                     title={DOMPurify.sanitize(insertBreakAfterFirstWord(banner.title), { format: "html5" })}
                     dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(insertBreakAfterFirstWord(banner.title), { format: "html5" }) }}
                  />
                  <div className="location-box" data-aos="fade-right" data-aos-delay="3100">
                     <div className="text">
                        Lokasi <i className="icon fa fa-long-arrow-right" /> <br /> {banner.lokasi}
                     </div>
                     <div className="btn-box">
                        <Link to={`/detail/event/${banner.id}`} className="theme-btn btn-style-one bg-yellow">
                           <span className="btn-title">Detail</span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="time-counter" data-aos="fade" data-aos-delay="3500" style={{ top: "20%" }}>
               <Countdown date={moment(banner.meeting_date).valueOf()} renderer={rendererCountdown} />
            </div>
         </div>
      </section>
   );
};
export default Banner;
