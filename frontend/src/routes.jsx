import React from "react";

const Home = React.lazy(() => import("@page/home/index"));
const Event = React.lazy(() => import("@page/event/lists"));
const EventDetail = React.lazy(() => import("@page/event/detail"));
const Presensi = React.lazy(() => import("@page/event/presensi"));

const routes = [
   { path: "/", name: "Beranda", element: Home },
   { path: "/event", name: "Event", element: Event },
   { path: "/detail/event/:id", name: "Event Detail", element: EventDetail },
   { path: "/event/presensi/:id", name: "Presensi", element: Presensi },
];

export default routes;
