import { setActionButton, setModule } from "@/redux";
import { confirm } from "@helpers/confirm_delete";
import Grid from "@helpers/grid_table";
import { h } from "gridjs";
import { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Index = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const gridRef = useRef(null);
   const navigate = useNavigate();

   const handleEdit = (row) => {
      dispatch(setModule({ ...module, detailUpdate: row }));
      navigate(`/referensi/kategori/forms`);
   };

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
            <Grid
               columns={[
                  {
                     name: "Nama Kategori",
                     data: (row) => row.category_name,
                  },
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
                              onClick: () => handleEdit(row),
                           }),
                           h("input", {
                              className: "jsgrid-button jsgrid-delete-button",
                              type: "button",
                              title: "Delete",
                              onClick: () => {
                                 const send = confirm(`/referensi/kategori/${row.id}`);
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
               url="/referensi/kategori"
               gridRef={gridRef}
            />
         </Col>
      </Row>
   );
};
export default Index;
