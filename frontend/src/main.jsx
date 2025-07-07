import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/master.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
