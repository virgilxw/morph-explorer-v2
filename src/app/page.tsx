"use client";

import React from 'react';
import Map from '../components/map.jsx';
import Navbar from '../components/navbar.jsx';
import { useState, useEffect } from "react";
import selectedCityContext from '../contexts/selectedCityContext.jsx';
import selectedLayerContext from '../contexts/selectedLayerContext.jsx';
import selectedDendogramContext from '../contexts/selectedDendogramContext.jsx';
import legendContext from '../contexts/legendContext.jsx';
import TooSmall from '../components/tooSmall.jsx';
import LeftSidebar from '../components/LeftSidebar.jsx';
import RightSidebar from '../components/RightSidebar.jsx';
import "./globals.css";

const Page = () => {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedDendogram, setSelectedDendogram] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Glasgow");
  const [legend, setLegend] = useState(null);
  const [isViewportSmall, setIsViewportSmall] = useState(false);
  const [dataset, setDataset] = useState({});

  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsViewportSmall(window.innerWidth < 400 || window.innerHeight < 350); // Adjust the threshold as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial viewport size
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isViewportSmall) {
    return <TooSmall />;
  }

  return (
    <selectedCityContext.Provider value={{ selectedCity, setSelectedCity, dataset, setDataset }}>
      <selectedLayerContext.Provider value={{ selectedLayer, setSelectedLayer }}>
        <selectedDendogramContext.Provider value={{ selectedDendogram, setSelectedDendogram }}>
          <legendContext.Provider value={{ legend, setLegend }}>
            <main className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex flex-1">
                <LeftSidebar
                  isVisible={isLeftSidebarVisible}
                  toggleVisibility={() => setIsLeftSidebarVisible(!isLeftSidebarVisible)}
                />
                <div className="flex-1">
                  <Map />
                </div>
                <RightSidebar
                  isVisible={isRightSidebarVisible}
                  toggleVisibility={() => setIsRightSidebarVisible(!isRightSidebarVisible)}
                />
              </div>
            </main>
          </legendContext.Provider>
        </selectedDendogramContext.Provider>
      </selectedLayerContext.Provider>
    </selectedCityContext.Provider>
  );
};

export default Page;
