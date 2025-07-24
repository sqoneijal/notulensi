import "@assets/css/lightcase.css";
import { Each } from "@helpers/each";
import $ from "jquery";
import { useEffect } from "react";

const Gallery = ({ gallery }) => {
   useEffect(() => {
      window.jQuery = $;
      window.$ = $;

      // Load lightcase.js secara dinamis setelah jQuery siap
      const script = document.createElement("script");
      script.src = "/src/assets/js/lightcase.js"; // pastikan path benar sesuai folder project kamu
      script.async = true;
      script.onload = () => {
         $("a[data-rel^=lightcase]").lightcase();
      };

      document.body.appendChild(script);
      return () => {
         document.body.removeChild(script);
      };
   }, []);

   return (
      gallery.length > 0 && (
         <section className="gallery-section p-0">
            <div className="outer-box">
               <div className="gallery one">
                  <Each
                     of={gallery}
                     render={(row) => (
                        <div className="gallery-block" key={row}>
                           <div className="inner-box">
                              <figure className="image">
                                 <a href={row} data-rel="lightcase">
                                    <img src={row} alt={row} style={{ width: 575, height: 476 }} />
                                    <img src={row} alt={row} style={{ width: 575, height: 476 }} />
                                 </a>
                              </figure>
                           </div>
                        </div>
                     )}
                  />
               </div>
            </div>

            <div className="outer-box">
               <div className="gallery two">
                  <Each
                     of={gallery}
                     render={(row) => (
                        <div className="gallery-block" key={row}>
                           <div className="inner-box">
                              <figure className="image">
                                 <a href={row} data-rel="lightcase">
                                    <img src={row} alt={row} style={{ width: 575, height: 476 }} />
                                    <img src={row} alt={row} style={{ width: 575, height: 476 }} />
                                 </a>
                              </figure>
                           </div>
                        </div>
                     )}
                  />
               </div>
            </div>
         </section>
      )
   );
};
export default Gallery;
