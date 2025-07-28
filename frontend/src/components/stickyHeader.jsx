import logo_uin from "@assets/images/logo-uin.svg";
import { Link } from "react-router";
import NavLink from "./navLink";

const StickyHeader = ({ sticky_header, navbar_toggler_sticky }) => {
   return (
      <div className="sticky-header" ref={sticky_header}>
         <div className="auto-container">
            <div className="inner-container">
               <div className="logo-box">
                  <div className="logo light">
                     <Link to="/">
                        <img src={logo_uin} alt="UINAR Notulensi" />
                     </Link>
                  </div>
                  <div className="logo dark">
                     <Link to="/">
                        <img src={logo_uin} alt="UINAR Notulensi" />
                     </Link>
                  </div>
               </div>
               <div className="nav-outer">
                  <nav className="main-menu">
                     <div className="navbar-collapse show collapse clearfix">
                        <ul className="navigation clearfix">
                           <NavLink />
                        </ul>
                     </div>
                  </nav>
                  <div className="mobile-nav-toggler" ref={navbar_toggler_sticky}>
                     <span className="icon lnr-icon-bars" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default StickyHeader;
