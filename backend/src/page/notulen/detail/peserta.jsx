import { Each } from "@helpers/each";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue } from "@helpers/request";
import moment from "moment";
import { useRef, useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

const Peserta = () => {
   const { module } = useSelector((e) => e.redux);
   const checkbox = useRef([]);
   const { id } = useParams();

   const [{ listEmailToSending, isLoadingSendingEmail }, setState] = useState({
      listEmailToSending: [],
      isLoadingSendingEmail: false,
   });

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

   const handleKirimUndangan = (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isLoadingSendingEmail: true }));

      const peserta = [];
      Object.keys(checkbox.current).forEach((nip) => {
         if (checkbox.current[nip].checked) {
            peserta.push(JSON.parse(checkbox.current[nip].dataset.json));
         }
      });

      const fetch = post(`/notulen/kirim-undangan`, { note_id: id, peserta: JSON.stringify(peserta) });
      fetch.then(({ data }) => {
         if (data.status) {
            msgSuccess(data.message);
         } else {
            msgError(data.message);
         }
      });
      fetch.finally(() => setState((prev) => ({ ...prev, isLoadingSendingEmail: false })));
   };

   const handleSelectAll = (e) => {
      const { checked } = e.target;
      const allNips = Object.keys(checkbox.current);

      if (checked) {
         // Select all checkboxes and collect their values
         allNips.forEach((nip) => {
            if (checkbox.current[nip]) {
               checkbox.current[nip].checked = true;
            }
         });
         const selected = allNips.map((nip) => checkbox.current[nip]?.value).filter(Boolean);
         setState((prev) => ({ ...prev, listEmailToSending: selected }));
         return;
      }

      // Deselect all checkboxes
      allNips.forEach((nip) => {
         if (checkbox.current[nip]) {
            checkbox.current[nip].checked = false;
         }
      });
      setState((prev) => ({ ...prev, listEmailToSending: [] }));
   };

   const handleChecked = (e) => {
      const { checked, value } = e.target;

      setState((prev) => ({
         ...prev,
         listEmailToSending: checked
            ? [...prev.listEmailToSending, value] // tambah jika dicentang
            : prev.listEmailToSending.filter((item) => item !== value), // hapus jika tidak dicentang
      }));
   };

   return (
      <Table>
         <thead>
            {listEmailToSending.length > 0 && (
               <tr>
                  <td colSpan={7}>
                     <Button size="sm" onClick={handleKirimUndangan}>
                        {isLoadingSendingEmail ? "Loading..." : "Kirim Undangan Rapat"}
                     </Button>
                  </td>
               </tr>
            )}
            <tr>
               <th style={{ width: "1%" }}>
                  <Form.Check inline={true} className="m-0 p-0" onChange={handleSelectAll} />
               </th>
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
                        <td className="text-center">
                           {row.email && (
                              <Form.Check
                                 id={`${row.nip}-${uuid}`}
                                 inline={true}
                                 className="m-0 p-0"
                                 ref={(el) => (checkbox.current[row.nip] = el)}
                                 value={row.nip}
                                 checked={listEmailToSending.includes(row.nip)}
                                 onChange={handleChecked}
                                 data-json={JSON.stringify(row)}
                              />
                           )}
                        </td>
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
