import { setActionButton, setModule } from "@/redux";
import { getHashValue } from "@helpers";
import PageLoader from "@helpers/pageloader";
import { get } from "@helpers/request";
import { useEffect, useState } from "react";
import { Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import ButirTugas from "./butirTugas";
import CetakHasilNotulensi from "./cetak-hasil-notulensi";
import FormsLampiran from "./formsLampiran";
import HasilDiskusi from "./hasilDiskusi";
import Keputusan from "./keputusan";
import Lampiran from "./lampiran";
import ModalDetailDeskripsiTugas from "./modalDetailDeskripsiTugas";
import ModalPemberianTugas from "./modalPemberianTugas";
import Peserta from "./peserta";
import QrcodePresensi from "./qrcodePresensi";
import Umum from "./umum";

const Index = () => {
   const { module } = useSelector((e) => e.redux);
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();

   const [{ isLoading }, setState] = useState({
      isLoading: true,
   });

   const getDetail = (id) => {
      const fetch = get(`/notulen/${id}`);
      fetch.then((res) => {
         const { data } = res;

         if (data.status) {
            dispatch(
               setModule({
                  ...module,
                  ...data.content,
                  openModalPemberianTugas: false,
                  detailPeserta: {},
                  openModalDetailDeskripsiTugas: false,
                  detailDeskripsi: {},
               })
            );
            dispatch(
               setActionButton({
                  type: "back",
                  path: "/notulen",
                  label: "Kembali",
                  className: "btn-danger",
               })
            );
         } else {
            navigate("/notulen");
         }
      });
      fetch.finally(() => setState((prev) => ({ ...prev, isLoading: false })));
   };

   useEffect(() => {
      getDetail(id);
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   const props = { getDetail };

   const navTabs = [
      { event: "umum", title: "Umum", element: <Umum /> },
      { event: "peserta", title: "Peserta Rapat", element: <Peserta /> },
      { event: "butir-tugas", title: "Butir Tugas", element: <ButirTugas /> },
      { event: "hasil-diskusi", title: "Poin - Poin Diskusi", element: <HasilDiskusi /> },
      { event: "keputusan", title: "Hasil Keputusan", element: <Keputusan /> },
      { event: "lampiran", title: "Lampiran", element: <Lampiran /> },
      { event: "qrcode", title: "QRCode Presensi", element: <QrcodePresensi /> },
      { event: "cetak", title: "Cetak Hasil Notulensi", element: <CetakHasilNotulensi /> },
   ];

   return isLoading ? (
      <PageLoader />
   ) : (
      <Row>
         <ModalPemberianTugas {...props} />
         <ModalDetailDeskripsiTugas />
         <FormsLampiran />
         <Col xs={12}>
            <Card>
               <Card.Body>
                  <Tabs
                     defaultActiveKey={getHashValue(location.hash)}
                     id={getHashValue(location.hash)}
                     className="mb-3"
                     transition={true}
                     onSelect={(key) => navigate(`#${key}`)}>
                     {navTabs.map((tab) => {
                        return (
                           <Tab eventKey={tab.event} title={tab.title} key={tab.event}>
                              {tab.element}
                           </Tab>
                        );
                     })}
                  </Tabs>
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};
export default Index;
