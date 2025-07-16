import "@assets/css/custom.css";
import "@assets/css/iconly-icon.css";
import "@assets/css/style.css";
import "@assets/css/themify.css";
import "@assets/fontawesome-free-6.3.0-web/css/all.css";
import "simplebar/dist/simplebar.min.css";
import "weather-icons/css/weather-icons.css";

import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App";
import redux from "./redux";

const store = configureStore({
   reducer: { redux },
});

createRoot(document.getElementById("pageWrapper")).render(
   <Provider store={store}>
      <BrowserRouter>
         <Toaster position="top-center" />
         <App />
      </BrowserRouter>
   </Provider>
);
