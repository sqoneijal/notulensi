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
            <div className="btn-box">
               <a href="https://dash.memo-mortal.ar-raniry.ac.id" className="theme-btn btn-style-one light-bg">
                  <span className="btn-title">Login</span>
               </a>
            </div>
            <div className="mobile-nav-toggler" ref={navbar_toggler}>
               <i className="fa fa-bars" />
            </div>
         </div>
      </div>
   );
};
export default HeaderNavbar;
