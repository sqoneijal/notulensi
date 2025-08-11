import Pageloader from "@helpers/pageloader";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./protectedRoute";
import path from "./routes_path";

const Routing = () => {
   const { init } = useSelector((e) => e.redux);
   const { is_admin, userApp, is_operator } = init;

   const getUserRole = (is_admin, level, is_operator) => {
      if (is_admin) {
         return "is_admin";
      }

      return is_operator ? "is_operator" : level;
   };

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
                           <ProtectedRoute allowedRoles={item.allowedRoles} userRole={getUserRole(is_admin, userApp.level, is_operator)}>
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
