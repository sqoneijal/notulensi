import EditorTinymce from "@components/editorTinymce";
import { msgError, msgSuccess } from "@helpers/message";
import { post, postValue } from "@helpers/request";
import dompurify from "dompurify";
import { decode } from "html-entities";
import { useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const HasilDiskusi = () => {
   const { module } = useSelector((e) => e.redux);
   const editorRef = useRef(null);

   const [{ isSubmit }, setState] = useState({
      isSubmit: false,
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isSubmit: true }));

      const fetch = post(
         "/notulen/update-hasil-diskusi",
         postValue({
            id: module.note_id,
            discussion_points: editorRef.current.getContent(),
         })
      );
      fetch.then((res) => {
         const { data } = res;
         if (data.status) {
            msgSuccess(data.message);
         } else {
            msgError(data.message);
         }
      });
      fetch.finally(() => setState((prev) => ({ ...prev, isSubmit: false })));
   };

   return (
      <Card className="mb-0">
         <Card.Body className="m-0 p-0">
            <EditorTinymce
               initialValue={dompurify.sanitize(decode(module.discussion_points), { format: "html5" })}
               onInit={(_evt, editor) => (editorRef.current = editor)}
            />
         </Card.Body>
         <Card.Footer>
            <Button type="submit" disabled={isSubmit} onClick={isSubmit ? null : handleSubmit}>
               {isSubmit ? "Loading..." : "Simpan"}
            </Button>
         </Card.Footer>
      </Card>
   );
};
export default HasilDiskusi;
