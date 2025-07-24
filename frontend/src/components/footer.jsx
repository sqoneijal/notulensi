import footer_bg from "@assets/images/3.jpg";
import logo_uin from "@assets/images/logo-uin.svg";
import moment from "moment";
import { Link } from "react-router";

const Footer = () => {
   return (
      <footer className="main-footer footer-style-one">
         <div className="bg bg-image" style={{ backgroundImage: `url(${footer_bg})` }} />
         <div className="shape-eleven bounce-y" />
         <div className="shape-twelve bounce-y" />
         <div className="widgets-section">
            <div className="auto-container">
               <div className="row">
                  <div className="footer-column col-xl-3 col-lg-6 col-md-6 col-sm-6">
                     <div className="footer-widget about-widget">
                        <div className="widget-content">
                           <div className="logo">
                              <Link to="/">
                                 <img src={logo_uin} alt="Logo" />
                              </Link>
                           </div>
                           <div className="text">
                              Aplikasi Notulensi ini dikembangkan untuk mendukung transparansi dan efisiensi rapat di lingkungan institusi.
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="footer-column col-xl-3 col-lg-6 col-md-6 col-sm-6">
                     <div className="footer-widget links-widget">
                        <h3 className="widget-title">Quick Links</h3>
                        <div className="widget-content">
                           <ul className="user-links">
                              <li>
                                 <i className="fa fa-angle-double-right"></i>
                                 <a href="index.html">Home</a>
                              </li>
                              <li>
                                 <i className="fa fa-angle-double-right"></i>
                                 <a href="about.html">About us</a>
                              </li>
                              <li>
                                 <i className="fa fa-angle-double-right"></i>
                                 <a href="speaker.html">Speakers</a>
                              </li>
                              <li>
                                 <i className="fa fa-angle-double-right"></i>
                                 <a href="pricing.html">Tickets</a>
                              </li>
                              <li>
                                 <i className="fa fa-angle-double-right"></i>
                                 <a href="blog.html">Blog</a>
                              </li>
                              <li>
                                 <i className="fa fa-angle-double-right"></i>
                                 <a href="contact.html">Contact</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="footer-bottom">
            <div className="auto-container">
               <div className="inner-container">
                  <div className="copyright-text">© {moment().format("YYYY")} Notulensi Digital. Efisien, Terintegrasi, Akurat.</div>
               </div>
            </div>
         </div>
      </footer>
   );
};
export default Footer;
