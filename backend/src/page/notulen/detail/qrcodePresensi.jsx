import React, { useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const QrcodePresensi = () => {
   const qrRef = useRef();
   const { module } = useSelector((e) => e.redux);

   const handlePrint = useReactToPrint({
      contentRef: qrRef,
   });

   return (
      <React.Fragment>
         <Container fluid ref={qrRef}>
            <Row className="text-center">
               <Col sm={12}>
                  <img src="/logo.svg" alt="logo uin" />
               </Col>
               <Col sm={12}>
                  <h2 className="text-dark fw-bold text-center pt-5 pb-3" style={{ fontSize: 28 }}>
                     Pindai kode QR ini untuk melakukan presensi
                  </h2>
                  <p className="text-dark text-center pb-3">Arahkan kamera perangkat Anda ke kode untuk memindainya.</p>
               </Col>
               <Col sm={12}>
                  <QRCode value={`https://memo-mortal.ar-raniry.ac.id/event/presensi/${module.note_id}`} size={400} />
               </Col>
               <Col sm={12}>
                  <h2 className="text-dark fw-bold text-center pt-5 pb-3" style={{ fontSize: 28 }}>
                     {module.title}
                  </h2>
                  <p className="text-dark text-center pb-3">{module.agenda}</p>
               </Col>
            </Row>
         </Container>
         <Row className="mt-3">
            <Col className="text-center">
               <Button onClick={handlePrint}>Cetak QRCode Presensi</Button>
            </Col>
         </Row>
      </React.Fragment>
   );
};
export default QrcodePresensi;
