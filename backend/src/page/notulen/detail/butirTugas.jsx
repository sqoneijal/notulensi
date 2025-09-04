import { setModule } from "@/redux";
import { Each } from "@helpers/each";
import dompurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const ButirTugas = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const handleClickPemberianTugas = (row) => {
      dispatch(setModule({ ...module, openModalPemberianTugas: true, detailPeserta: row }));
   };

   const getTugas = (data) => {
      return data.reduce((acc, item) => {
         acc[item.assigned_to] = item;
         return acc;
      }, {});
   };

   const stripTags = (input) => {
      return input.replace(/<\/?[^>]+(>|$)/g, "");
   };

   const potongString = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      const trimmed = text.slice(0, maxLength);
      const lastSpace = trimmed.lastIndexOf(" ");
      return `${trimmed.slice(0, lastSpace)}...`;
   };

   return (
      <Table size="sm">
         <thead>
            <tr>
               <th className="text-center" style={{ width: "2%" }}>
                  No
               </th>
               <th style={{ width: "12%" }}>NIP</th>
               <th>Nama</th>
               <th className="text-center" style={{ width: "10%" }}>
                  Tenggat Waktu
               </th>
               <th>Deskripsi</th>
            </tr>
         </thead>
         <tbody>
            <Each
               of={module.peserta}
               render={(row, index) => {
                  const getIsiTugas = getTugas(module.butir_tugas)?.[row.participants_id];
                  const tugas = typeof getIsiTugas === "undefined" ? {} : getIsiTugas;
                  const uuid = uuidv4();

                  return (
                     <tr key={`${row.nip}-${uuid}`}>
                        <td className="text-center">{index + 1}</td>
                        <td>
                           <a
                              href="#"
                              className="fw-bold"
                              onClick={(e) => {
                                 e.preventDefault();
                                 handleClickPemberianTugas({ ...row, ...tugas });
                              }}>
                              {row.nip}
                           </a>
                        </td>
                        <td>{row.nama}</td>
                        <td className="text-center">{tugas?.due_date ? moment(tugas?.due_date).format("DD-MM-YYYY") : "-"}</td>
                        <td
                           dangerouslySetInnerHTML={{
                              __html: potongString(stripTags(dompurify.sanitize(decode(tugas?.description), { format: "html5" })), 100),
                           }}
                           style={{ cursor: "pointer" }}
                           onClick={() =>
                              dispatch(setModule({ ...module, openModalDetailDeskripsiTugas: true, detailDeskripsi: { ...row, ...tugas } }))
                           }
                        />
                     </tr>
                  );
               }}
            />
         </tbody>
      </Table>
   );
};
export default ButirTugas;
