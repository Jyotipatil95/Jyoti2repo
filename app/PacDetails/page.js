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
import Offerlist from "../Component/Offerlist";
import FilterPanel from "../Component/FilterPanel";
import OrderPopup from "../Component/OrderPopup";
// import LoginPopup from "./Component/Login/LoginPopup";
import Footer from "../Component/Footer";
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
              
              <div className='d-flex align-items-center justify-content-center col-3'>
                  <SocialIcons />
              </div>
              
              <div className="border-start border-2 border-dark  mx-0 bg-dark" style={{ height: "40px" }}></div>
              <div className='d-flex align-items-center'>
                   {/* <LoginPopup /> */}
                  <UserHeader />
            
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
        <Offerlist />
      </section>
      <section>
        <Footer />
      </section>
        
      
      </div>
    </main>
  );
}
