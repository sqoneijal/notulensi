import nav from "@/nav_path";
import { setActionButton, setModule } from "@/redux";
import iconly_sprite from "@assets/images/iconly-sprite.svg";
import { Each } from "@helpers/each";
import keycloakInstance from "@helpers/keycloak";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import ResizeObserver from "resize-observer-polyfill";
import SimpleBar from "simplebar";

const Sidebar = () => {
   const { module } = useSelector((e) => e.redux);
   const simplebarRef = useRef(null);
   const pinRefs = useRef([]);
   const dispatch = useDispatch();
   const location = useLocation();

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
            const linkName = item.parentNode.querySelector("h6").innerHTML;
            const initialLocalStorage = JSON.parse(localStorage.getItem("pins") || false);

            if (initialLocalStorage?.includes(linkName)) {
               item.parentNode.classList.add("pined");
            }

            item.addEventListener("click", () => {
               let localStoragePins = JSON.parse(localStorage.getItem("pins") || false);
               item.parentNode.classList.toggle("pined");

               if (localStoragePins?.length) {
                  if (item.parentNode.classList.contains("pined")) {
                     if (!localStoragePins?.includes(linkName)) localStoragePins = [...localStoragePins, linkName];
                  } else {
                     localStoragePins?.includes(linkName) && localStoragePins.splice(localStoragePins.indexOf(linkName), 1);
                  }
                  localStorage.setItem("pins", JSON.stringify(localStoragePins));
               } else {
                  localStorage.setItem("pins", JSON.stringify([linkName]));
               }

               togglePinnedName();

               const topPos = item.offsetTop;

               if (item.parentElement.parentElement.classList.contains("pined")) {
                  scrollTo(document.getElementsByClassName("main-sidebar")[0], topPos - 30, 600);
               } else {
                  scrollTo(document.getElementsByClassName("main-sidebar")[0], item.parentNode.offsetTop - 30, 600);
               }
            });
         });

         togglePinnedName();
      }
      return () => {};
   }, [simplebarRef, pinRefs]);

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

   const renderChild = (childElement) => {
      if (typeof childElement !== "undefined") {
         return (
            <ul className="sidebar-submenu">
               <Each
                  of={childElement}
                  render={(row) => (
                     <li key={row.path}>
                        <Link to={row.path}>{row.name}</Link>
                     </li>
                  )}
               />
            </ul>
         );
      }
   };

   const renderParent = (row, index) => {
      return (
         <li className="sidebar-list" key={row.path}>
            <i className="fa-solid fa-thumbtack" ref={(el) => (pinRefs.current[index] = el)} />
            <Link className="sidebar-link" to={row.path} onClick={() => handleOnClickNav(row)}>
               <svg className="stroke-icon">
                  <use href={`${iconly_sprite}#${row.icon}`} />
               </svg>
               <h6>{row.name}</h6>
               {setArrowIcon(row.child)}
            </Link>
            {renderChild(row.child)}
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
               <Each of={nav} render={(row, index) => renderParent(row, index)} />
               <li className="sidebar-main-title">
                  <div>
                     <h5 className="f-w-700 sidebar-title pt-3">Application</h5>
                  </div>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Info-circle"></use>
                     </svg>
                     <h6 className="f-w-600">Project</h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="project-list.html">Project list </a>
                     </li>
                     <li>
                        <a href="projectcreate.html">Project create </a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="file-manager.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Paper"></use>
                     </svg>
                     <h6 className="f-w-600">File Manager </h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="kanban-board.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Wallet"></use>
                     </svg>
                     <h6 className="f-w-600">Kanban board</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Bag"></use>
                     </svg>
                     <h6 className="f-w-600">Ecommerce</h6>
                     <i className="iconly-Arrow-Right-2 icli"> </i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="add-products.html">Add Products</a>
                     </li>
                     <li>
                        <a href="product.html">Product</a>
                     </li>
                     <li>
                        <a href="product-page.html">Product Page</a>
                     </li>
                     <li>
                        <a href="category.html">Category page</a>
                     </li>
                     <li>
                        <a href="list-products.html">Product list</a>
                     </li>
                     <li>
                        <a href="payment-details.html">Payment Details</a>
                     </li>
                     <li>
                        <a href="order-history.html">Order History</a>
                     </li>
                     <li>
                        <a className="submenu-title" href="#">
                           Invoices<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="invoices-1.html">Invoices 1</a>
                           </li>
                           <li>
                              <a href="invoices-2.html">Invoices 2</a>
                           </li>
                           <li>
                              <a href="invoices-3.html">Invoices 3</a>
                           </li>
                           <li>
                              <a href="invoices-4.html">Invoices 4</a>
                           </li>
                           <li>
                              <a href="invoices-5.html">Invoices 5</a>
                           </li>
                           <li>
                              <a href="invoices-6.html">Invoices 6</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a href="cart.html">Cart</a>
                     </li>
                     <li>
                        <a href="list-wish.html">Wishlist</a>
                     </li>
                     <li>
                        <a href="checkout.html">Checkout</a>
                     </li>
                     <li>
                        <a href="pricing.html">Pricing </a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="letter-box.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Message"></use>
                     </svg>
                     <h6 className="f-w-600">Letter Box</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Chat"></use>
                     </svg>
                     <h6 className="f-w-600">Chat</h6>
                     <i className="iconly-Arrow-Right-2 icli"> </i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="private-chat.html">Private Chat</a>
                     </li>
                     <li>
                        <a href="group-chat.html">Group Chat</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Profile"></use>
                     </svg>
                     <h6 className="f-w-600">Users</h6>
                     <i className="iconly-Arrow-Right-2 icli"> </i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="user-profile.html">Users Profile</a>
                     </li>
                     <li>
                        <a href="edit-profile.html">Users Edit</a>
                     </li>
                     <li>
                        <a href="user-cards.html">Users Cards </a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="bookmark.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Bookmark"></use>
                     </svg>
                     <h6 className="f-w-600">Bookmarks</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="contacts.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Contacts"></use>
                     </svg>
                     <h6 className="f-w-600">Contacts </h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="task.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Tick-square"></use>
                     </svg>
                     <h6 className="f-w-600">Tasks</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="calendar-basic.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Calendar"></use>
                     </svg>
                     <h6 className="f-w-600">Calendar </h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="social-app.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Camera"></use>
                     </svg>
                     <h6 className="f-w-600">Social App</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="to-do.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Edit"></use>
                     </svg>
                     <h6 className="f-w-600">To-Do </h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="search.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Search-sidebar"></use>
                     </svg>
                     <h6 className="f-w-600">Search Result </h6>
                  </a>
               </li>
               <li className="sidebar-main-title">
                  <div>
                     <h5 className="f-w-700 sidebar-title pt-3">Components</h5>
                  </div>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="buttons.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#More-box"></use>
                     </svg>
                     <h6 className="f-w-600">buttons </h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Folder"></use>
                     </svg>
                     <h6 className="f-w-600">Ui Kits</h6>
                     <i className="iconly-Arrow-Right-2 icli"> </i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="typography.html">Typography</a>
                     </li>
                     <li>
                        <a href="avatars.html">Avatars</a>
                     </li>
                     <li>
                        <a href="alert.html">Alert</a>
                     </li>
                     <li>
                        <a href="helper-classes.html">Helper classes</a>
                     </li>
                     <li>
                        <a href="grid.html">Grid</a>
                     </li>
                     <li>
                        <a href="accordion.html">Accordion</a>
                     </li>
                     <li>
                        <a href="tag-pills.html">Tag pills</a>
                     </li>
                     <li>
                        <a href="modal.html">Modal </a>
                     </li>
                     <li>
                        <a href="popover.html">Popover </a>
                     </li>
                     <li>
                        <a href="progress-bar.html">Progress bar</a>
                     </li>
                     <li>
                        <a href="tab-bootstrap.html">Tab bootstrap</a>
                     </li>
                     <li>
                        <a href="tooltip.html">Tooltip</a>
                     </li>
                     <li>
                        <a href="dropdown.html"> Dropdown</a>
                     </li>
                     <li>
                        <a href="list.html">List</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Ticket-star"></use>
                     </svg>
                     <h6 className="f-w-600">Bonus Ui</h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="scrollable.html">Scrollable</a>
                     </li>
                     <li>
                        <a href="tree.html">Tree view </a>
                     </li>
                     <li>
                        <a href="toasts.html">Toasts </a>
                     </li>
                     <li>
                        <a href="rating.html">Rating</a>
                     </li>
                     <li>
                        <a href="dropzone.html">Dropzone</a>
                     </li>
                     <li>
                        <a href="tour.html">Tour</a>
                     </li>
                     <li>
                        <a href="sweetalert2.html">Sweetalert2 </a>
                     </li>
                     <li>
                        <a href="modal-animated.html">Animated Modal</a>
                     </li>
                     <li>
                        <a href="slider.html">Slider</a>
                     </li>
                     <li>
                        <a href="ribbons.html">Ribbons</a>
                     </li>
                     <li>
                        <a href="pagination.html">Pagination</a>
                     </li>
                     <li>
                        <a href="breadcrumb.html">Breadcrumb</a>
                     </li>
                     <li>
                        <a href="range-slider.html">Range slider</a>
                     </li>
                     <li>
                        <a href="image-cropper.html">Image cropper</a>
                     </li>
                     <li>
                        <a href="basic-card.html">Basic Card</a>
                     </li>
                     <li>
                        <a href="creative-card.html">Creative Card</a>
                     </li>
                     <li>
                        <a href="dragable-card.html">Dragable Card </a>
                     </li>
                     <li>
                        <a href="timeline.html">Timeline</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Category"></use>
                     </svg>
                     <h6 className="f-w-600">Animation </h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="AOS.html">aos</a>
                     </li>
                     <li>
                        <a href="WOW.html">wow</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Activity"></use>
                     </svg>
                     <h6 className="f-w-600">Icon</h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="font-awesome.html">Fontawesome icon</a>
                     </li>
                     <li>
                        <a href="feather_icon.html">Feather icon</a>
                     </li>
                     <li>
                        <a href="iconly-icon.html">Iconly icon </a>
                     </li>
                     <li>
                        <a href="themify-icon.html">Themify Icon</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Chart"></use>
                     </svg>
                     <h6 className="f-w-600">Charts</h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="echarts.html">Echarts</a>
                     </li>
                     <li>
                        <a href="apex_chart.html">Apex Chart</a>
                     </li>
                     <li>
                        <a href="chart-google.html">Google Chart</a>
                     </li>
                     <li>
                        <a href="chart-sparkline.html">Sparkline chart</a>
                     </li>
                     <li>
                        <a href="chart-flot.html">Flot Chart</a>
                     </li>
                     <li>
                        <a href="chart-knob.html">Knob Chart</a>
                     </li>
                     <li>
                        <a href="chart-morris.html">Morris Chart</a>
                     </li>
                     <li>
                        <a href="chartjs.html">Chatjs Chart</a>
                     </li>
                     <li>
                        <a href="chartist_chart.html">Chartist Chart</a>
                     </li>
                     <li>
                        <a href="chart-peity.html">Peity Chart</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-main-title">
                  <div>
                     <h5 className="sidebar-title pt-3 f-w-700">Tables & Forms</h5>
                  </div>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Filter"></use>
                     </svg>
                     <h6 className="f-w-600">Forms</h6>
                     <i className="iconly-Arrow-Right-2 icli"> </i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a className="submenu-title" href="#">
                           form-control<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="base-input.html">Base input</a>
                           </li>
                           <li>
                              <a href="form-validation.html">Form validation</a>
                           </li>
                           <li>
                              <a href="radio-checkbox-control.html">Checkbox & Radio </a>
                           </li>
                           <li>
                              <a href="input-group.html">Input group</a>
                           </li>
                           <li>
                              <a href="input-mask.html">Input mask</a>
                           </li>
                           <li>
                              <a href="megaoptions.html">Mega Options </a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a className="submenu-title" href="#">
                           Form Widgets<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="datepicker.html">Datepicker</a>
                           </li>
                           <li>
                              <a href="touchspin.html">Touchspin</a>
                           </li>
                           <li>
                              <a href="select2.html">Select2 </a>
                           </li>
                           <li>
                              <a href="switch.html">Switch </a>
                           </li>
                           <li>
                              <a href="typehead.html">Typehead </a>
                           </li>
                           <li>
                              <a href="clipboard.html">Clipboard</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a className="submenu-title" href="#">
                           Form Layout<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="form-wizard.html">Form wizard 1</a>
                           </li>
                           <li>
                              <a href="form-wizard-two.html">Form wizard 2</a>
                           </li>
                           <li>
                              <a href="form-wizard-three.html">Two factor</a>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Edit-line"></use>
                     </svg>
                     <h6 className="f-w-600">Tables</h6>
                     <i className="iconly-Arrow-Right-2 icli"> </i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a className="submenu-title" href="#">
                           Bootstrap Tables<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="basic-table.html">Basic Tables</a>
                           </li>
                           <li>
                              <a href="table-components.html">Table components</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a className="submenu-title" href="#">
                           Data Tables<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="datatable-basic-init.html">Basic Init</a>
                           </li>
                           <li>
                              <a href="datatable-advance.html">Advance Init</a>
                           </li>
                           <li>
                              <a href="datatable-API.html">API</a>
                           </li>
                           <li>
                              <a href="datatable-data-source.html">Data Sources</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a href="datatable-ext-autofill.html">Ex. Data Tables</a>
                     </li>
                     <li>
                        <a href="jsgrid-table.html">Js Grid Table </a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-main-title">
                  <div>
                     <h5 className="sidebar-title pt-3 f-w-700">Pages</h5>
                  </div>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="landing-page.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Wallet"></use>
                     </svg>
                     <h6 className="f-w-600">Landing page</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="sample-page.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Paper-plus"></use>
                     </svg>
                     <h6 className="f-w-600">Sample page</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="internationalization.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Play"></use>
                     </svg>
                     <h6 className="f-w-600">Internationalization</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="../starter-kit/index.html" target="_blank">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Star-kit"></use>
                     </svg>
                     <h6 className="f-w-600">Starter kit</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Password"></use>
                     </svg>
                     <h6 className="f-w-600">Others</h6>
                     <i className="iconly-Arrow-Right-2 icli"> </i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a className="submenu-title" href="#">
                           Error Page<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="error-page1.html">Error page 1</a>
                           </li>
                           <li>
                              <a href="error-page2.html">Error page 2</a>
                           </li>
                           <li>
                              <a href="error-page3.html">Error page 3</a>
                           </li>
                           <li>
                              <a href="error-page4.html">Error page 4</a>
                           </li>
                           <li>
                              <a href="error-page5.html">Error page 5</a>
                           </li>
                           <li>
                              <a href="error-page6.html">Error page 6</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a className="submenu-title" href="#">
                           Authentication<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="login.html" target="_blank">
                                 Login Simple
                              </a>
                           </li>
                           <li>
                              <a href="login_one.html" target="_blank">
                                 Login with bg image
                              </a>
                           </li>
                           <li>
                              <a href="login_two.html" target="_blank">
                                 Login with image two
                              </a>
                           </li>
                           <li>
                              <a href="login-bs-validation.html" target="_blank">
                                 Login With validation
                              </a>
                           </li>
                           <li>
                              <a href="login-bs-tt-validation.html" target="_blank">
                                 Login with tooltip
                              </a>
                           </li>
                           <li>
                              <a href="login-sa-validation.html" target="_blank">
                                 Login with sweetalert
                              </a>
                           </li>
                           <li>
                              <a href="sign-up.html" target="_blank">
                                 Register Simple
                              </a>
                           </li>
                           <li>
                              <a href="sign-up-one.html" target="_blank">
                                 Register with Bg Image
                              </a>
                           </li>
                           <li>
                              <a href="sign-up-two.html" target="_blank">
                                 Register with image two
                              </a>
                           </li>
                           <li>
                              <a href="sign-up-wizard.html" target="_blank">
                                 Register wizard
                              </a>
                           </li>
                           <li>
                              <a href="unlock.html">Unlock User</a>
                           </li>
                           <li>
                              <a href="forget-password.html">Forget Password</a>
                           </li>
                           <li>
                              <a href="reset-password.html">Reset Password</a>
                           </li>
                           <li>
                              <a href="maintenance.html">Maintenance</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a className="submenu-title" href="#">
                           Coming Soon<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="comingsoon.html">Coming Simple</a>
                           </li>
                           <li>
                              <a href="comingsoon-bg-video.html">Coming with Bg video</a>
                           </li>
                           <li>
                              <a href="comingsoon-bg-img.html">Coming with Bg Image</a>
                           </li>
                        </ul>
                     </li>
                     <li>
                        <a className="submenu-title" href="#">
                           Email templates<i className="iconly-Arrow-Right-2 icli"> </i>
                        </a>
                        <ul className="according-submenu">
                           <li>
                              <a href="basic-template.html">Basic Email</a>
                           </li>
                           <li>
                              <a href="email-header.html">Basic With Header</a>
                           </li>
                           <li>
                              <a href="template-email.html">Ecomerce Template</a>
                           </li>
                           <li>
                              <a href="template-email-2.html">Email Template 2</a>
                           </li>
                           <li>
                              <a href="ecommerce-templates.html">Ecommerce Email</a>
                           </li>
                           <li>
                              <a href="email-order-success.html">Order Success</a>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-main-title">
                  <div>
                     <h5 className="sidebar-title pt-3 f-w-700">Miscellaneous</h5>
                  </div>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Gallery"></use>
                     </svg>
                     <h6 className="f-w-600">Gallery </h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="gallery.html">Gallery Grid</a>
                     </li>
                     <li>
                        <a href="gallery-with-description.html">Gallery Grid Desc</a>
                     </li>
                     <li>
                        <a href="masonary.html">Masonary Gallery</a>
                     </li>
                     <li>
                        <a href="masonary_with_disc.html">Masonary With Desc</a>
                     </li>
                     <li>
                        <a href="gallery-hover.html">Hover Effects</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Game"></use>
                     </svg>
                     <h6 className="f-w-600">Blog </h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="blog.html">Blog Details</a>
                     </li>
                     <li>
                        <a href="blog-single.html">Blog Single</a>
                     </li>
                     <li>
                        <a href="add_post.html">Add Post</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <a className="sidebar-link" href="faq.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Danger"></use>
                     </svg>
                     <h6 className="f-w-600">FAQ</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Filter-2"></use>
                     </svg>
                     <h6 className="f-w-600">Job Search </h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="job-cards-view.html">Card view</a>
                     </li>
                     <li>
                        <a href="job-list-view.html">List view</a>
                     </li>
                     <li>
                        <a href="job-details.html">Job details </a>
                     </li>
                     <li>
                        <a href="job-apply.html">Apply</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Work"></use>
                     </svg>
                     <h6 className="f-w-600">Learning</h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="learning_list_visit.html">Learning List</a>
                     </li>
                     <li>
                        <a href="learning_detailed.html">Learning Detailed</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Discovery"></use>
                     </svg>
                     <h6 className="f-w-600">Maps</h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="data-map.html">Data Map</a>
                     </li>
                     <li>
                        <a href="vector-map.html">Vector Maps</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="#">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Shield"></use>
                     </svg>
                     <h6 className="f-w-600">Editors</h6>
                     <i className="iconly-Arrow-Right-2 icli"></i>
                  </a>
                  <ul className="sidebar-submenu">
                     <li>
                        <a href="quilleditor.html">Quill editor</a>
                     </li>
                     <li>
                        <a href="ace-code-editor.html">ACE Code Editor</a>
                     </li>
                  </ul>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="knowledgebase.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Setting"></use>
                     </svg>
                     <h6 className="f-w-600">Knowledgebase</h6>
                  </a>
               </li>
               <li className="sidebar-list">
                  <i className="fa-solid fa-thumbtack"></i>
                  <a className="sidebar-link" href="support-ticket.html">
                     <svg className="stroke-icon">
                        <use href="../assets/svg/iconly-sprite.svg#Ticket"></use>
                     </svg>
                     <h6 className="f-w-600">Support Ticket</h6>
                  </a>
               </li>
            </ul>
         </div>
         <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right"></i>
         </div>
      </aside>
   );
};
export default Sidebar;
