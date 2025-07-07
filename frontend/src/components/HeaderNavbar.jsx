const HeaderNavbar = ({ setState }) => {
   return (
      <div className="header-navbar">
         <div className="nav-outer">
            <nav className="nav main-menu">
               <ul className="navigation">
                  <li className="current dropdown">
                     <a href="#">Home</a>
                     <ul>
                        <li>
                           <a href="index.html">Home 01</a>
                        </li>
                        <li>
                           <a href="index-2.html">Home 02</a>
                        </li>
                        <li>
                           <a href="index-3.html">Home 03</a>
                        </li>
                        <li className="dropdown">
                           <a href="#">Header Styles</a>
                           <ul>
                              <li>
                                 <a href="index.html">Header Style One</a>
                              </li>
                              <li>
                                 <a href="index-2.html">Header Style Two</a>
                              </li>
                              <li>
                                 <a href="index-3.html">Header Style Three</a>
                              </li>
                           </ul>
                        </li>
                     </ul>
                  </li>
                  <li className="has-mega-menu dropdown">
                     <a href="">Pages</a>
                     <div className="mega-menu">
                        <div className="mega-menu-bar row">
                           <div className="column col-lg-3">
                              <ul>
                                 <li>
                                    <a href="about.html">About Us</a>
                                 </li>
                                 <li>
                                    <a href="faq.html">FAQ's</a>
                                 </li>
                                 <li>
                                    <a href="pricing.html">Pricing</a>
                                 </li>
                                 <li>
                                    <a href="testimonial.html">Testimonials</a>
                                 </li>
                              </ul>
                           </div>
                           <div className="column col-lg-3">
                              <ul>
                                 <li>
                                    <a href="coming-soon.html">Comming Soon</a>
                                 </li>
                                 <li>
                                    <a href="contact.html">Contact Us</a>
                                 </li>
                                 <li>
                                    <a href="service.html">Service</a>
                                 </li>
                                 <li>
                                    <a href="service-single.html">Service Single</a>
                                 </li>
                              </ul>
                           </div>
                           <div className="column col-lg-3">
                              <ul>
                                 <li>
                                    <a href="speaker.html">Speakers</a>
                                 </li>
                                 <li>
                                    <a href="speaker-single.html">Speaker Single</a>
                                 </li>
                                 <li>
                                    <a href="event.html">Events</a>
                                 </li>
                                 <li>
                                    <a href="event-single.html">Event Single</a>
                                 </li>
                              </ul>
                           </div>
                           <div className="column col-lg-3">
                              <ul>
                                 <li>
                                    <a href="shop.html">Shop</a>
                                 </li>
                                 <li>
                                    <a href="shop-single.html">Shop Single</a>
                                 </li>
                                 <li>
                                    <a href="shopping-cart.html">Shopping Cart</a>
                                 </li>
                                 <li>
                                    <a href="checkout.html">Checkout</a>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </li>
                  <li className="dropdown">
                     <a href="#">Events</a>
                     <ul>
                        <li>
                           <a href="event.html">Events</a>
                        </li>
                        <li>
                           <a href="event-single.html">Event Single</a>
                        </li>
                     </ul>
                  </li>
                  <li className="dropdown">
                     <a href="#">Speakers</a>
                     <ul>
                        <li>
                           <a href="speaker.html">Speakers</a>
                        </li>
                        <li>
                           <a href="speaker-single.html">Speaker Single</a>
                        </li>
                     </ul>
                  </li>
                  <li className="dropdown">
                     <a href="#">Blogs</a>
                     <ul>
                        <li>
                           <a href="blog.html">Blogs</a>
                        </li>
                        <li>
                           <a href="blog-single.html">Blog Single</a>
                        </li>
                        <li>
                           <a href="error.html">Error 404</a>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <a href="contact.html">Contact</a>
                  </li>
               </ul>
            </nav>
         </div>

         <div className="outer-box">
            <button className="ui-btn search-btn" onClick={() => setState((prev) => ({ ...prev, openSearchModal: !prev.openSearchModal }))}>
               <i className="fi fi-tr-search-alt" />
            </button>
            <div className="btn-box">
               <a href="pricing.html" className="theme-btn btn-style-one light-bg">
                  <span className="btn-title">Buy Ticket</span>
               </a>
            </div>
            <div
               className="mobile-nav-toggler"
               style={{ color: "#fff", backgroundColor: "unset" }}
               onClick={() => setState((prev) => ({ ...prev, openMobileMenu: !prev.openMobileMenu }))}>
               <i className="fi fi-br-bars-sort" />
            </div>
         </div>
      </div>
   );
};
export default HeaderNavbar;
