import { setActionButton } from "@/redux";
import Grid from "@helpers/grid_table";
import { h } from "gridjs";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Index = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(
         setActionButton({
            type: "add",
            path: "/referensi/kategori/forms",
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
                           name: "Nama Kategori",
                           data: (row) => row.category_name,
                        },
                        {
                           id: "aksi",
                           sort: false,
                           width: "6%",
                           formatter: (cell, row) => {
                              console.log(row);
                              return h(
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
                                    onClick: (e) => console.log(e),
                                 })
                              );
                           },
                        },
                     ]}
                     url="/referensi/kategori"
                  />
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};
export default Index;
