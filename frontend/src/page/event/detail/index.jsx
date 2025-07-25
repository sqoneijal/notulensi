import "@assets/css/custom.css";
import PreLoader from "@helpers/preloader";
import { get } from "@helpers/request";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Title = React.lazy(() => import("./title"));
const Single = React.lazy(() => import("./single"));

const Index = () => {
   const { id } = useParams();

   const [{ pageLoading, data }, setState] = useState({
      pageLoading: true,
      data: {},
   });

   const props = { data };

   const getData = (id) => {
      const fetch = get(`/detail/event/${id}`);
      fetch.then(({ data }) => {
         setState((prev) => ({ ...prev, data }));
      });
      fetch.finally(() => setState((prev) => ({ ...prev, pageLoading: false })));
   };

   useEffect(() => {
      getData(id);
      return () => {};
   }, [id]);

   return pageLoading ? (
      <PreLoader />
   ) : (
      <React.Suspense fallback={<PreLoader />}>
         <Title {...props} />
         <Single {...props} />
      </React.Suspense>
   );
};
export default Index;
