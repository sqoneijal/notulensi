import PreLoader from "@helpers/preloader";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

const Routing = React.lazy(() => import("./Routing"));
const Header = React.lazy(() => import("@components/header"));
const Footer = React.lazy(() => import("@components/footer"));

function App() {
   const circle = useRef(null);
   const circleFollow = useRef(null);

   useEffect(() => {
      const moveCircle = (e) => {
         gsap.to(circle.current, {
            duration: 0.3,
            x: e.clientX,
            y: e.clientY,
         });
         gsap.to(circleFollow.current, {
            duration: 0.7,
            x: e.clientX,
            y: e.clientY,
         });
      };

      const hoverFunc = () => {
         gsap.to(circle.current, {
            duration: 0.3,
            opacity: 1,
            scale: 0,
         });
         gsap.to(circleFollow.current, {
            duration: 0.3,
            scale: 1.2,
         });
      };

      const unhoverFunc = () => {
         gsap.to(circle.current, {
            duration: 0.3,
            opacity: 1,
            scale: 1,
         });
         gsap.to(circleFollow.current, {
            duration: 0.3,
            scale: 1,
         });
      };

      // Simpan referensi node untuk cleanup nanti
      const hoverTargets = document.querySelectorAll("a, .clink");

      window.addEventListener("mousemove", moveCircle);
      hoverTargets.forEach((el) => {
         el.addEventListener("mouseenter", hoverFunc);
         el.addEventListener("mouseleave", unhoverFunc);
      });

      // ✅ Cleanup function
      return () => {
         window.removeEventListener("mousemove", moveCircle);
         hoverTargets.forEach((el) => {
            el.removeEventListener("mouseenter", hoverFunc);
            el.removeEventListener("mouseleave", unhoverFunc);
         });
      };
   }, [circle, circleFollow]);

   return (
      <React.Suspense fallback={<PreLoader />}>
         <div className="circle" ref={circle} />
         <div className="circle-follow" ref={circleFollow} />
         <Header />
         <div className="hidden-bar-back-drop" />
         <Routing />
         <Footer />

         <div className="page-social-icon-box">
            <ul className="social-icon-three">
               <li>
                  <a href="#">
                     <i className="fab fa-twitter"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="fab fa-instagram"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="fab fa-pinterest-p"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="fab fa-facebook-f"></i>
                  </a>
               </li>
            </ul>
         </div>

         <div className="progress-wrap">
            <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
               <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
            </svg>
         </div>
      </React.Suspense>
   );
}

export default App;
