import nav from "@/nav_path";
import { setActionButton, setModule } from "@/redux";
import iconly_sprite from "@assets/images/iconly-sprite.svg";
import { Each } from "@helpers/each";
import keycloakInstance from "@helpers/keycloak";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import ResizeObserver from "resize-observer-polyfill";
import SimpleBar from "simplebar";

const Sidebar = () => {
   const { module, init } = useSelector((e) => e.redux);
   const simplebarRef = useRef(null);
   const pinRefs = useRef([]);
   const dispatch = useDispatch();
   const location = useLocation();
   const { is_admin } = init;

   const [{ navigation }, setState] = useState({
      navigation: [],
   });

   useEffect(() => {
      setState((prev) => ({ ...prev, navigation: nav.filter((e) => e.role.includes(is_admin ? "is_admin" : "default")) }));
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [nav, is_admin]);

   // Helper function to handle sidebar link click
   const handleSidebarLinkClick = (item, sidebarListItems) => {
      item.classList.toggle("active");
      const submenu = item.closest(".sidebar-list").querySelector(".sidebar-submenu");
      if (submenu) {
         submenu.style.display = item.classList.contains("active") ? "block" : "none";
      }
      sidebarListItems.forEach((otherList) => {
         if (otherList === item) return;

         otherList.classList.remove("active");
         const otherSubmenu = otherList.closest(".sidebar-list").querySelector(".sidebar-submenu");
         if (otherSubmenu) {
            otherSubmenu.style.display = "none";
         }
      });
   };

   const togglePinnedName = () => {
      const pinTitle = document.querySelector(".pin-title");

      if (document.getElementsByClassName("pined").length) {
         if (!pinTitle.classList.contains("show")) pinTitle.classList.add("show");
      } else {
         pinTitle.classList.remove("show");
      }
   };

   const scrollTo = (element, to, duration) => {
      Math.easeInOutQuad = (t, b, c, d) => {
         t /= d / 2;
         if (t < 1) return (c / 2) * t * t + b;
         t--;
         return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const start = element.scrollTop;
      const change = to - start;
      let currentTime = 0;
      const increment = 20;
      const animateScroll = () => {
         currentTime += increment;
         const val = Math.easeInOutQuad(currentTime, start, change, duration);
         element.scrollTop = val;
         if (currentTime < duration) {
            setTimeout(animateScroll, increment);
         }
      };

      animateScroll();
   };

   useEffect(() => {
      if (navigation.length > 0) {
         if (simplebarRef?.current) {
            new SimpleBar(simplebarRef?.current);
            window.ResizeObserver = ResizeObserver;

            const sidebarListItems = document.querySelectorAll(".sidebar-link");
            // Add onclick event listener to each sidebar-list item
            sidebarListItems.forEach((item) => {
               item.addEventListener("click", () => handleSidebarLinkClick(item, sidebarListItems));
            });
         }

         if (pinRefs?.current) {
            pinRefs.current.forEach((item) => {
               const linkName = item.parentNode.querySelector("h6")?.innerHTML;
               const localStoragePins = JSON.parse(localStorage.getItem("pins") || "[]");

               if (Array.isArray(localStoragePins) && localStoragePins.includes(linkName)) {
                  item.parentNode.classList.add("pined");
               }

               item.addEventListener("click", () => {
                  let pins = JSON.parse(localStorage.getItem("pins") || "[]");

                  // Pastikan array
                  if (!Array.isArray(pins)) pins = [];

                  const isPinned = item.parentNode.classList.toggle("pined");

                  if (isPinned) {
                     if (!pins.includes(linkName)) pins.push(linkName);
                  } else {
                     pins = pins.filter((name) => name !== linkName);
                  }

                  localStorage.setItem("pins", JSON.stringify(pins));

                  togglePinnedName();

                  const topPos = item.offsetTop;
                  const sidebar = document.querySelector(".main-sidebar");

                  scrollTo(sidebar, item.parentElement.parentElement.classList.contains("pined") ? topPos - 30 : item.parentNode.offsetTop - 30, 600);
               });
            });

            togglePinnedName();
         }
      }

      return () => {};
   }, [simplebarRef, pinRefs, navigation]);

   useEffect(() => {
      // RESPONSIVE SIDEBAR 1200<
      document.addEventListener("DOMContentLoaded", function () {
         "use strict";
         const pageWrapper = document.querySelector(".page-wrapper");
         const toggleSidebarButton = document.querySelector(".toggle-sidebar");
         const widthWindow = window.innerWidth;
         if (widthWindow <= 1199) {
            pageWrapper.classList.add("sidebar-open");
            toggleSidebarButton.classList.add("close");
         }
         window.addEventListener("resize", () => {
            const widthWindow = window.innerWidth;
            if (widthWindow <= 1199) {
               pageWrapper.classList.add("sidebar-open");
               toggleSidebarButton.classList.add("close");
            } else {
               pageWrapper.classList.remove("sidebar-open");
               toggleSidebarButton.classList.remove("close");
            }
         });

         const activeLink = document.querySelector(".simplebar-wrapper .simplebar-content-wrapper a.active");
         if (!(activeLink && document.getElementById("pageWrapper").classList.contains("compact-wrapper"))) return;

         const scrollTop = activeLink.getBoundingClientRect().top + window.pageYOffset - 400;
         const contentWrapper = document.querySelector(".simplebar-wrapper .simplebar-content-wrapper");
         if (contentWrapper) {
            contentWrapper.scrollTo({
               top: scrollTop,
               behavior: "smooth", // animasi smooth seperti .animate di jQuery
            });
         }
      });
      return () => {};
   }, []);

   const handleOnClickNav = (row) => {
      keycloakInstance.updateToken(70);
      if (row.path !== location.pathname && typeof row.child === "undefined") {
         dispatch(setActionButton({}));
         dispatch(setModule({ ...module, detailUpdate: {} }));
      }
   };

   const setArrowIcon = (childElement) => {
      if (typeof childElement !== "undefined") {
         return <i className="iconly-Arrow-Right-2 icli" />;
      }
   };

   const renderChild = (childElement, pathname, parent_pathname) => {
      if (typeof childElement !== "undefined") {
         return (
            <ul className="sidebar-submenu" style={{ display: pathname.split("/").includes(parent_pathname.replace(/^#/, "")) ? "block" : "none" }}>
               <Each
                  of={childElement}
                  render={(row) => (
                     <li key={row.path} className={pathname === row.path ? "active" : ""}>
                        <Link className={pathname === row.path ? "active" : ""} to={row.path}>
                           {row.name}
                        </Link>
                     </li>
                  )}
               />
            </ul>
         );
      }
   };

   const renderParent = (row, pathname, index) => {
      const findParent = pathname.split("/").includes(row.path.replace(/^#/, ""));
      const activeParent = row.path === pathname || findParent ? "active" : "";

      return (
         <li className="sidebar-list" key={row.path}>
            <i className="fa-solid fa-thumbtack" ref={(el) => (pinRefs.current[index] = el)} />
            <Link className={`sidebar-link ${activeParent}`} to={row.path} onClick={() => handleOnClickNav(row)}>
               <svg className="stroke-icon">
                  <use href={`${iconly_sprite}#${row.icon}`} />
               </svg>
               <h6>{row.name}</h6>
               {setArrowIcon(row.child)}
            </Link>
            {renderChild(row.child, pathname, row.path)}
         </li>
      );
   };

   return (
      <aside className="page-sidebar">
         <div className="left-arrow" id="left-arrow">
            <i data-feather="arrow-left" />
         </div>
         <div className="main-sidebar" id="main-sidebar">
            <ul className="sidebar-menu" id="simple-bar" ref={simplebarRef}>
               <li className="pin-title sidebar-main-title">
                  <div>
                     <h5 className="sidebar-title f-w-700">Pinned</h5>
                  </div>
               </li>
               <li className="sidebar-main-title">
                  <div>
                     <h5 className="lan-1 f-w-700 sidebar-title">General</h5>
                  </div>
               </li>
               <Each of={navigation} render={(row, index) => renderParent(row, location.pathname, index)} />
            </ul>
         </div>
         <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right" />
         </div>
      </aside>
   );
};
export default Sidebar;
