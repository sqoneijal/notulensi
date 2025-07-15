import sprite from "@assets/images/iconly-sprite.svg";
import logo_uin from "@assets/images/logo_uin.svg";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router";

const Logo = () => {
   const handleClickToggleSidebar = (e) => {
      e.preventDefault();
      const pageWrapper = document.getElementById("pageWrapper");
      if (pageWrapper.classList.contains("sidebar-open")) {
         pageWrapper.classList.remove("sidebar-open");
      } else {
         pageWrapper.classList.add("sidebar-open");
      }
   };

   return (
      <Col xs="auto" className="logo-wrapper d-flex align-items-center">
         <Link to="/dashboard">
            <Image fluid className="light-logo" src={logo_uin} alt="logo" style={{ width: 122 }} />
         </Link>
         <a className="close-btn toggle-sidebar" href="#" onClick={handleClickToggleSidebar}>
            <svg className="svg-color">
               <use href={`${sprite}#Category`} />
            </svg>
         </a>
      </Col>
   );
};
export default Logo;
