import NavLink from "./navLink";

const HeaderNavbar = ({ setState, navbar_toggler }) => {
   return (
      <div className="header-navbar">
         <div className="nav-outer">
            <nav className="nav main-menu">
               <ul className="navigation">
                  <NavLink />
               </ul>
            </nav>
         </div>
         <div className="outer-box">
            <button className="ui-btn search-btn" onClick={() => setState((prev) => ({ ...prev, openSearchModal: !prev.openSearchModal }))}>
               <i className="icon flaticon-search" />
            </button>
            <div className="mobile-nav-toggler" ref={navbar_toggler}>
               <i className="fa fa-bars" />
            </div>
         </div>
      </div>
   );
};
export default HeaderNavbar;
