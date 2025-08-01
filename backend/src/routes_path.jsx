import React from "react";

const Dashboard = React.lazy(() => import("@page/dashboard"));
const Notulen = React.lazy(() => import("@page/notulen"));
const NotulenForms = React.lazy(() => import("@page/notulen/forms"));
const NotulenDetail = React.lazy(() => import("@page/notulen/detail"));

// referensi
const ReferensiKategori = React.lazy(() => import("@page/referensi/kategori"));
const ReferensiKategoriForms = React.lazy(() => import("@page/referensi/kategori/forms"));

const Unauthorized = React.lazy(() => import("@page/unauthorized"));

const routes = [
   {
      path: "/unauthorized",
      name: "Unauthorized",
      element: Unauthorized,
      breadcrumbs: ["Unauthorized"],
      allowedRoles: ["is_admin", "default"],
   },
   {
      path: "/",
      name: "Dashboard",
      element: Dashboard,
      breadcrumbs: ["Dashboard"],
   },
   {
      path: "/dashboard",
      name: "Dashboard",
      element: Dashboard,
      breadcrumbs: ["Dashboard"],
   },
   {
      path: "/notulen",
      name: "Notulen",
      element: Notulen,
      breadcrumbs: ["Notulen"],
   },
   {
      path: "/notulen/forms",
      name: "Notulen",
      element: NotulenForms,
      breadcrumbs: ["Notulen", "Forms"],
      allowedRoles: ["is_admin", "bos"],
   },
   {
      path: "/notulen/detail/:id",
      name: "Notulen",
      element: NotulenDetail,
      breadcrumbs: ["Notulen", "Detail"],
   },
   {
      path: "/referensi/kategori",
      name: "Kategori",
      element: ReferensiKategori,
      breadcrumbs: ["Referensi", "Kategori"],
      allowedRoles: ["is_admin"],
   },
   {
      path: "/referensi/kategori/forms",
      name: "Kategori",
      element: ReferensiKategoriForms,
      breadcrumbs: ["Referensi", "Kategori", "Forms"],
      allowedRoles: ["is_admin"],
   },
];
export default routes;
