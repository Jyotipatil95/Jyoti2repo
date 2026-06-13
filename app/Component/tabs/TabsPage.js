import TabsComponent from './TabsComponent';
import PackageForm from "./PackageForm";
import React from 'react';
import ExcursionsForm from './ExcursionsForm';
import HotelsStaysForm from './ExcursionsForm';
import CarRentalForm from './CarRentalForm';
import TransferForm from './TransferForm';
import EventForm from './EventForm';
import HotelTransportationForm from './HotelTransportationForm';
import AccommodationForm from './AccommodationForm';
const TabsPage = () => {
  return (
    <div className='background:darkmagenta rounded-3 mx-3 p-3'>
    

      {/* Tabs Component */}
      <TabsComponent items={items} />
    </div>
  );
};

export default TabsPage;

const items = [
  {
    title: <h5 className="text-white fs-6">Hotels</h5>,
     icon: '/images/IconHotel.png',
    content: (
      <HotelTransportationForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Flight</h5>,
     icon: '/images/FlightIcon.png',
    content: (
      <HotelTransportationForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Transfers</h5>,
     icon: '/images/TransferIcon.png',
    content: (
      < TransferForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Excursions</h5>,
     icon: '/images/excursionIcon.png',
    content: (
      <ExcursionsForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Cruises</h5>,
     icon: '/images/cruise1.png',
    content: (
      <div className='border-2 border-blue-400 rounded-lg p-4'>
        <h1 className='text-3xl text-blue-600'>Title Test 4</h1>
        <p>
          Lorem ipsum dolor sit ue architecto dolorum, minima enim quidem
          voluptatibus at nulla deleniti harum! Totam, mollitia quos voluptatem
          deleniti provident obcaecati rerum.
        </p>
      </div>
    ),
  },
  { 
     icon: '/images/packIcon.png',
     title: <h5 className="text-white fs-6">Packages</h5>,
     content: (
      <PackageForm />
    ),
  },
  {
    title: <h6 className="text-white fs-6">CarRentals</h6>,
     icon: '/images/CarIcon3.png',
    content: (
      <CarRentalForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Events</h5>,
     icon: '/images/IconEvent.png',
    content: (
      < EventForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Transportation</h5>,
     icon: '/images/transportationIcon.png',
    content: (
      <HotelTransportationForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Accommodation</h5>,
     icon: '/images/Accommicon.png',
    content: (
      <AccommodationForm />
    ),
  },
  
];