'use client';
import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TabsComponent = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef();
  const tabListRef = useRef(null);

  const scrollLeft = () => {
    tabListRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    tabListRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center bg-info">
      <div className="shadow-sm w-100" style={{ maxWidth: '100%' }}>
        <div className="d-flex align-items-center">
          {/* Left arrow */}
          <button
            className="btn btn-light bg-info border-0 text-white p-2 ms-2"
            type="button"
            onClick={scrollLeft}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* Tabs row */}
            <div
              className="d-flex flex-nowrap nav nav-pills custom-scroll"
              ref={tabListRef}
              style={{ maxWidth: "1200px" }}
            >
            {items.map((item, index) => (
              <button
                ref={index === 0 ? firstBtnRef : null}
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`nav-link text-black ${
                  selectedTab === index ? "active bg-info text-primary" : ""
                }`}
              
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  width="30"
                  height="30"
                  className="mb-1"
                />
                {item.title}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            className="btn btn-light bg-info border-0 text-white p-2 ms-2"
            type="button"
            onClick={scrollRight}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        {/* Tab content */}
        <div className="rounded-bottom mt-2">
          {items.map((item, index) => (
            <div key={index} className={selectedTab === index ? "" : "d-none"}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;