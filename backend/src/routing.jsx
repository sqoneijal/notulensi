import Pageloader from "@helpers/pageloader";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./protectedRoute";
import path from "./routes_path";

const Routing = () => {
   const { init } = useSelector((e) => e.redux);
   const { is_admin } = init;

   return (
      <React.Suspense fallback={<Pageloader />}>
         <Routes>
            {path.map((item) => {
               if (!item.element) return null;
               return (
                  <Route
                     key={item.path}
                     path={item.path}
                     element={
                        item?.allowedRoles ? (
                           <ProtectedRoute allowedRoles={item.allowedRoles} userRole={is_admin ? "is_admin" : "default"}>
                              <item.element />
                           </ProtectedRoute>
                        ) : (
                           <item.element />
                        )
                     }
                  />
               );
            })}
         </Routes>
      </React.Suspense>
   );
};
export default Routing;
