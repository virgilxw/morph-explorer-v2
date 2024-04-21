"use client";

import React from 'react';
import Map from '../components/map.jsx';
import Navbar from '../components/navbar.jsx';
import { useState, useEffect } from "react";
import selectedCityContext from '../contexts/selectedCityContext.jsx'
import selectedLayerContext from '../contexts/selectedLayerContext.jsx'
import selectedDendogramContext from '../contexts/selectedDendogramContext.jsx'
import legendContext from '../contexts/legendContext.jsx'
import TooSmall from '../components/tooSmall.jsx';



const Page = () => {

  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedDendogram, setSelectedDendogram] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Glasgow");
  const [legend, setLegend] = useState(null);


  const [isViewportSmall, setIsViewportSmall] = useState(false);

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
    <selectedCityContext.Provider value={{ selectedCity, setSelectedCity }}>
      <selectedLayerContext.Provider value={{ selectedLayer, setSelectedLayer }}>
        <selectedDendogramContext.Provider value={{ selectedDendogram, setSelectedDendogram }}>
          <legendContext.Provider value={{ legend, setLegend }}>
            <main className="flex flex-col min-h-screen">
              <Navbar />
              <Map />
            </main>
          </legendContext.Provider>
        </selectedDendogramContext.Provider>
      </selectedLayerContext.Provider>
    </selectedCityContext.Provider>
  );
};

export default Page;