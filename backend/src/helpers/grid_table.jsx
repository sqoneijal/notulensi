import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Grid_table = ({ columns, url, gridRef }) => {
   const { init } = useSelector((e) => e.redux);
   const gridWrapper = useRef(null);

   useEffect(() => {
      const grid = new Grid({
         columns,
         sort: true,
         pagination: {
            limit: 10,
            server: {
               url: (prev, page, limit) => {
                  const separator = prev.includes("?") ? "&" : "?";
                  return `${prev}${separator}limit=${limit}&offset=${page * limit}`;
               },
               headers: { ...init.token },
            },
         },
         server: {
            url: `${import.meta.env.VITE_API_URL}${url}`,
            then: (data) => (data.results.length > 0 ? data.results : []),
            total: (data) => data.total,
            headers: { ...init.token },
         },
         search: {
            server: {
               url: (prev, keyword) => {
                  const separator = prev.includes("?") ? "&" : "?";
                  return `${prev}${separator}search=${keyword}`;
               },
               headers: { ...init.token },
            },
         },
         className: {
            td: "jsgrid-cell",
            tr: "jsgrid-row",
            table: "jsgrid-table",
         },
         language: {
            search: {
               placeholder: "🔍 Cari...",
            },
            pagination: {
               limit: 10,
               server: {
                  url: (prev, page, limit) => `${prev}?limit=${limit}&offset=${page * limit}`,
               },
               showing: "😃 Displaying",
               results: () => "Records",
            },
         },
      });

      if (gridWrapper.current) {
         grid.render(gridWrapper.current);
         gridRef.current = grid;
      }

      return () => grid.destroy();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Card>
         <Card.Body ref={gridWrapper} />
      </Card>
   );
};
export default Grid_table;
