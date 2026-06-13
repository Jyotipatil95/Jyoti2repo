'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
//import { faBed as faBedReg } from '@fortawesome/free-regular-svg-icons';

export default function GuestRoomSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState([
    { id: 1, adults: 2, children: 0 },
    { id: 2, adults: 2, children: 0 },
  ]);
  
  const containerRef = useRef(null);

  // Close dropdown when clicking outside (Replaces the jQuery global click handler)
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Summary Text Handlers
  const totalRooms = rooms.length;
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);

  // Room Management Actions
  const addRoom = () => {
    const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    setRooms([...rooms, { id: newId, adults: 1, children: 0 }]);
  };

  const deleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const updateCount = (roomId, type, operation) => {
    setRooms(
      rooms.map((room) => {
        if (room.id === roomId) {
          const currentCount = room[type];
          let newCount = operation === 'plus' ? currentCount + 1 : currentCount - 1;
          
          // Mimic validations (e.g., minimum 1 adult, minimum 0 children)
          if (type === 'adults' && newCount < 1) newCount = 1;
          if (type === 'children' && newCount < 0) newCount = 0;

          return { ...room, [type]: newCount };
        }
        return room;
      })
    );
  };

  return (
    <div className="col-12 col-sm-6 col-lg-12 pb-0" ref={containerRef}>
      <div className="position-relative">
        <label className="form-label text-white fw-bold text-uppercase small">
          Select guests:
        </label>
        
        {/* Dropdown Toggle Button */}
        <button
          type="button"
          
          className={`form-control  rounded-pill d-flex align-items-center justify-content-between  text-start border ${
            isOpen ? 'border-primary shadow-sm' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          style={{ height: '40px', paddingRight: '12px' }}
        >
          
          <span className="text-truncate">
            <span className="fw-semibold">{totalRooms} Room{totalRooms > 1 ? 's' : ''}, </span>
            <span className="text-muted">{totalAdults} adult{totalAdults > 1 ? 's' : ''}</span>
          </span>
           
          <FontAwesomeIcon icon={faBed} className="text-secondary" />
        </button>

        {/* Dropdown Menu Custom UI */}
        {isOpen && (
          <div 
            className="position-absolute border rounded shadow bg-white mt-1 end-0 p-0 overflow-hidden"
            style={{ zIndex: 1050, width: '100%', minWidth: '320px' }}
          >
            {/* Scrollable Room List Container */}
            <div className="overflow-auto p-3" style={{ maxHeight: '350px' }}>
              {rooms.map((room, index) => (
                <div 
                  key={room.id} 
                  className={`${index > 0 ? 'border-top pt-3 mt-3' : ''}`}
                >
                  {/* Room Header */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <FontAwesomeIcon icon={faBed} className="fs-5 text-dark" />
                      <strong className="text-dark">Room {index + 1}</strong>
                    </div>
                    {rooms.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-link p-0 text-danger text-decoration-underline small btn-sm"
                        onClick={() => deleteRoom(room.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Adults Selector Row */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                      <span className="d-block fw-semibold text-capitalize text-secondary">adults</span>
                      <p className="text-muted small m-0">18+ years</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn btn-light border-0 rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => updateCount(room.id, 'adults', 'minus')}
                        disabled={room.adults <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} size="sm" />
                      </button>
                      <b className="text-center d-inline-block" style={{ width: '24px' }}>{room.adults}</b>
                      <button
                        type="button"
                        className="btn btn-light border-0 rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => updateCount(room.id, 'adults', 'plus')}
                      >
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </button>
                    </div>
                  </div>

                  {/* Children Selector Row */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="d-block fw-semibold text-capitalize text-secondary">children</span>
                      <p className="text-muted small m-0">0 - 17 years</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn btn-light border-0 rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => updateCount(room.id, 'children', 'minus')}
                        disabled={room.children <= 0}
                      >
                        <FontAwesomeIcon icon={faMinus} size="sm" />
                      </button>
                      <b className="text-center d-inline-block" style={{ width: '24px' }}>{room.children}</b>
                      <button
                        type="button"
                        className="btn btn-light border-0 rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => updateCount(room.id, 'children', 'plus')}
                      >
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Menu Action Bar */}
            <div className="p-3 bg-light border-top shadow-sm">
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary fw-bold border-0 btn-sm"
                  onClick={addRoom}
                >
                  + Add room
                </button>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={() => setIsOpen(false)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}