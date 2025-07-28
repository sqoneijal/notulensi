import React from "react";

const Home = React.lazy(() => import("@page/home/index"));
const Event = React.lazy(() => import("@page/event/lists"));
const EventDetail = React.lazy(() => import("@page/event/detail"));

const routes = [
   { path: "/", name: "Beranda", element: Home },
   { path: "/event", name: "Event", element: Event },
   { path: "/detail/event/:id", name: "Event Detail", element: EventDetail },
];

export default routes;
