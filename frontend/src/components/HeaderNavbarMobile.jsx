import logo_uin from "@assets/images/logo-uin.svg";
import { Link } from "react-router";
import NavLink from "./navLink";

const HeaderNavbarMobile = ({ close_navbar_toggler }) => {
   return (
      <div className="mobile-menu">
         <div className="menu-backdrop" />
         <nav className="menu-box">
            <div className="upper-box">
               <div className="logo-box">
                  <div className="nav-logo light">
                     <Link to="/">
                        <img src={logo_uin} alt="Logo" style={{ width: 110, height: 40 }} />
                     </Link>
                  </div>
               </div>
               <div className="close-btn" ref={close_navbar_toggler}>
                  <i className="icon fa fa-times" />
               </div>
            </div>
            <ul className="navigation clearfix">
               <NavLink />
            </ul>
         </nav>
      </div>
   );
};
export default HeaderNavbarMobile;
