import dompurify from "dompurify";
import { decode } from "html-entities";

const Keputusan = ({ ...data }) => {
   return <div className="text" dangerouslySetInnerHTML={{ __html: dompurify.sanitize(decode(data.decisions), { format: "html5" }) }} />;
};
export default Keputusan;
