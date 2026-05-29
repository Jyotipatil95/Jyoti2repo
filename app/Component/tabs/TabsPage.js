import TabsComponent from './TabsComponent';
import PackageForm from "./PackageForm";
import React from 'react';
import ExcursionsForm from './ExcursionsForm';
import HotelsStaysForm from './ExcursionsForm';
import CarRentalForm from './CarRentalForm';
import TransferForm from './TransferForm';
import EventForm from './EventForm';
import HotelTransportationForm from './HotelTransportationForm';
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
     icon: '/images/package.png',
     title: <h5 className="text-white fs-6">Packages</h5>,
     content: (
      <PackageForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Excursions</h5>,
     icon: '/images/excursion.png',
    content: (
      <ExcursionsForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Car Rentals</h5>,
     icon: '/images/car.png',
    content: (
      <CarRentalForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Hotel+Transportation</h5>,
     icon: '/images/Hotel.png',
    content: (
      <HotelTransportationForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">TransferForm</h5>,
     icon: '/images/tansfer.png',
    content: (
      < TransferForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Special Events</h5>,
     icon: '/images/event.png',
    content: (
      < EventForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Transportation</h5>,
     icon: '/images/tranportation.png',
    content: (
      <HotelTransportationForm />
    ),
  },
  {
    title: <h5 className="text-white fs-6">Cruises</h5>,
     icon: '/images/cruise.png',
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
    title: <h5 className="text-white fs-6">Promotional Packages</h5>,
     icon: '/images/package.png',
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
  
 
];