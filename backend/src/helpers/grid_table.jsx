import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useSelector } from "react-redux";

const Grid_table = ({ columns, url }) => {
   const { init } = useSelector((e) => e.redux);

   return (
      <Grid
         columns={columns}
         search={true}
         sort={true}
         server={{
            url: `${import.meta.env.VITE_API_URL}${url}`,
            then: (data) => (data.results.length > 0 ? data.results : []),
            total: (data) => data.total,
            headers: { ...init.token },
         }}
         pagination={{
            limit: 10,
         }}
         className={{
            td: "jsgrid-cell",
            tr: "jsgrid-row",
            table: "jsgrid-table",
         }}
      />
   );
};
export default Grid_table;
