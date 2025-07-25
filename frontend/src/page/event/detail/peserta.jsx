import { Each } from "@helpers/each";

const Peserta = ({ ...data }) => {
   return (
      <div className="text">
         <h3 className="title">Peserta</h3>
         <ul className="popular-tags clearfix">
            <Each
               of={data.peserta}
               render={(row) => (
                  <li key={row.nip}>
                     <span>{row.nama}</span>
                  </li>
               )}
            />
         </ul>
      </div>
   );
};
export default Peserta;
