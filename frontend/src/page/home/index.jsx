import PreLoader from "@helpers/preloader";
import { get } from "@helpers/request";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Banner = React.lazy(() => import("./banner"));
const NotulenTerbaru = React.lazy(() => import("./notulenTerbaru"));
const JadwalRapat = React.lazy(() => import("./jadwalRapat"));
const Gallery = React.lazy(() => import("./gallery"));

const Index = () => {
   const [state, setState] = useState({
      isLoading: true,
   });

   const { isLoading } = state;

   const getData = async () => {
      await get("/home")
         .then((res) => {
            const { data } = res;
            if (typeof data.code !== "undefined" && data.code !== 200) {
               toast.error(data.message);
            }

            setState((prev) => ({ ...prev, ...data }));
         })
         .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
   };

   useEffect(() => {
      document.title = "Memo Mortal";
      getData();
      return () => {};
   }, []);

   return isLoading ? (
      <PreLoader />
   ) : (
      <React.Suspense fallback={<PreLoader />}>
         <Banner {...state} />
         <NotulenTerbaru {...state} />
         <JadwalRapat {...state} />
         <Gallery {...state} />
      </React.Suspense>
   );
};
export default Index;
