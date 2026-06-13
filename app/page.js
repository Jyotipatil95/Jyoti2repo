'use client';
import { useEffect } from 'react';

import Navbar from "./Component/Navbar";
import Navbar2 from "./Component/Navbar2";
import Carousel from "./Component/Carousel";
import ContactHeader from "./Component/ContactHeader";
import SocialIcons from "./Component/SocialIcons";
import UserHeader from "./Component/UserHeader";
import SearchNav from "./Component/SearchNav";
import PackagesButton from "./Component/PackagesButton";
import ExcursionsButton from "./Component/ExcursionsButton";
import CarRentalsButton from "./Component/CarRentalsButton";
import TransferButton from "./Component/TransferButton";
import EventsButton from "./Component/EventsButton";
import HotelTransportationButton from "./Component/HotelTransportationButton";
import CruisesButton from "./Component/CruisesButton";

import LoginPopup from "./Component/Login/LoginPopup";
import "./awsConfig"; // ensure Amplify is configured

import TabsPage from './Component/tabs/TabsPage';
import Testimonials from './Component/Testimonials';
import Footer from './Component/Footer';
export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <main className='bg-dark mb-4' >
      <div className='container bg-light rounded-5 '>
      {/* <nav className="navbar navbar-dark bg-dark p-3">
        <a className="navbar-brand" href="#">EduSite</a>
      </nav> */}

      <section className=" text-dark text-center ">
         {/* header section */}
        <div className='row'> 
          <div className='col-4' >
            <img
            src="/images/Mlogo.png"
            className="d-block w-100"
            alt="Slide 2"
            style={{ height: "200px",width:"40%",borderRadius: "20px",objectFit: "cover" }}
            />
          
          </div>
          <div className='flex-1 col-8 '>
            <div className='d-flex align-items-center justify-content-end' >
              <div className='d-flex align-items-center me-4 col-3' >
                <ContactHeader />
              </div>
              <div className="border-start border-2 border-dark mx-0 bg-dark" style={{ height: "40px"  }}></div>
              
              <div className='d-flex align-items-center justify-content-center col-2'>
                
                  <SocialIcons />
              </div>
              
              <div className="border-start border-2 border-dark  mx-0 bg-dark" style={{ height: "40px" }}></div>
              <div className='d-flex align-items-center justify-content-center col-3'>
                  <LoginPopup />
                  {/* <UserHeader />  */}
                {/* User icon */}
             <i className="bi bi-person-circle fs-3  text-primary rounded-circle p-1"></i>
                
               </div>
            </div>
             <br></br>
              <div className='row '>
                <div  className="col-3">
                   
                  </div>
                  <div  className="col-9">
                    <SearchNav />
                  </div>
                  
                  </div>
              </div>
        </div>
        
      </section>

      <section className="container my-2">
         {/* tab section */}
        <div className="row bg-info" style={{borderRadius: "20px"}}>
                  <div>
                    
                    {/* <div>
                      <PackageForm />
                    </div> */}
                    
                      <TabsPage />
                     
                  </div>
            
          
        </div>
      </section>
      <section>
          {/* Carousel section */}
          <div>
                 <Carousel/>
          </div>
      </section>

       {/* Image section */}
     
      <section className="container my-4">
        
        <div className="row g-4">
            {/* <!-- Left Column --> */}
          <div className="col-md-6 col-12 d-flex flex-column gap-4">
      
           {/* <!-- Package Offers --> */}
              
           <div className="position-relative bg-warning text-white rounded-5 p-4" style={{height: "700px", width:"600px"}}>
              <div >
                <h2 className=" top-0 start-0 px-4 py-2 fw-bold text-uppercase display-4 z-2">
                  PACKAGE OFFERS
              </h2>
              </div>
              <div className="position-absolute bg-primary rounded-circle p-4 text-center offer-badge">
                  <span className="fw-bold fs-1">30% <br /> OFF</span>
              </div>
                  {/* <img src="/images/pic4.png" alt="Map" className="position-absolute bottom-0 end-0 img-fluid" style={{ width: "350px", zIndex: 1 }} /> */}
                 <div className="d-flex ">
                        <img
                          src="/images/family222.png"
                          alt="Family traveling"
                          className="img-fluid "
                          style={{ height: "550px", width: "50%", objectFit: "cover" }}
                        />
                        <img
                          src="/images/bridge2.png"
                          alt="Family traveling"
                          className="img-fluid "
                          style={{ height: "550px", width: "50%", objectFit: "cover" }}
                        />
                  </div>

                   
           </div>

            {/* <!-- Excursions --> */}
            <div className="position-relative ">
                  <span className="position-absolute top-0 start-0 text-uppercase fw-bold text-white display-4 px-3 py-2">
                      excursions
                  </span>
                 <img src="/images/photo4.jpeg" alt="Excursions" className="img-fluid rounded-5"
                  style={{ height: "300px", width: "80%", objectFit: "cover", display: "block" }}/>
             </div>

            {/* <!-- Adventure --> */}
            <div className="position-relative d-none d-md-block">
                  <span className="fw-bold d-block"
                    style={{
                      color: "var(--bs-orange)", // Bootstrap orange
                      fontSize: "6rem",          // larger font size
                    }}>Adventure</span>
                  <span className="text-uppercase fw-bold text-warning px-4">Which adventure do you prefer?</span>
                  <br></br>
                  <img src="/images/icons aventuras.png" alt="Adventure Icon" className="img-fluid" style={{height:"150px",weight:"200px"}}/>
            </div>
          </div>

            {/* <!-- Right Column --> */}
           <div className="col-md-6 col-12 d-flex flex-column justify-content-center" style={{ gap: "0" }}>
          <div className="p-0 m-0 "style={{ lineHeight: 0 }}>
            <img
            src="/images/caribe22.png"
            className="d-block w-100 img-fluid rounded-5 mx-auto p-1 m-0"
            style={{ height: "400px", width: "50%", objectFit: "cover", display: "block" }}
            alt="Caribe"
            
          />
           </div>
          <div>
            <img
         
            src="/images/europa2.png"
            className="d-block w-100 img-fluid rounded-5 p-1 m-0"
            style={{ height: "400px", width: "50%", objectFit: "cover" }}
            alt="Europa"
          />
          </div>
          <div>
            <img
         
            src="/images/asia2.png"
            className="d-block w-100 img-fluid rounded-5 p-1 m-0"
            style={{ height: "400px", width: "50%", objectFit: "cover" }}
            alt="Europa"
          /></div>
         <div>
           <img
            src="/images/africa2.png"
            className="d-block w-100 img-fluid rounded-5 p-1 m-0"
            style={{ height: "400px", width: "50%", objectFit: "cover" }}
            alt="Africa"
          />
         </div>
        </div>
  </div>

        {/* image section */}
         {/* <div className="row mt-4 ms-4 ">
         <div  className="bg-light p-3">
           
            <div className='row'>
            <div className='col-4'>
              <img
            src="/images/pic4.jpg"
            className="d-block w-100"
            alt="Slide 2"
            style={{ height: "400px",width:"40%",borderRadius: "20px", objectFit: "cover" }}
            /></div>
             <div className='col-4'>
              <img
            src="/images/pic7.jpg"
            className="d-block w-100"
            alt="Slide 2"
            style={{ height: "400px",width:"40%",borderRadius: "20px",objectFit: "cover" }}
            /></div>
            <div className='col-4'>
              <img
            src="/images/pic6.jpg"
            className="d-block w-100"
            alt="Slide 2"
            style={{ height: "400px",width:"40%",borderRadius: "20px", objectFit: "cover" }}
            /></div>
            <img
            src="/images/pic6.jpg"
            className="d-block w-100"
            alt="Slide 2"
            style={{ height: "400px",width:"40%",borderRadius: "20px", objectFit: "cover" }}
            />
            </div>
           </div> 
        </div> */}
      {/* <section className=" w-full">
            <img
              src="/images/pic2.jpg"
              alt="Disney banner"
              className="img-fluid mx-auto d-block rounded"
              style={{ maxHeight: "100px", objectFit: "cover" }}
            />
      </section> */}
      
       
      </section>
      {/* script section */}
              <section className="text-center p-4">
          <h2 className="fw-bold mb-3" style={{color: "rgb(255, 101, 0)"}}>Who we are</h2>
          <p className="fs-5 text-center text-primary">
           “Lorem ipsum dolor sit amet, consectetur adipisicing elit. She herself, out of. Exceptions follow from perspiration, together with holding, the harshness of things, fugitives, or this matter, the least, repelling ours, not! The spirit comes from below, exceptions endure, delight is similar, the same softness of labor, the place prevents the level, the porch illuminates, life wants anyone, is expedient, to a coming, or worthy, unless just the whole? The shoulder is less toward, the pain excepts, the rougher things are, than labor, indeed expedient, the support, those very words, the harshness corrupts, even comes? Nothing flees, the accusation repels, the fullness repels, but which things, which consequences, the roughness provides, the solution, the pleasure assumes, the labor is named, the value is sought, because it hates, the veil, indeed comes. The body follows.”
          </p>
        </section>
         {/* Testimonials section */}
        <section>
           <Testimonials />
        </section>
      <footer className="bg-light text-white text-center">
       <Footer />
      </footer>
      
      </div>
    </main>
  );
}
