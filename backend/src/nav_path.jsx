const nav = [
   {
      path: "/dashboard",
      name: "Dashboard",
      icon: "Home-dashboard",
      role: ["is_admin", "default"],
   },
   {
      path: "#referensi",
      name: "Referensi",
      icon: "Filter",
      role: ["is_admin"],
      child: [{ path: "/referensi/kategori", name: "Kategori", role: ["is_admin"] }],
   },
   {
      path: "/notulen",
      name: "Notulen",
      icon: "Document",
      role: ["is_admin", "default"],
   },
];
export default nav;
