import page_title_bg from "@assets/images/8.jpg";
import dompurify from "dompurify";

const Title = ({ data }) => {
   const splitTitleToTwoLines = (input) => {
      const words = input.trim().split(" ");
      const half = Math.ceil(words.length / 2);

      const firstLine = words.slice(0, half).join(" ");
      const secondLine = words.slice(half).join(" ");

      return `${firstLine}<br/>${secondLine}`;
   };

   return (
      <section className="page-title" style={{ backgroundImage: `url(${data.banner_image ? data.banner_image : page_title_bg})` }}>
         <div className="shape-thirtyfour" />
         <div className="shape-thirtyfive" />
         <div className="shape-thirtysix bounce-y" />
         <div className="shape-thirtyseven bounce-x" />
         <div className="auto-container">
            <div className="inner-container">
               <h2
                  className="title"
                  dangerouslySetInnerHTML={{ __html: dompurify.sanitize(splitTitleToTwoLines(data.title), { format: "html5" }) }}
               />
            </div>
         </div>
      </section>
   );
};
export default Title;
