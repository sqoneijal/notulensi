import { Each } from "@helpers/each";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const NavLink = () => {
   const location = useLocation();

   const [menuActive, setMenuActive] = useState("/");

   useEffect(() => {
      setMenuActive(`/${location.pathname.split("/")[1]}`);
      return () => {};
   }, [location]);

   const nav = [
      { path: "/", label: "Beranda" },
      { path: "/event", label: "Agenda" },
   ];

   return (
      <Each
         of={nav}
         render={(row) => (
            <li className={menuActive === row.path ? "current" : ""} key={row.path}>
               <Link to={row.path}>{row.label}</Link>
            </li>
         )}
      />
   );
};
export default NavLink;
