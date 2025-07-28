import page_title_bg from "@assets/images/8.jpg";

const Title = () => {
   return (
      <section className="page-title" style={{ backgroundImage: `url(${page_title_bg})` }}>
         <div className="shape-thirtyfour" />
         <div className="shape-thirtyfive" />
         <div className="shape-thirtysix bounce-y" />
         <div className="shape-thirtyseven bounce-x" />
         <div className="auto-container">
            <div className="inner-container">
               <h2 className="title">Agenda</h2>
            </div>
         </div>
      </section>
   );
};
export default Title;
