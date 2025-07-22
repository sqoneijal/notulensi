import { setActionButton, setModule } from "@/redux";
import { confirm } from "@helpers/confirm_delete";
import Grid from "@helpers/grid_table";
import { h } from "gridjs";
import moment from "moment";
import { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Index = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const gridRef = useRef(null);
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(
         setActionButton({
            type: "add",
            path: "/notulen/forms",
            label: "Tambah Data",
            className: "btn-primary",
         })
      );
      return () => {};
   }, [dispatch]);

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
                                 dispatch(setModule({ ...module, detailUpdate: row }));
                                 return navigate(`/notulen/forms`);
                              },
                           }),
                           h("input", {
                              className: "jsgrid-button jsgrid-delete-button",
                              type: "button",
                              title: "Delete",
                              onCLick: () => {
                                 const send = confirm(`/notulen/${row.id}`);
                                 send.then((res) => {
                                    if (typeof res !== "undefined") {
                                       const { data } = res;
                                       data.status && gridRef.current.updateConfig({}).forceRender();
                                    }
                                 });
                              },
                           })
                        ),
                  },
               ]}
               url="/notulen"
               gridRef={gridRef}
            />
         </Col>
      </Row>
   );
};
export default Index;
