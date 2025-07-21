import React from "react";

const Dashboard = React.lazy(() => import("@page/dashboard"));
const Notulen = React.lazy(() => import("@page/notulen"));
const NotulenForms = React.lazy(() => import("@page/notulen/forms"));
const NotulenDetail = React.lazy(() => import("@page/notulen/detail"));

// referensi
const ReferensiKategori = React.lazy(() => import("@page/referensi/kategori"));
const ReferensiKategoriForms = React.lazy(() => import("@page/referensi/kategori/forms"));

const routes = [
   { path: "/", name: "Dashboard", element: Dashboard },
   { path: "/dashboard", name: "Dashboard", element: Dashboard },
   { path: "/notulen", name: "Notulen", element: Notulen },
   { path: "/notulen/forms", name: "Notulen", element: NotulenForms },
   { path: "/notulen/detail/:id", name: "Notulen", element: NotulenDetail },
   { path: "/referensi/kategori", name: "Kategori", element: ReferensiKategori },
   { path: "/referensi/kategori/forms", name: "Kategori", element: ReferensiKategoriForms },
];
export default routes;
