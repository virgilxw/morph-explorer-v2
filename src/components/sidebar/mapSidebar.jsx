import React, { useState, useEffect, useContext } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LayerList from "./layerList";
import Button from "@mui/material/Button";
import LegendBox from "./legendBox.jsx";
import directory from "../../data/directory.json";
import Dialog from '@mui/material/Dialog';
import selectedCityContext from "../../contexts/selectedCityContext.jsx";

const Sidebar = ({ mapHeight }) => {
  const [toggleButton, setToggleButton] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState((mapHeight * 4) / 5);
  const [disabled, setDisabled] = useState(false);
  const { selectedCity, setSelectedCity } = useContext(selectedCityContext);

  const handleClick = () => {
    // Toggle the disabled state
    setDisabled(!disabled);
  };

  useEffect(() => {
    // Calculate sidebar height based on window height
    const maxSidebarHeight = mapHeight - 100; // Adjust 100 according to your header height
    setSidebarHeight(
      maxSidebarHeight > 600 ? (mapHeight * 4) / 5 : maxSidebarHeight
    );
  }, [mapHeight]);

  const handleOpenCloseClick = () => {
    setToggleButton(!toggleButton);
  };

  const handleWindowButtonClick = () => {
    if (typeof window !== 'undefined') {
      window.open(`./summaries/${selectedCity}_results.html`, '_blank');
    }
  };

  return (
    <>
      {toggleButton ? (
        <div
          className={`absolute bottom-0 left-0 w-10 h-10 rounded-md mx-5 my-5 bg-slate-700 flex items-center justify-center cursor-pointer`}
          onClick={handleOpenCloseClick}
        >
          <ListAltIcon className="text-white text-xl" />
        </div>
      ) : null}
      {!toggleButton && (
        <div
          className={`absolute bottom-0 left-0 w-60 rounded-md mx-5 my-5  bg-slate-400 flex flex-col`}
          style={{ height: sidebarHeight }}
        >
          <button onClick={handleOpenCloseClick}>
            <KeyboardArrowDownIcon className="text-bg-slate-700 text-l w-full" />
          </button>
          <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                
              <Button variant="contained" onClick={handleWindowButtonClick}>
                  Summary Statistics
                </Button>
    
              </li>
              <li>
                <span className="flex-1 ms-3 whitespace-nowrap">Layers</span>
                <LayerList />
              </li>
              <li>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Legend: Cluster ID
                </span>
                <LegendBox
                  showDendogram={disabled}
                  setShowDendogram={setDisabled}
                />
              </li>
              <li>
                <Button variant="contained" onClick={() => handleClick()}>
                  {disabled ? "Hide Dendogram" : "Show Dendogram"}
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
