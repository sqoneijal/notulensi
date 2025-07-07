import { PreLoader } from "@helpers";
import React from "react";

const Banner = React.lazy(() => import("./banner"));

const Index = () => {
   return (
      <React.Suspense fallback={<PreLoader />}>
         <Banner />
      </React.Suspense>
   );
};
export default Index;
