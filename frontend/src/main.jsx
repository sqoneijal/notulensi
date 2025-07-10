import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/master.css";

import PreLoader from "@helpers/preloader";
import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";

const App = React.lazy(() => import("./App"));

createRoot(document.getElementById("root")).render(
   <BrowserRouter>
      <React.Suspense fallback={<PreLoader />}>
         <Toaster position="top-center" />
         <App />
      </React.Suspense>
   </BrowserRouter>
);
