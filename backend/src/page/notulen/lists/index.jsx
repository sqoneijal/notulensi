import { setActionButton } from "@/redux";
import Grid from "@helpers/grid_table";
import { h } from "gridjs";
import moment from "moment";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Index = () => {
   const dispatch = useDispatch();

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
            <Card>
               <Card.Body>
                  <Grid
                     columns={[
                        {
                           name: "Judul",
                           data: (row) => row.title,
                        },
                        { name: "Agenda", data: (row) => row.agenda },
                        { name: "Waktu", data: (row) => moment(row.meeting_date).format("DD-MM-YYYY hh:mm A") },
                        { name: "Pemimpin Rapat", data: (row) => row.pemimpin_id },
                        {
                           id: "aksi",
                           sort: false,
                           width: "6%",
                           formatter: () =>
                              h(
                                 "span",
                                 {},
                                 h("input", {
                                    className: "jsgrid-button jsgrid-edit-button",
                                    type: "button",
                                    title: "Edit",
                                 }),
                                 h("input", {
                                    className: "jsgrid-button jsgrid-delete-button",
                                    type: "button",
                                    title: "Delete",
                                 })
                              ),
                        },
                     ]}
                     url="/notulen"
                  />
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};
export default Index;
