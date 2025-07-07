import logo_uin from "@assets/images/logo-uin.svg";
import { Link } from "react-router";

const LogoBox = () => {
   return (
      <div className="logo-box">
         <div className="logo">
            <Link to="/">
               <img src={logo_uin} alt="Logo" title="Notulensi" style={{ padding: 20 }} />
            </Link>
         </div>
      </div>
   );
};
export default LogoBox;
