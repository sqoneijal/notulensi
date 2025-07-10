import PreLoader from "@helpers/preloader";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

const Routing = React.lazy(() => import("./Routing"));
const Header = React.lazy(() => import("@components/header"));

function App() {
   const circle = useRef(null);
   const circleFollow = useRef(null);

   useEffect(() => {
      const moveCircle = (e) => {
         gsap.to(circle.current, {
            duration: 0.3,
            x: e.clientX,
            y: e.clientY,
         });
         gsap.to(circleFollow.current, {
            duration: 0.7,
            x: e.clientX,
            y: e.clientY,
         });
      };

      const hoverFunc = () => {
         gsap.to(circle.current, {
            duration: 0.3,
            opacity: 1,
            scale: 0,
         });
         gsap.to(circleFollow.current, {
            duration: 0.3,
            scale: 1.2,
         });
      };

      const unhoverFunc = () => {
         gsap.to(circle.current, {
            duration: 0.3,
            opacity: 1,
            scale: 1,
         });
         gsap.to(circleFollow.current, {
            duration: 0.3,
            scale: 1,
         });
      };

      // Simpan referensi node untuk cleanup nanti
      const hoverTargets = document.querySelectorAll("a, .clink");

      window.addEventListener("mousemove", moveCircle);
      hoverTargets.forEach((el) => {
         el.addEventListener("mouseenter", hoverFunc);
         el.addEventListener("mouseleave", unhoverFunc);
      });

      // ✅ Cleanup function
      return () => {
         window.removeEventListener("mousemove", moveCircle);
         hoverTargets.forEach((el) => {
            el.removeEventListener("mouseenter", hoverFunc);
            el.removeEventListener("mouseleave", unhoverFunc);
         });
      };
   }, [circle, circleFollow]);

   return (
      <React.Suspense fallback={<PreLoader />}>
         <div className="circle" ref={circle} />
         <div className="circle-follow" ref={circleFollow} />
         <Header />
         <div className="hidden-bar-back-drop" />

         <Routing />

         <section className="about-section">
            <div className="icon-one bounce-y"></div>
            <div className="icon-two bounce-y"></div>
            <div className="auto-container">
               <div className="outer-box">
                  <div className="image-box wow fadeInUp">
                     <div className="image-outer">
                        <figure className="image overlay-anim ">
                           <img src="images/resource/about1-1.png" alt="Image" />
                        </figure>
                        <div className="icon-nineteen"></div>
                        <div className="icon-twenty"></div>
                     </div>
                     <div className="speaker-box">
                        <i className="icon flaticon-mic"></i>
                        <div className="count">15</div>
                        <div className="text">
                           Iconic <br /> Speakers
                        </div>
                     </div>
                  </div>
               </div>
               <div className="outer-box two">
                  <div className="image-box">
                     <div className="image-outer">
                        <figure className="image overlay-anim reveal">
                           <img src="images/resource/about1-2.png" alt="Image" />
                        </figure>
                        <div className="icon-twentyfour"></div>
                     </div>
                  </div>
                  <div className="content-box wow fadeInRight" data-wow-delay="200ms">
                     <div className="sec-title">
                        <span className="sub-title">About Event</span>
                        <h2 className="text-reveal-anim">
                           Meet Web Development <br /> Talents Around Word
                        </h2>
                        <div className="text text-anim">
                           Like previous year this year we are arranging world marketing summit 2024. Its the gathering of all the big and amazing
                           marketing & branding minds from all over the world. Discussing the best techniques for branding to deep dive into consumers
                           mind. Will try to spread best knowledge about marketing.
                        </div>
                     </div>
                     <div className="btn-box">
                        <a href="pricing.html" className="theme-btn btn-style-one icon-btn bg-yellow">
                           <i className="icon flaticon-tickets"></i>
                           <span className="btn-title">Buy Ticket</span>
                        </a>
                        <a href="contact.html" className="theme-btn btn-style-one icon-btn">
                           <i className="icon flaticon-placeholder"></i>
                           <span className="btn-title">Location</span>
                        </a>
                     </div>
                  </div>
               </div>
               <div className="outer-box show-xl">
                  <div className="image-box wow fadeInUp">
                     <figure className="image">
                        <img src="images/resource/about1-1.png" alt="Image" />
                     </figure>
                     <div className="speaker-box">
                        <i className="icon flaticon-mic"></i>
                        <div className="count">15</div>
                        <div className="text">
                           Iconic <br /> Speakers
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <div className="marquee-section">
            <div className="marquee-container">
               <div className="marquee">
                  <div className="text">Experience</div>
                  <div className="text">*</div>
                  <div className="text">Event</div>
                  <div className="text">*</div>
                  <div className="text">Conference</div>
                  <div className="text">*</div>
                  <div className="text">Experience</div>
                  <div className="text">*</div>
                  <div className="text">Event</div>
                  <div className="text">*</div>
                  <div className="text">Conference</div>
                  <div className="text">*</div>
                  <div className="text">Experience</div>
                  <div className="text">*</div>
                  <div className="text">Event</div>
                  <div className="text">*</div>
                  <div className="text">Conference</div>
                  <div className="text">*</div>
                  <div className="text">Experience</div>
                  <div className="text">*</div>
                  <div className="text">Event</div>
                  <div className="text">*</div>
                  <div className="text">Conference</div>
                  <div className="text">*</div>
               </div>
            </div>
         </div>

         <section className="features-section">
            <div className="shape-one bounce-y"></div>
            <div className="shape-two"></div>
            <div className="auto-container">
               <div className="sec-title text-center">
                  <span className="sub-title">Our Features</span>
                  <h2 className="text-reveal-anim">
                     Tailored Features for <br /> Your Events
                  </h2>
               </div>
               <div className="row">
                  <div className="feature-block has-active col-lg-3 col-md-6 col-sm-6 wow fadeInUp">
                     <div className="inner-box">
                        <i className="icon flaticon-speech"></i>
                        <div className="content">
                           <h5 className="title">Confirm Speakers</h5>
                           <div className="text">Meh synth Schlitz, tempo Duis single-origin coffee ea next level ethnic finger.</div>
                           <a href="event-single.html" className="read-more">
                              <span>Read More</span> <i className="fa fa-arrow-right"></i>
                           </a>
                        </div>
                     </div>
                  </div>

                  <div className="feature-block has-active col-lg-3 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="200ms">
                     <div className="inner-box">
                        <i className="icon flaticon-computer"></i>
                        <div className="content">
                           <h5 className="title">Best Digital Ideas</h5>
                           <div className="text">Meh synth Schlitz, tempo Duis single-origin coffee ea next level ethnic finger.</div>
                           <a href="event-single.html" className="read-more">
                              <span>Read More</span> <i className="fa fa-arrow-right"></i>
                           </a>
                        </div>
                     </div>
                  </div>

                  <div className="feature-block has-active col-lg-3 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="400ms">
                     <div className="inner-box active">
                        <i className="icon flaticon-team"></i>
                        <div className="content">
                           <h5 className="title">Networking People</h5>
                           <div className="text">Meh synth Schlitz, tempo Duis single-origin coffee ea next level ethnic finger.</div>
                           <a href="event-single.html" className="read-more">
                              <span>Read More</span> <i className="fa fa-arrow-right"></i>
                           </a>
                        </div>
                     </div>
                  </div>

                  <div className="feature-block has-active col-lg-3 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="600ms">
                     <div className="inner-box">
                        <i className="icon flaticon-creativity"></i>
                        <div className="content">
                           <h5 className="title">Inspiring Keynotes</h5>
                           <div className="text">Meh synth Schlitz, tempo Duis single-origin coffee ea next level ethnic finger.</div>
                           <a href="event-single.html" className="read-more">
                              <span>Read More</span> <i className="fa fa-arrow-right"></i>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="speakers-section">
            <div className="bg bg-image" style={{ backgroundImage: `url(images/background/1.jpg)` }}></div>
            <div className="auto-container">
               <div className="sec-title light text-center">
                  <span className="sub-title">Events Speakers</span>
                  <h2 className="text-reveal-anim">
                     World Class Speakers <br /> For Conference
                  </h2>
               </div>
               <div className="row">
                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp">
                     <div className="inner-box">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-1.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-1.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>
                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Harnold Min</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>

                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="200ms">
                     <div className="inner-box active">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-2.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-2.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>

                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Mike Formalin</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>

                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="400ms">
                     <div className="inner-box">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-3.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-3.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>

                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Aronic Kenan</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>

                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="600ms">
                     <div className="inner-box">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-4.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-4.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>

                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Joakim Ken</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>

                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp">
                     <div className="inner-box">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-5.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-5.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>

                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Mike Formalin</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>

                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="200ms">
                     <div className="inner-box">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-6.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-6.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>

                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Joakim Ken</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>

                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="400ms">
                     <div className="inner-box">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-7.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-7.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>

                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Harnold Min</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>

                  <div className="speaker-block has-active col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="600ms">
                     <div className="inner-box">
                        <div className="image-box">
                           <figure className="image">
                              <a href="speaker-single.html">
                                 <img src="images/resource/speaker1-8.jpg" alt="Image" />
                                 <img src="images/resource/speaker1-8.jpg" alt="Image" />
                              </a>
                           </figure>
                           <div className="icon-box">
                              <span className="icon share-icon fa fa-share-alt"></span>
                           </div>

                           <div className="social-links">
                              <a href="speaker-single.html">
                                 <i className="fab fa-twitter"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-instagram"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-pinterest-p"></i>
                              </a>
                              <a href="speaker-single.html">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           </div>
                        </div>
                        <div className="info-box">
                           <h4 className="name">
                              <a href="speaker-single.html">Aronic Kenan</a>
                           </h4>
                           <span className="designation">Lead Speaker</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="btn-box text-center">
                  <a href="contact.html" className="theme-btn btn-style-one bg-yellow">
                     <span className="btn-title">Registration Now</span>
                  </a>
               </div>
            </div>
         </section>

         <section className="event-section">
            <div className="shape-three bounce-y"></div>
            <div className="shape-four bounce-y"></div>
            <div className="auto-container">
               <div className="sec-title text-center">
                  <span className="sub-title">Event Schedule</span>
                  <h2 className="text-reveal-anim">Digital Events List</h2>
                  <div className="text">
                     Today, what started as a small conference has turned into the unmissable <br /> rendez-vous for product people.
                  </div>
               </div>

               <div className="event-tabs tabs-box">
                  <ul className="tab-btns tab-buttons wow fadeInUp">
                     <li className="tab-btn" data-tab="#tab1">
                        1st Day
                     </li>
                     <li className="tab-btn active-btn" data-tab="#tab2">
                        2nd Day
                     </li>
                     <li className="tab-btn" data-tab="#tab3">
                        3rd Day
                     </li>
                  </ul>

                  <div className="tabs-content wow fadeInUp" data-wow-delay="200ms">
                     <div className="tab" id="tab1">
                        <div className="outer-box">
                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Conference About Spicker</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <a href="pricing.html" className="theme-btn btn-style-one">
                                       <span className="btn-title">Buy Tickets</span>
                                    </a>
                                 </div>
                              </div>
                           </div>

                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Envato User Experience Expertise</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <h4 className="title free">Free Event</h4>
                                 </div>
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                              </div>
                           </div>

                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Apple event : inspiring Creative Solution</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <h4 className="title sold">Sold Out</h4>
                                 </div>
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="tab active-tab" id="tab2">
                        <div className="outer-box">
                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Conference About Spicker</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <a href="pricing.html" className="theme-btn btn-style-one">
                                       <span className="btn-title">Buy Tickets</span>
                                    </a>
                                 </div>
                              </div>
                           </div>

                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Envato User Experience Expertise</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <h4 className="title free">Free Event</h4>
                                 </div>
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                              </div>
                           </div>

                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Apple event : inspiring Creative Solution</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <h4 className="title sold">Sold Out</h4>
                                 </div>
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="tab" id="tab3">
                        <div className="outer-box">
                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Conference About Spicker</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <a href="pricing.html" className="theme-btn btn-style-one">
                                       <span className="btn-title">Buy Tickets</span>
                                    </a>
                                 </div>
                              </div>
                           </div>

                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Envato User Experience Expertise</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <h4 className="title free">Free Event</h4>
                                 </div>
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                              </div>
                           </div>

                           <div className="event-block">
                              <div className="inner-box event-block-inner">
                                 <div className="date-box">
                                    <div className="date">18</div>
                                    <div className="year">
                                       August, <br /> 2024
                                    </div>
                                 </div>
                                 <div className="title-box">
                                    <h3 className="title">
                                       <a href="pricing.html">Apple event : inspiring Creative Solution</a>
                                    </h3>
                                    <ul className="location-box">
                                       <li>
                                          <i className="icon fal fa-location-dot"></i>Apple Upper west side, Brook
                                       </li>
                                       <li>
                                          <i className="icon fal fa-clock"></i>10:15 am 07:15 pm
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="btn-box">
                                    <h4 className="title sold">Sold Out</h4>
                                 </div>
                                 <div className="event-hover" style={{ backgroundImage: `url(images/resource/event1-1.png)` }}></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="gallery-section p-0">
            <div className="outer-box">
               <div className="gallery one">
                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-1.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-1.jpg" alt="Image" />
                              <img src="images/resource/gallery1-1.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-2.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-2.jpg" alt="Image" />
                              <img src="images/resource/gallery1-2.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-3.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-3.jpg" alt="Image" />
                              <img src="images/resource/gallery1-3.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-4.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-4.jpg" alt="Image" />
                              <img src="images/resource/gallery1-4.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-1.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-1.jpg" alt="Image" />
                              <img src="images/resource/gallery1-1.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-2.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-2.jpg" alt="Image" />
                              <img src="images/resource/gallery1-2.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-3.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-3.jpg" alt="Image" />
                              <img src="images/resource/gallery1-3.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-4.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-4.jpg" alt="Image" />
                              <img src="images/resource/gallery1-4.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>
               </div>
            </div>

            <div className="outer-box">
               <div className="gallery two">
                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-5.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-5.jpg" alt="Image" />
                              <img src="images/resource/gallery1-5.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-6.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-6.jpg" alt="Image" />
                              <img src="images/resource/gallery1-6.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-7.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-7.jpg" alt="Image" />
                              <img src="images/resource/gallery1-7.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-8.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-8.jpg" alt="Image" />
                              <img src="images/resource/gallery1-8.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-5.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-5.jpg" alt="Image" />
                              <img src="images/resource/gallery1-5.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-6.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-6.jpg" alt="Image" />
                              <img src="images/resource/gallery1-6.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-7.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-7.jpg" alt="Image" />
                              <img src="images/resource/gallery1-7.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>

                  <div className="gallery-block">
                     <div className="inner-box">
                        <figure className="image">
                           <a href="images/resource/gallery1-8.jpg" data-rel="lightcase">
                              <img src="images/resource/gallery1-8.jpg" alt="Image" />
                              <img src="images/resource/gallery1-8.jpg" alt="Image" />
                           </a>
                        </figure>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="pricing-section">
            <div className="icon-three bounce-y"></div>
            <div className="icon-four"></div>
            <div className="auto-container">
               <div className="sec-title text-center">
                  <span className="sub-title">Conference Ticket Price</span>
                  <h2 className="text-reveal-anim">
                     Get You a Conference <br /> Tickets Now
                  </h2>
               </div>
               <div className="row">
                  <div className="pricing-block col-xl-4 col-lg-6 col-md-6 col-sm-12 wow fadeInUp">
                     <div className="inner-box">
                        <div className="shape-twentynine"></div>
                        <div className="plan-box">
                           <h5 className="plan">Regular Plan</h5>
                        </div>
                        <div className="top-box">
                           <div className="price-box">
                              <h2 className="price">$120</h2>
                              <h5 className="day">1st Day</h5>
                           </div>
                           <h4 className="pass">Standard Pass</h4>
                        </div>
                        <div className="list-box">
                           <div className="shape-five"></div>
                           <ul className="feature-list">
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-one"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Conference Package</h5>
                                    <div className="text">(Includes workshop, coffee etc)</div>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-one"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Online Live Streams</h5>
                                    <div className="text">(Can access online free)</div>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-one"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Speaker Meet & Greet</h5>
                                    <div className="text">(Ask questions privately)</div>
                                 </div>
                              </li>
                           </ul>

                           <div className="btn-box">
                              <a href="pricing.html" className="theme-btn btn-style-one pricing-btn">
                                 <span className="btn-title">Buy Ticket</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="pricing-block active two col-xl-4 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="200ms">
                     <div className="inner-box">
                        <div className="shape-twentynine"></div>
                        <div className="plan-box">
                           <h5 className="plan">Business Plan</h5>
                        </div>
                        <div className="top-box">
                           <div className="price-box">
                              <h2 className="price">$180</h2>
                              <h5 className="day">2nd Day</h5>
                           </div>
                           <h4 className="pass">Flexible Pass</h4>
                        </div>
                        <div className="list-box">
                           <div className="shape-five"></div>
                           <ul className="feature-list">
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-two"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Conference Package</h5>
                                    <div className="text">(Includes workshop, coffee etc)</div>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-two"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Online Live Streams</h5>
                                    <div className="text">(Can access online free)</div>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-two"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Speaker Meet & Greet</h5>
                                    <div className="text">(Ask questions privately)</div>
                                 </div>
                              </li>
                           </ul>

                           <div className="btn-box">
                              <a href="pricing.html" className="theme-btn btn-style-one pricing-btn">
                                 <span className="btn-title">Buy Ticket</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="pricing-block three col-xl-4 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="400ms">
                     <div className="inner-box">
                        <div className="shape-twentynine"></div>
                        <div className="plan-box">
                           <h5 className="plan">Enterprise Plan</h5>
                        </div>
                        <div className="top-box">
                           <div className="price-box">
                              <h2 className="price">$210</h2>
                              <h5 className="day">3rd Day</h5>
                           </div>
                           <h4 className="pass">Fabulously Pass</h4>
                        </div>
                        <div className="list-box">
                           <div className="shape-five"></div>
                           <ul className="feature-list">
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-three"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Conference Package</h5>
                                    <div className="text">(Includes workshop, coffee etc)</div>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-three"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Online Live Streams</h5>
                                    <div className="text">(Can access online free)</div>
                                 </div>
                              </li>
                              <li>
                                 <div className="icon-box">
                                    <div className="icon-check"></div>
                                    <div className="check-bg check-bg-three"></div>
                                 </div>
                                 <div className="content">
                                    <h5 className="title">Speaker Meet & Greet</h5>
                                    <div className="text">(Ask questions privately)</div>
                                 </div>
                              </li>
                           </ul>

                           <div className="btn-box">
                              <a href="pricing.html" className="theme-btn btn-style-one pricing-btn">
                                 <span className="btn-title">Buy Ticket</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="client-section pt-0">
            <div className="auto-container">
               <div className="row">
                  <div className="content-column col-xl-4 col-lg-12 col-md-12 col-sm-12 wow fadeInLeft">
                     <div className="inner-column">
                        <div className="sec-title">
                           <span className="sub-title">Who helps us to create</span>
                           <h2 className="text-reveal-anim">Our Platinum Sponsors</h2>
                           <div className="text">
                              We have dedicated tracks for every industry Whether you want to hire tech’s top talent meet with the policymakers
                              influencing.
                           </div>
                        </div>

                        <div className="btn-box">
                           <a href="contact.html" className="theme-btn btn-style-one bg-yellow">
                              <span className="btn-title">Become a Sponsor</span>
                           </a>
                        </div>
                     </div>
                  </div>

                  <div className="sponsors-column col-xl-8 col-lg-12 col-md-12 col-sm-12 wow fadeInRight" data-wow-delay="200ms">
                     <div className="inner-column">
                        <div className="blocks-outer-box">
                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/1.png" alt="Image" />
                                    <img src="images/clients/1.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/2.png" alt="Image" />
                                    <img src="images/clients/2.png" alt="Image" />
                                 </a>
                              </div>
                           </div>
                        </div>

                        <div className="blocks-outer-box">
                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/3.png" alt="Image" />
                                    <img src="images/clients/3.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/4.png" alt="Image" />
                                    <img src="images/clients/4.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/5.png" alt="Image" />
                                    <img src="images/clients/5.png" alt="Image" />
                                 </a>
                              </div>
                           </div>
                        </div>

                        <div className="blocks-outer-box">
                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/6.png" alt="Image" />
                                    <img src="images/clients/6.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/7.png" alt="Image" />
                                    <img src="images/clients/7.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/8.png" alt="Image" />
                                    <img src="images/clients/8.png" alt="Image" />
                                 </a>
                              </div>
                           </div>
                        </div>

                        <div className="blocks-outer-box show-md">
                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/1.png" alt="Image" />
                                    <img src="images/clients/1.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/2.png" alt="Image" />
                                    <img src="images/clients/2.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/3.png" alt="Image" />
                                    <img src="images/clients/3.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/4.png" alt="Image" />
                                    <img src="images/clients/4.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/5.png" alt="Image" />
                                    <img src="images/clients/5.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/6.png" alt="Image" />
                                    <img src="images/clients/6.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/7.png" alt="Image" />
                                    <img src="images/clients/7.png" alt="Image" />
                                 </a>
                              </div>
                           </div>

                           <div className="client-block">
                              <div className="inner-box">
                                 <a href="#" className="image">
                                    <img src="images/clients/8.png" alt="Image" />
                                    <img src="images/clients/8.png" alt="Image" />
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="testimonial-section">
            <div className="shape-nine bounce-y"></div>
            <div className="auto-container">
               <div className="sec-title text-center">
                  <span className="sub-title">Testimonials</span>
                  <h2 className="text-reveal-anim">
                     See What Our Valued <br /> Customers Say{" "}
                  </h2>
               </div>
               <div className="outer-box">
                  <div className="swiper testi-swiper">
                     <div className="swiper-wrapper">
                        <div className="testimonial-block swiper-slide">
                           <div className="inner-box">
                              <div className="testi-shape-one"></div>
                              <div className="testi-shape-two"></div>
                              <div className="shape-eight"></div>
                              <div className="shape-thirteen"></div>
                              <div className="content">
                                 <div className="author-box">
                                    <div className="info-box">
                                       <h3 className="name">Donna Nazir,</h3>
                                       <div className="designation">Broker/CEO,</div>
                                    </div>
                                    <i className="icon flaticon-right-quotation-mark"></i>
                                 </div>
                                 <div className="text">
                                    “Dynamic, Innovative, Inspiring! We made History! I am so proud to have been a part of this amazing, ground moving
                                    event.”
                                 </div>
                                 <div className="rating">
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                 </div>
                                 <div className="icon"></div>
                              </div>
                              <div className="image-box">
                                 <figure className="image">
                                    <img src="images/resource/testi1-1.png" alt="Image" />
                                 </figure>
                                 <div className="icon-five"></div>
                                 <div className="icon-twentyone"></div>
                              </div>
                           </div>
                        </div>

                        <div className="testimonial-block swiper-slide">
                           <div className="inner-box">
                              <div className="testi-shape-one"></div>
                              <div className="testi-shape-two"></div>
                              <div className="shape-eight"></div>
                              <div className="shape-thirteen"></div>
                              <div className="content">
                                 <div className="author-box">
                                    <div className="info-box">
                                       <h3 className="name">Donna Nazir,</h3>
                                       <div className="designation">Broker/CEO,</div>
                                    </div>
                                    <i className="icon flaticon-right-quotation-mark"></i>
                                 </div>
                                 <div className="text">
                                    “Dynamic, Innovative, Inspiring! We made History! I am so proud to have been a part of this amazing, ground moving
                                    event.”
                                 </div>
                                 <div className="rating">
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                 </div>
                                 <div className="icon"></div>
                              </div>
                              <div className="image-box">
                                 <figure className="image">
                                    <img src="images/resource/testi1-2.png" alt="Image" />
                                 </figure>
                                 <div className="icon-five"></div>
                                 <div className="icon-twentyone"></div>
                              </div>
                           </div>
                        </div>

                        <div className="testimonial-block swiper-slide">
                           <div className="inner-box">
                              <div className="testi-shape-one"></div>
                              <div className="testi-shape-two"></div>
                              <div className="shape-eight"></div>
                              <div className="shape-thirteen"></div>
                              <div className="content">
                                 <div className="author-box">
                                    <div className="info-box">
                                       <h3 className="name">Donna Nazir,</h3>
                                       <div className="designation">Broker/CEO,</div>
                                    </div>
                                    <i className="icon flaticon-right-quotation-mark"></i>
                                 </div>
                                 <div className="text">
                                    “Dynamic, Innovative, Inspiring! We made History! I am so proud to have been a part of this amazing, ground moving
                                    event.”
                                 </div>
                                 <div className="rating">
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                 </div>
                                 <div className="icon"></div>
                              </div>
                              <div className="image-box">
                                 <figure className="image">
                                    <img src="images/resource/testi1-1.png" alt="Image" />
                                 </figure>
                                 <div className="icon-five"></div>
                                 <div className="icon-twentyone"></div>
                              </div>
                           </div>
                        </div>

                        <div className="testimonial-block swiper-slide">
                           <div className="inner-box">
                              <div className="testi-shape-one"></div>
                              <div className="testi-shape-two"></div>
                              <div className="shape-eight"></div>
                              <div className="shape-thirteen"></div>
                              <div className="content">
                                 <div className="author-box">
                                    <div className="info-box">
                                       <h3 className="name">Donna Nazir,</h3>
                                       <div className="designation">Broker/CEO,</div>
                                    </div>
                                    <i className="icon flaticon-right-quotation-mark"></i>
                                 </div>
                                 <div className="text">
                                    “Dynamic, Innovative, Inspiring! We made History! I am so proud to have been a part of this amazing, ground moving
                                    event.”
                                 </div>
                                 <div className="rating">
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                    <i className="flaticon-star"></i>
                                 </div>
                                 <div className="icon"></div>
                              </div>
                              <div className="image-box">
                                 <figure className="image">
                                    <img src="images/resource/testi1-2.png" alt="Image" />
                                 </figure>
                                 <div className="icon-five"></div>
                                 <div className="icon-twentyone"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="nav-box">
                     <div className="swiper-button-prev">
                        <span className="icon fa fa-arrow-left "></span>
                     </div>
                     <div className="swiper-button-next">
                        <span className="icon fa fa-arrow-right "></span>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="news-section">
            <div className="shape-six"></div>
            <div className="shape-seven"></div>
            <div className="auto-container">
               <div className="sec-title text-center">
                  <span className="sub-title">Who helps us to create</span>
                  <h2 className="text-reveal-anim">
                     Latest Breaking News For <br /> Events & Conference
                  </h2>
               </div>
               <div className="row">
                  <div className="news-block has-active col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                     <div className="inner-box">
                        <div className="content-box">
                           <div className="date-box">
                              <h3 className="date">25</h3>
                              <div className="month">Dec</div>
                           </div>
                           <div className="cat">Technology</div>
                           <ul className="post-meta">
                              <li>
                                 <i className="icon fa fa-user"></i> Admin
                              </li>
                              <li>
                                 <i className="icon fa fa-comment"></i> Comments
                              </li>
                           </ul>
                           <h3 className="title">
                              <a href="blog-single.html">Most people will come to watch the conference</a>
                           </h3>
                           <div className="text">Perfect Blvd, Los The Stories Digital Hall 2020 More 5214 Hollywood Event?</div>
                           <div className="btn-box">
                              <a href="blog-single.html" className="read-more">
                                 <i className="fa fa-arrow-right"></i>
                              </a>
                           </div>
                        </div>
                        <div className="image-box">
                           <figure className="image">
                              <a href="blog-single.html">
                                 <img src="images/resource/news1-1.jpg" alt="Image" />
                                 <img src="images/resource/news1-1.jpg" alt="Image" />
                              </a>
                           </figure>
                        </div>
                     </div>
                  </div>

                  <div className="news-block has-active col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="200ms">
                     <div className="inner-box active">
                        <div className="content-box">
                           <div className="date-box">
                              <h3 className="date">25</h3>
                              <div className="month">Dec</div>
                           </div>
                           <div className="cat">Conference</div>
                           <ul className="post-meta">
                              <li>
                                 <i className="icon fa fa-user"></i> Admin
                              </li>
                              <li>
                                 <i className="icon fa fa-comment"></i> Comments
                              </li>
                           </ul>
                           <h3 className="title">
                              <a href="blog-single.html">Fueling innovation at Creative conference 2024</a>
                           </h3>
                           <div className="text">Perfect Blvd, Los The Stories Digital Hall 2020 More 5214 Hollywood Event?</div>
                           <div className="btn-box">
                              <a href="blog-single.html" className="read-more">
                                 <i className="fa fa-arrow-right"></i>
                              </a>
                           </div>
                        </div>
                        <div className="image-box">
                           <figure className="image">
                              <a href="blog-single.html">
                                 <img src="images/resource/news1-2.jpg" alt="Image" />
                                 <img src="images/resource/news1-2.jpg" alt="Image" />
                              </a>
                           </figure>
                        </div>
                     </div>
                  </div>

                  <div className="news-block has-active col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="400ms">
                     <div className="inner-box">
                        <div className="content-box">
                           <div className="date-box">
                              <h3 className="date">25</h3>
                              <div className="month">Dec</div>
                           </div>
                           <div className="cat">Events</div>
                           <ul className="post-meta">
                              <li>
                                 <i className="icon fa fa-user"></i> Admin
                              </li>
                              <li>
                                 <i className="icon fa fa-comment"></i> Comments
                              </li>
                           </ul>
                           <h3 className="title">
                              <a href="blog-single.html">Design thinking at creative events and forums</a>
                           </h3>
                           <div className="text">Perfect Blvd, Los The Stories Digital Hall 2020 More 5214 Hollywood Event?</div>
                           <div className="btn-box">
                              <a href="blog-single.html" className="read-more">
                                 <i className="fa fa-arrow-right"></i>
                              </a>
                           </div>
                        </div>
                        <div className="image-box">
                           <figure className="image">
                              <a href="blog-single.html">
                                 <img src="images/resource/news1-3.jpg" alt="Image" />
                                 <img src="images/resource/news1-3.jpg" alt="Image" />
                              </a>
                           </figure>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="subscribe-section">
            <div className="auto-container">
               <div className="outer-box">
                  <div className="content-box">
                     <div className="shape-ten"></div>
                     <div className="row">
                        <div className="content-column col-xl-5 col-lg-12 col-md-12 col-sm-12 wow fadeInLeft">
                           <div className="inner-column">
                              <div className="sub-title">Get The Latest Updates</div>
                              <h3 className="title">Signup For Newsletter</h3>
                           </div>
                        </div>

                        <div className="form-column col-xl-7 col-lg-12 col-md-12 col-sm-12 wow fadeInRight" data-wow-delay="200ms">
                           <div className="inner-column">
                              <div className="subscribe-form">
                                 <form method="post" action="get">
                                    <div className="form-group">
                                       <input type="email" name="Email" placeholder="Enter Your Email Address." required />
                                       <button type="submit" className="theme-btn btn-style-one bg-yellow">
                                          <span className="btn-title">Subscribe</span>
                                       </button>
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <footer className="main-footer footer-style-one">
            <div className="bg bg-image" style={{ backgroundImage: `url(images/background/3.jpg)` }}></div>
            <div className="shape-eleven bounce-y"></div>
            <div className="shape-twelve bounce-y"></div>

            <div className="widgets-section">
               <div className="auto-container">
                  <div className="row">
                     <div className="footer-column col-xl-3 col-lg-6 col-md-6 col-sm-6">
                        <div className="footer-widget about-widget">
                           <div className="widget-content">
                              <div className="logo">
                                 <a href="#">
                                    {" "}
                                    <img src="images/logo.svg" alt="Logo" />
                                 </a>
                              </div>
                              <div className="text">
                                 Event is a great opportunity to engage with experts in the field, share ideas, and network with peers. Please by to
                                 confirm your attendance.
                              </div>
                              <ul className="social-icon-one">
                                 <li>
                                    <a href="#">
                                       <i className="fab fa-twitter"></i>
                                    </a>
                                 </li>
                                 <li>
                                    <a href="#">
                                       <i className="fab fa-instagram"></i>
                                    </a>
                                 </li>
                                 <li>
                                    <a href="#">
                                       <i className="fab fa-pinterest-p"></i>
                                    </a>
                                 </li>
                                 <li>
                                    <a href="#">
                                       <i className="fab fa-facebook-f"></i>
                                    </a>
                                 </li>
                              </ul>
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

                     <div className="footer-column col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="footer-widget gallery-widget">
                           <h3 className="widget-title">Gallery</h3>
                           <div className="widget-content">
                              <div className="swiper gallery-swiper">
                                 <div className="insta-gallery swiper-wrapper">
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-1.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-1.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-2.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-2.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-3.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-3.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-4.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-4.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-5.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-5.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-6.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-6.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-1.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-1.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-2.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-2.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-3.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-3.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-4.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-4.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-5.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-5.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                    <figure className="image swiper-slide">
                                       <a href="images/resource/gallery-thumb-6.jpg" data-rel="lightcase">
                                          <img src="images/resource/gallery-thumb-6.jpg" alt="Image" />
                                       </a>
                                    </figure>
                                 </div>
                              </div>
                              <div className="nav-box">
                                 <div className="swiper-button-prev">
                                    <span className="icon fa fa-arrow-left "></span>
                                 </div>
                                 <div className="swiper-button-next">
                                    <span className="icon fa fa-arrow-right "></span>
                                 </div>
                              </div>
                           </div>

                           <div className="contact-widget">
                              <h3 className="widget-title">Information</h3>
                              <div className="widget-content">
                                 <div className="contact-list-box">
                                    <ul className="contact-list-two light">
                                       <li>
                                          <i className="fa fa-map-marker-alt"></i> 30 Bridge, Brooklyn street, <br /> United State of America.
                                       </li>
                                    </ul>
                                    <ul className="contact-list-two two light">
                                       <li>
                                          <i className="fa fa-envelope"></i> <a href="mailto:confer@hotmail.com">confer@hotmail.com</a>
                                       </li>
                                       <li>
                                          <i className="fa fa-phone"></i> <a href="tel:+250327101235">+25 032 7101235</a>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="footer-bottom">
               <div className="auto-container">
                  <div className="inner-container">
                     <div className="copyright-text">
                        © Copyright 2025 All Rights Reserved by{" "}
                        <a href="https://themeforest.net/user/expert-themes" target="_blank">
                           Expert Theme
                        </a>
                        .
                     </div>
                  </div>
               </div>
            </div>
         </footer>

         <div className="page-social-icon-box">
            <ul className="social-icon-three">
               <li>
                  <a href="#">
                     <i className="fab fa-twitter"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="fab fa-instagram"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="fab fa-pinterest-p"></i>
                  </a>
               </li>
               <li>
                  <a href="#">
                     <i className="fab fa-facebook-f"></i>
                  </a>
               </li>
            </ul>
         </div>

         <div className="progress-wrap">
            <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
               <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
            </svg>
         </div>
      </React.Suspense>
   );
}

export default App;
