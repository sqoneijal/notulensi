import dompurify from "dompurify";
import { decode } from "html-entities";

const Diskusi = ({ ...data }) => {
   return <div className="text" dangerouslySetInnerHTML={{ __html: dompurify.sanitize(decode(data.discussion_points), { format: "html5" }) }} />;
};
export default Diskusi;
