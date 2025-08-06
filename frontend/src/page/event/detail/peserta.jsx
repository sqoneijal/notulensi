import { Each } from "@helpers/each";
import { v4 as uuidv4 } from "uuid";

const Peserta = ({ ...data }) => {
   const getStatusPresensi = (status) => {
      if (status === "hadir") {
         return <i className="icon fa fa-check" />;
      }
   };

   return (
      <div className="text">
         <ul className="popular-tags clearfix">
            <Each
               of={data.peserta}
               render={(row) => {
                  const uuid = uuidv4();
                  return (
                     <li key={`${row.nip}-${uuid}`}>
                        <span>
                           {row.nama} {getStatusPresensi(row.presensi)}
                        </span>
                     </li>
                  );
               }}
            />
         </ul>
      </div>
   );
};
export default Peserta;
