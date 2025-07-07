import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Banner = () => {
   useEffect(() => {
      AOS.init({
         duration: 1000, // durasi default animasi
         once: true, // animasi hanya 1x scroll
      });
   }, []);

   return (
      <section className="banner-section">
         <div className="bg bg-image" style={{ backgroundImage: `url('https://expert-themes.com/html/konfer/images/banner/1.png')` }} />
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
               <h1 className="title title-anim">
                  Conference <br />
                  <span className="banner-small-images">
                     <img
                        src="https://expert-themes.com/html/konfer/images/banner/user-1.png"
                        alt="Image"
                        data-aos="fade-right"
                        data-aos-delay="2300"
                     />
                     <img
                        src="https://expert-themes.com/html/konfer/images/banner/user-2.png"
                        alt="Image"
                        data-aos="fade-right"
                        data-aos-delay="2500"
                     />
                     <img
                        src="https://expert-themes.com/html/konfer/images/banner/user-3.png"
                        alt="Image"
                        data-aos="fade-right"
                        data-aos-delay="2800"
                     />
                  </span>
                  <span>For insights</span>
               </h1>
               <div className="location-box" data-aos="fade-right" data-aos-delay="3100">
                  <div className="text">
                     Germany <i className="icon fa fa-long-arrow-right" /> <br /> 1047 Brea Mall #1047 Brea, CA 92821
                  </div>
                  <div className="btn-box">
                     <a href="contact.html" className="theme-btn btn-style-one bg-yellow">
                        <span className="btn-title">Registration Now</span>
                     </a>
                  </div>
               </div>
            </div>

            <div className="time-counter" data-aos="fade" data-aos-delay="3500">
               <div className="time-countdown" data-countdown="10/14/2025"></div>
            </div>
         </div>
      </section>
   );
};
export default Banner;
