import { setInit } from "@/redux";
import { handleLogout, initKeycloak } from "@helpers/auth";
import Pageloader from "@helpers/pageloader";
import { cariPegawai } from "@helpers/simpeg";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResizeObserver from "resize-observer-polyfill";
import SimpleBar from "simplebar";
import Routing from "./routing";

const Header = React.lazy(() => import("@components/header"));
const Sidebar = React.lazy(() => import("@components/sidebar"));
const Breadcrumbs = React.lazy(() => import("@components/breadcrumbs"));
const Footer = React.lazy(() => import("@components/footer"));

function App() {
   const { init } = useSelector((e) => e.redux);
   const simplebarRef = useRef(null);
   const dispatch = useDispatch();

   const [{ isLoadingInitUser }, setState] = useState({
      isLoadingInitUser: true,
   });

   useEffect(() => {
      if (simplebarRef?.current) {
         new SimpleBar(simplebarRef?.current);
         window.ResizeObserver = ResizeObserver;
      }
      return () => {};
   }, [simplebarRef]);

   useEffect(() => {
      initKeycloak().then((res) => {
         if (!res) return;

         const { keycloak, user } = res;
         if (Object.keys(user).length > 0) {
            cariPegawai(user.preferred_username).then((res) => {
               if (res.length > 0) {
                  const pemimpin = res[0];
                  dispatch(setInit({ user, pemimpin, token: { Authorization: `Bearer ${keycloak.token}` } }));
                  setState({ isLoadingInitUser: false });
                  return;
               }

               return handleLogout();
            });
         } else {
            return handleLogout();
         }
      });
   }, [dispatch]);

   return isLoadingInitUser ? (
      <Pageloader />
   ) : (
      Object.keys(init).length > 0 && (
         <React.Suspense fallback={<Pageloader />}>
            <Header />
            <div className="page-body-wrapper">
               <Sidebar />
               <div className="page-body">
                  <Breadcrumbs />
                  <div className="container-fluid">
                     <Routing />
                  </div>
               </div>
               <Footer />
            </div>
         </React.Suspense>
      )
   );
}

export default App;
