import React from "react";

const Dashboard = React.lazy(() => import("@page/dashboard"));
const Notulen = React.lazy(() => import("@page/notulen/lists"));
const NotulenForms = React.lazy(() => import("@page/notulen/forms"));

const routes = [
   { path: "/", name: "Dashboard", element: Dashboard },
   { path: "/dashboard", name: "Dashboard", element: Dashboard },
   { path: "/notulen", name: "Notulen", element: Notulen },
   { path: "/notulen/forms", name: "Notulen", element: NotulenForms },
];
export default routes;
