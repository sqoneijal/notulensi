import React from "react";

const Home = React.lazy(() => import("@page/home/index"));

const routes = [{ path: "/", name: "Beranda", element: Home }];

export default routes;
