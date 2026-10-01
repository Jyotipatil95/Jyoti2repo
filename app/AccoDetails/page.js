'use client';
import { useEffect } from 'react';

import Navbar from "../Component/Navbar";
import Navbar2 from "../Component/Navbar2";
import Carousel from "../Component/Carousel";
import ContactHeader from "../Component/ContactHeader";
import SocialIcons from "../Component/SocialIcons";
import UserHeader from "../Component/UserHeader";
import SearchNav from "../Component/SearchNav";
import TabsPage from '../Component/tabs/TabsPage';
import AccoOffer from "../Component/AccoOffer";
import FilterPanel from "../Component/FilterPanel";
import OrderPopup from "../Component/OrderPopup";
import Footer from "../Component/Footer";
import LoginPopup from "../Component/Login/LoginPopup";
import "../awsConfig"; // ensure Amplify is configured
export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <main className='bg-dark mb-4' >
      <div className='container bg-light rounded-5'>
      {/* <nav className="navbar navbar-dark bg-dark p-3">
        <a className="navbar-brand" href="#">EduSite</a>
      </nav> */}
 {/* Header Section */}
       <section className="text-dark text-center mb-0 mt-0">
                <div className="row align-items-center p-0 m-0">
                  <div className="col-md-4 col-12 text-center mb-0 mb-md-0 ">
                     <img
                      src="/images/Mlogo.png"
                      alt="Logo"
                      className="img-fluid rounded-3 d-block mx-auto w-75 w-md-75 logo-img"
                    />
                  </div>
                  <div className="col-md-8 col-12">
                    <div className="d-flex flex-wrap justify-content-end align-items-center gap-lg-2 gap-0">
                      <ContactHeader />
                       <div className="border-start border-2 border-warning  mx-0 " style={{ height: "30px" }}></div>
                      <SocialIcons />
                      <div className="border-start border-2 border-warning mx-0 " style={{ height: "30px" }}></div>
                      <LoginPopup />
                    </div>
                    <div className="mt-1">
                      <SearchNav />
                    </div>
                  </div>
                </div>
              </section>

      <section className="container my-0 m-0">
         {/* tab section */}
        <div className="row bg-info" style={{borderRadius: "20px"}}>
                  <div>
                   
                      <TabsPage />
                     
                  </div>
            
          
        </div>
        
      </section>
      {/* filter section */}
      
        {/* Offer list */}
      <section>
        {/* <FilterPanel /> */}
         <AccoOffer/> 
      </section>
      <section>
        <Footer />
      </section>
        
      
      </div>
    </main>
  );
}
