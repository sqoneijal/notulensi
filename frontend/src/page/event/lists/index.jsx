import PreLoader from "@helpers/preloader";
import { get } from "@helpers/request";
import React, { useEffect, useState } from "react";

const Title = React.lazy(() => import("./title"));
const Section = React.lazy(() => import("./section"));

const Index = () => {
   const [{ pageLoading, content, bottomOfPage, currentPage }, setState] = useState({
      pageLoading: true,
      content: [],
      bottomOfPage: false,
      totalData: 0,
      currentPage: 0,
   });

   const getData = (page = 0) => {
      const fetch = get(`/event?page=${page}`);
      fetch.then(({ data }) =>
         setState((prev) => ({
            ...prev,
            currentPage: prev.currentPage + 1,
            totalData: data.total,
            content: [...prev.content, ...data.content],
         }))
      );
      fetch.finally(() => setState((prev) => ({ ...prev, pageLoading: false })));
   };

   const props = { content, getData, setState, bottomOfPage, currentPage };

   useEffect(() => {
      getData();
      return () => {};
   }, []);

   return pageLoading ? (
      <PreLoader />
   ) : (
      <React.Suspense fallback={<PreLoader />}>
         <Title />
         <Section {...props} />
      </React.Suspense>
   );
};
export default Index;
