import sprite from "@assets/images/iconly-sprite.svg";
import profile from "@assets/images/profile.png";
import { handleLogout } from "@helpers/auth";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const HeaderRight = () => {
   const dropdownRef = useRef(null);

   const [state, setState] = useState({
      suhu: "-",
      openProfileDropdown: false,
   });
   const { suhu, openProfileDropdown } = state;

   const getTemperature = async (lat, lon) => {
      try {
         const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
               latitude: lat,
               longitude: lon,
               current_weather: true,
            },
         });

         const temperature = response.data.current_weather.temperature;
         setState((prev) => ({ ...prev, suhu: temperature }));
      } catch (error) {
         console.error("Gagal ambil suhu:", error.message);
         return null;
      }
   };

   useEffect(() => {
      getTemperature(5.5769284, 95.3685544);

      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setState((prev) => ({ ...prev, openProfileDropdown: false }));
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const handleOpenProfileDropdown = (e) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, openProfileDropdown: !prev.openProfileDropdown }));
   };

   return (
      <div className="nav-right">
         <ul className="header-right">
            <li>
               <a className="dark-mode" href="#">
                  <svg>
                     <use href={`${sprite}#moondark`} />
                  </svg>
               </a>
            </li>
            <li className="cloud-design">
               <a className="cloud-mode">
                  <svg className="climacon climacon_cloudDrizzle" id="cloudDrizzle" version="1.1" viewBox="15 15 70 70">
                     <g className="climacon_iconWrap climacon_iconWrap-cloudDrizzle">
                        <g className="climacon_wrapperComponent climacon_wrapperComponent-drizzle">
                           <path
                              className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-left"
                              d="M42.001,53.644c1.104,0,2,0.896,2,2v3.998c0,1.105-0.896,2-2,2c-1.105,0-2.001-0.895-2.001-2v-3.998C40,54.538,40.896,53.644,42.001,53.644z"
                           />
                           <path
                              className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-middle"
                              d="M49.999,53.644c1.104,0,2,0.896,2,2v4c0,1.104-0.896,2-2,2s-1.998-0.896-1.998-2v-4C48.001,54.54,48.896,53.644,49.999,53.644z"
                           />
                           <path
                              className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-right"
                              d="M57.999,53.644c1.104,0,2,0.896,2,2v3.998c0,1.105-0.896,2-2,2c-1.105,0-2-0.895-2-2v-3.998C55.999,54.538,56.894,53.644,57.999,53.644z"
                           />
                        </g>
                        <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud">
                           <path
                              className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                              d="M63.999,64.944v-4.381c2.387-1.386,3.998-3.961,3.998-6.92c0-4.418-3.58-8-7.998-8c-1.603,0-3.084,0.481-4.334,1.291c-1.232-5.316-5.973-9.29-11.664-9.29c-6.628,0-11.999,5.372-11.999,12c0,3.549,1.55,6.729,3.998,8.926v4.914c-4.776-2.769-7.998-7.922-7.998-13.84c0-8.836,7.162-15.999,15.999-15.999c6.004,0,11.229,3.312,13.965,8.203c0.664-0.113,1.336-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12C71.997,58.864,68.655,63.296,63.999,64.944z"
                           />
                        </g>
                     </g>
                  </svg>
                  <h3>{suhu}</h3>
               </a>
            </li>
            <li className="profile-nav custom-dropdown">
               <div className="user-wrap" onClick={handleOpenProfileDropdown}>
                  <div className="user-img">
                     <img src={profile} alt="user" />
                  </div>
                  <div className="user-content">
                     <h6>Safrizal</h6>
                     <p className="mb-0">
                        Admin <i className="fa-solid fa-chevron-down" />
                     </p>
                  </div>
               </div>
               <div className={`custom-menu overflow-hidden ${openProfileDropdown ? "show" : ""}`} ref={dropdownRef}>
                  <ul className="profile-body">
                     <li className="d-flex">
                        <svg className="svg-color">
                           <use href={`${sprite}#Document`} />
                        </svg>
                        <a className="ms-2" href="to-do.html">
                           Task
                        </a>
                     </li>
                     <li className="d-flex">
                        <svg className="svg-color">
                           <use href={`${sprite}#Login`} />
                        </svg>
                        <a className="ms-2" href="#" onClick={handleLogout}>
                           Log Out
                        </a>
                     </li>
                  </ul>
               </div>
            </li>
         </ul>
      </div>
   );
};
export default HeaderRight;
