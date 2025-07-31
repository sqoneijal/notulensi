import { Each } from "@helpers/each";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue } from "@helpers/request";
import moment from "moment";
import { Badge, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Peserta = () => {
   const { module } = useSelector((e) => e.redux);

   const arrayStatus = [
      { value: "hadir", label: "Hadir" },
      { value: "absen", label: "Absen" },
      { value: "terlambat", label: "Terlambat" },
      { value: "tidak-hadir", label: "Tidak Hadir" },
   ];

   const getStatusPresesnsi = (data) => {
      return data.reduce((acc, item) => {
         acc[item.participant_id] = item;
         return acc;
      }, {});
   };

   const renderPresensi = (elem) => {
      if (typeof elem === "object" && elem !== null) {
         return elem.attendance_time ? <Badge bg="primary">{moment(elem.attendance_time).format("hh:mm A")}</Badge> : <span>-</span>;
      }
      return <span>-</span>;
   };

   const handleChangeStatus = (input) => {
      const fetch = post("/notulen/update-status-presensi", postValue(input));
      fetch.then((res) => {
         const { data } = res;
         if (data.status) {
            msgSuccess(data.message);
         } else {
            msgError(data.message);
         }
      });
   };

   const getStatusPresensi = (elem) => {
      if (typeof elem === "object") {
         return elem.status;
      }
   };

   return (
      <Table>
         <thead>
            <tr>
               <th className="text-center" style={{ width: "5%" }}>
                  No
               </th>
               <th>NIP</th>
               <th>Nama</th>
               <th>Email</th>
               <th className="text-center">Presensi</th>
               <th className="text-center" style={{ width: "10%" }}>
                  Status
               </th>
            </tr>
         </thead>
         <tbody>
            <Each
               of={module.peserta}
               render={(row, index) => {
                  const uuid = uuidv4();

                  return (
                     <tr key={`${row.nip}-${uuid}`} style={{ verticalAlign: "middle" }}>
                        <td className="text-center">{index + 1}</td>
                        <td>{row.nip}</td>
                        <td>{row.nama}</td>
                        <td>{row.email}</td>
                        <td className="text-center">{renderPresensi(getStatusPresesnsi(module.presensi)?.[row.participants_id])}</td>
                        <td className="text-center">
                           <Form.Select
                              id={`status-${index}`}
                              size="sm"
                              className="text-center p-0 border-0"
                              value={getStatusPresensi(getStatusPresesnsi(module.presensi)?.[row.participants_id])}
                              onChange={(e) =>
                                 handleChangeStatus({
                                    note_id: module.note_id,
                                    participant_id: row.participants_id,
                                    status: e.target.value,
                                 })
                              }>
                              <option value="">--pilih--</option>
                              <Each
                                 of={arrayStatus}
                                 render={(row, index) => (
                                    <option key={index} value={row.value}>
                                       {row.label}
                                    </option>
                                 )}
                              />
                           </Form.Select>
                        </td>
                     </tr>
                  );
               }}
            />
         </tbody>
      </Table>
   );
};
export default Peserta;
