import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const HeaderLeft = () => {
   const location = useLocation();

   const [headerPathname, setHeaderPathname] = useState("");

   const capitalizeWords = (str) => {
      return str
         .toLowerCase() // pastikan semuanya huruf kecil dulu
         .split(" ") // pisahkan berdasarkan spasi
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // kapital huruf pertama
         .join(" "); // gabungkan kembali
   };

   useEffect(() => {
      const split_pathname = location.pathname.split("/");
      const text = split_pathname[1] === "" ? "Dashboard" : split_pathname[1];
      setHeaderPathname(capitalizeWords(text));
      document.title = capitalizeWords(text);
      return () => {};
   }, [location]);

   return (
      <div className="header-left">
         <h1 className="p-2">{headerPathname}</h1>
      </div>
   );
};
export default HeaderLeft;
