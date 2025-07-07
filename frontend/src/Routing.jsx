import { PreLoader } from "@helpers";
import React from "react";
import { Route, Routes } from "react-router";
import routes from "./routes";

const Routing = () => {
   return (
      <React.Suspense fallback={<PreLoader />}>
         <Routes>
            {routes.map((item) => {
               document.title = item.name;
               return item.element && <Route path={item.path} element={<item.element />} />;
            })}
         </Routes>
      </React.Suspense>
   );
};
export default Routing;
