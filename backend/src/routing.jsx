import Pageloader from "@helpers/pageloader";
import React from "react";
import { Route, Routes } from "react-router";
import path from "./routes_path";

const Routing = () => {
   return (
      <React.Suspense fallback={<Pageloader />}>
         <Routes>
            {path.map((item) => {
               return item.element && <Route path={item.path} element={<item.element />} />;
            })}
         </Routes>
      </React.Suspense>
   );
};
export default Routing;
