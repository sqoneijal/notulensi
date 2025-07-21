import { setModule } from "@/redux";
import { Each } from "@helpers/each";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ButirTugas = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const handleClickPemberianTugas = (row) => {
      dispatch(setModule({ ...module, openModalPemberianTugas: true, detailPeserta: row }));
   };

   return (
      <Table size="sn">
         <thead>
            <tr>
               <th className="text-center" style={{ width: "5%" }}>
                  No
               </th>
               <th>NIP</th>
               <th>Nama</th>
               <th>Tenggat Waktu</th>
               <th>Deskripsi</th>
            </tr>
         </thead>
         <tbody>
            <Each
               of={module.peserta}
               render={(row, index) => {
                  return (
                     <tr key={row.nip}>
                        <td className="text-center">{index + 1}</td>
                        <td>
                           <a
                              href="#"
                              className="fw-bold"
                              onClick={(e) => {
                                 e.preventDefault();
                                 handleClickPemberianTugas(row);
                              }}>
                              {row.nip}
                           </a>
                        </td>
                        <td>{row.nama}</td>
                     </tr>
                  );
               }}
            />
         </tbody>
      </Table>
   );
};
export default ButirTugas;
