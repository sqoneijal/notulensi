import { setModule } from "@/redux";
import { confirm } from "@helpers/confirm_delete";
import { Each } from "@helpers/each";
import { msgError, msgSuccess } from "@helpers/message";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Lampiran = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { user } = init;
   const dispatch = useDispatch();

   const [daftarLampiran, setDaftarLampiran] = useState([]);

   useEffect(() => {
      setDaftarLampiran(module.lampiran);
      return () => {};
   }, [module.lampiran]);

   return (
      <Table>
         <thead>
            <tr>
               <td colSpan={3}>
                  <Button size="sm" onClick={() => dispatch(setModule({ ...module, openFormsLampiran: true }))}>
                     Tambah Lampiran
                  </Button>
               </td>
            </tr>
            <tr>
               <th className="text-center" style={{ width: "5%" }}>
                  No
               </th>
               <th>Nama Lampiran</th>
               <th className="text-center" style={{ width: "10%" }}>
                  Aksi
               </th>
            </tr>
         </thead>
         <tbody className="lampiran-tbody">
            {daftarLampiran.length > 0 ? (
               <Each
                  of={daftarLampiran}
                  render={(row, index) => (
                     <tr key={row.id}>
                        <td className="text-center">{index + 1}</td>
                        <td>
                           <a href={row.file_path} target="_blank">
                              {row.file_name}
                           </a>
                        </td>
                        <td className="text-center">
                           <span>
                              <input
                                 type="button"
                                 className="jsgrid-button jsgrid-edit-button"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    if (user.preferred_username === row.user_modified) {
                                       dispatch(setModule({ ...module, openFormsLampiran: true, detailLampiran: row }));
                                    } else {
                                       msgError("Anda tidak memiliki akses untuk melakukan pembaharuan data.");
                                    }
                                 }}
                              />
                              <input
                                 type="button"
                                 className="jsgrid-button jsgrid-delete-button"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    if (user.preferred_username === row.user_modified) {
                                       const send = confirm(`/notulen/lampiran/${row.id}`);
                                       send.then((res) => {
                                          if (typeof res !== "undefined") {
                                             const { data } = res;
                                             if (data.status) {
                                                msgSuccess(data.message);
                                                dispatch(setModule({ ...module, lampiran: data.content }));
                                             } else {
                                                msgError(data.message);
                                             }
                                          }
                                       });
                                    } else {
                                       msgError("Anda tidak memiliki akses untuk melakukan penghapusan data.");
                                    }
                                 }}
                              />
                           </span>
                        </td>
                     </tr>
                  )}
               />
            ) : (
               <tr>
                  <td colSpan={3} className="text-center">
                     Tidak ada lampiran yang ditemukan
                  </td>
               </tr>
            )}
         </tbody>
      </Table>
   );
};
export default Lampiran;
