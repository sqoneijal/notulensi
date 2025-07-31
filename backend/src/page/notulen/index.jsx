import { setActionButton, setModule } from "@/redux";
import { isKategori1 } from "@helpers";
import { confirm } from "@helpers/confirm_delete";
import Grid from "@helpers/grid_table";
import { msgError } from "@helpers/message";
import { h } from "gridjs";
import moment from "moment";
import { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Index = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { pemimpin, is_admin, userApp, user } = init;
   const dispatch = useDispatch();
   const gridRef = useRef(null);
   const navigate = useNavigate();

   const result_note_id = [...userApp.note_id_pemimpin, ...userApp.note_id_petugas];
   const note_id = result_note_id.length > 0 ? `note_id=${result_note_id.join(",")}` : "";

   useEffect(() => {
      if (isKategori1(pemimpin.unitKerjaSaatIni, is_admin)) {
         dispatch(
            setActionButton({
               type: "add",
               path: "/notulen/forms",
               label: "Tambah Data",
               className: "btn-primary",
            })
         );
      } else {
         dispatch(setActionButton({}));
      }

      return () => {};
   }, [dispatch, pemimpin, is_admin]);

   return (
      <Row>
         <Col sm={12}>
            <Grid
               columns={[
                  {
                     name: "Judul",
                     data: (row) => {
                        return h(
                           "a",
                           {
                              class: "fw-bold",
                              href: "#",
                              onClick: (e) => {
                                 e.preventDefault();
                                 navigate(`/notulen/detail/${row.id}`);
                              },
                           },
                           row.title
                        );
                     },
                  },
                  { name: "Agenda", data: (row) => row.agenda },
                  { name: "Waktu", data: (row) => moment(row.meeting_date).format("DD-MM-YYYY hh:mm A") },
                  { name: "Pemimpin", data: (row) => row.pemimpin },
                  { name: "Petugas", data: (row) => row.moderator },
                  {
                     id: "aksi",
                     sort: false,
                     attributes: () => {
                        return {
                           class: "gridjs-td jsgrid-cell jsgrid-control-field jsgrid-align-center",
                        };
                     },
                     data: (row) =>
                        h(
                           "span",
                           {},
                           h("input", {
                              className: "jsgrid-button jsgrid-edit-button",
                              type: "button",
                              title: "Edit",
                              onClick: () => {
                                 if (user.preferred_username === row.user_modified) {
                                    dispatch(setModule({ ...module, detailUpdate: row }));
                                    return navigate(`/notulen/forms`);
                                 }
                                 msgError("Anda tidak memiliki akses untuk melakukan pembaharuan data.");
                              },
                           }),
                           h("input", {
                              className: "jsgrid-button jsgrid-delete-button",
                              type: "button",
                              title: "Delete",
                              onCLick: () => {
                                 if (user.preferred_username === row.user_modified) {
                                    const send = confirm(`/notulen/${row.id}`);
                                    send.then((res) => {
                                       if (typeof res !== "undefined") {
                                          const { data } = res;
                                          data.status && gridRef.current.updateConfig({}).forceRender();
                                       }
                                    });
                                 } else {
                                    msgError("Anda tidak memiliki akses untuk melakukan penghapusan data.");
                                 }
                              },
                           })
                        ),
                  },
               ]}
               url={`/notulen?is_admin=${is_admin}&${note_id}`}
               gridRef={gridRef}
            />
         </Col>
      </Row>
   );
};
export default Index;
