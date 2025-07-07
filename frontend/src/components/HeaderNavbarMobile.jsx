import logo_uin from "@assets/images/logo-uin.svg";

const HeaderNavbarMobile = ({ setState }) => {
   return (
      <div className="mobile-menu">
         <div className="menu-backdrop" />
         <nav className="menu-box">
            <div className="upper-box">
               <div className="logo-box">
                  <div className="nav-logo light">
                     <a href="index.html">
                        <img src={logo_uin} alt="Logo" style={{ width: 110, height: 40 }} />
                     </a>
                  </div>
               </div>
               <div className="close-btn" onClick={() => setState((prev) => ({ ...prev, openMobileMenu: !prev.openMobileMenu }))}>
                  <i className="icon fa fa-times" />
               </div>
            </div>

            <ul className="navigation clearfix"></ul>
         </nav>
      </div>
   );
};
export default HeaderNavbarMobile;
