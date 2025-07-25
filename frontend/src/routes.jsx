import React from "react";

const Home = React.lazy(() => import("@page/home/index"));
const EventDetail = React.lazy(() => import("@page/event/detail"));

const routes = [
   { path: "/", name: "Beranda", element: Home },
   { path: "/detail/event/:id", name: "Event", element: EventDetail },
];

export default routes;
