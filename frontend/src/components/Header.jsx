import "@assets/css/animate.css";

import PreLoader from "@helpers/preloader";
import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";

const LogoBox = React.lazy(() => import("./LogoBox"));
const HeaderNavbar = React.lazy(() => import("./HeaderNavbar"));
const HeaderNavbarMobile = React.lazy(() => import("./HeaderNavbarMobile"));
const SearchPopup = React.lazy(() => import("./SearchPopup"));
const StickyHeader = React.lazy(() => import("./stickyHeader"));

window.jQuery = $;
window.$ = $;

const Header = () => {
   const main_header = useRef(null);
   const sticky_header = useRef(null);
   const navbar_toggler = useRef(null);
   const navbar_toggler_sticky = useRef(null);
   const close_navbar_toggler = useRef(null);

   const [state, setState] = useState({
      openSearchModal: false,
   });

   const { openSearchModal } = state;
   const props = { setState, sticky_header, navbar_toggler, close_navbar_toggler, navbar_toggler_sticky };

   useEffect(() => {
      if (navbar_toggler.current && close_navbar_toggler.current && navbar_toggler_sticky.current) {
         $(navbar_toggler.current).on("click", () => {
            $("body").addClass("mobile-menu-visible");
         });

         $(navbar_toggler_sticky.current).on("click", () => {
            $("body").addClass("mobile-menu-visible");
         });

         $(close_navbar_toggler.current).on("click", () => {
            $("body").removeClass("mobile-menu-visible");
         });
      }
      return () => {};
   }, [navbar_toggler, close_navbar_toggler, navbar_toggler_sticky]);

   useEffect(() => {
      if (main_header.current && sticky_header.current) {
         $(window).on("scroll", () => {
            const windowpos = $(window).scrollTop();
            const siteHeader = $(main_header.current);
            const sticky = $(sticky_header.current);

            if (windowpos > 100) {
               sticky.addClass("fixed-header animated slideInDown");
            } else {
               sticky.removeClass("fixed-header animated slideInDown");
            }

            if (windowpos > 1) {
               siteHeader.addClass("fixed-header");
            } else {
               siteHeader.removeClass("fixed-header");
            }
         });
      }
      return () => {};
   }, [sticky_header, main_header]);

   return (
      <React.Suspense fallback={<PreLoader />}>
         <header className={`main-header header-style-one ${openSearchModal ? "mobile-search-active" : ""}`} ref={main_header}>
            <div className="auto-container">
               <div className="main-box">
                  <LogoBox />
                  <HeaderNavbar {...props} />
               </div>
            </div>
            <HeaderNavbarMobile {...props} />
            <SearchPopup {...props} />
            <StickyHeader {...props} />
         </header>
      </React.Suspense>
   );
};
export default Header;
