import AOS from "aos";
import "aos/dist/aos.css";
import DOMPurify from "dompurify";
import { useEffect } from "react";
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

   return (
      <section className="banner-section">
         <div className="bg bg-image" style={{ backgroundImage: `url('${banner.banner_image}')` }} />
         <div className="auto-container">
            <div className="banner-layer" />
            <div className="content-box">
               <div className="author-box">
                  <div className="inner-box">
                     <div className="sign" data-aos="fade-up" data-aos-delay="500">
                        <img src="https://expert-themes.com/html/konfer/images/resource/banner-sign.png" alt="Signature" />
                     </div>
                     <div className="designation" data-aos="fade-up" data-aos-delay="700">
                        GUEST SPEAKER
                     </div>
                     <div className="line" data-aos="fade-right" data-aos-delay="1000">
                        <img src="https://expert-themes.com/html/konfer/images/icons/icon-line.png" alt="Line" />
                     </div>
                  </div>
               </div>
               <h1
                  className="title title-anim"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(insertBreakAfterFirstWord(banner.agenda), { format: "html5" }) }}
               />
               <div className="location-box" data-aos="fade-right" data-aos-delay="3100">
                  <div className="text">
                     Germany <i className="icon fa fa-long-arrow-right" /> <br /> 1047 Brea Mall #1047 Brea, CA 92821
                  </div>
                  <div className="btn-box">
                     <Link to={`/detail/event/${banner.id}`} className="theme-btn btn-style-one bg-yellow">
                        <span className="btn-title">Detail</span>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="time-counter" data-aos="fade" data-aos-delay="3500">
               <div className="time-countdown" data-countdown="10/14/2025" />
            </div>
         </div>
      </section>
   );
};
export default Banner;
