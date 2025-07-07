import { PreLoader } from "@helpers";
import React, { useEffect, useState } from "react";

const LogoBox = React.lazy(() => import("./LogoBox"));
const HeaderNavbar = React.lazy(() => import("./HeaderNavbar"));
const HeaderNavbarMobile = React.lazy(() => import("./HeaderNavbarMobile"));
const SearchPopup = React.lazy(() => import("./SearchPopup"));

const Header = () => {
   const [state, setState] = useState({
      openSearchModal: false,
      openMobileMenu: false,
   });

   const { openSearchModal, openMobileMenu } = state;
   const props = { setState };

   useEffect(() => {
      const elBody = document.body;
      if (openMobileMenu) {
         elBody.classList.add("mobile-menu-visible");
      } else {
         elBody.classList.remove("mobile-menu-visible");
      }
      return () => {};
   }, [openMobileMenu]);

   return (
      <React.Suspense fallback={<PreLoader />}>
         <header className={`main-header header-style-one ${openSearchModal ? "moblie-search-active" : ""}`}>
            <div className="auto-container">
               <div className="main-box">
                  <LogoBox />
                  <HeaderNavbar {...props} />
               </div>
            </div>
            <HeaderNavbarMobile {...props} />
            <SearchPopup {...props} />

            <div className="sticky-header">
               <div className="auto-container">
                  <div className="inner-container">
                     <div className="logo-box">
                        <div className="logo light">
                           <a href="index.html" title="">
                              <img src="images/logo-2.svg" alt="Logo" />
                           </a>
                        </div>
                        <div className="logo dark">
                           <a href="index.html" title="">
                              <img src="images/logo.svg" alt="Logo" />
                           </a>
                        </div>
                     </div>

                     <div className="nav-outer">
                        <nav className="main-menu">
                           <div className="navbar-collapse show collapse clearfix">
                              <ul className="navigation clearfix"></ul>
                           </div>
                        </nav>

                        <div className="mobile-nav-toggler">
                           <span className="icon lnr-icon-bars"></span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
      </React.Suspense>
   );
};
export default Header;
