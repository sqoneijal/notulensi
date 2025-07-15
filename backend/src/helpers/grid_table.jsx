import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

const Grid_table = () => {
   return (
      <Grid
         data={[
            ["John", "john@example.com", "(353) 01 222 3333"],
            ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
            ["Eoin", "eo3n@yahoo.com", "(05) 10 878 5554"],
            ["Nisen", "nis900@gmail.com", "313 333 1923"],
         ]}
         columns={["Name", "Email", "Phone"]}
         search={true}
         sort={true}
         pagination={{
            limit: 5,
         }}
      />
   );
};
export default Grid_table;
