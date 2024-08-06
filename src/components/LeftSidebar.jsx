import React from "react";
import { useContext } from "react";
import ModelSelectModule from "../components/leftSideBar/modelSelectModule.jsx"
import LayerSelectModule from "../components/leftSideBar/layerSelectModule.jsx"


const LeftSidebar = ({ isVisible, toggleVisibility }) => {

  return (
    <div className="flex mt-20 max-w-60">
      {/* Left Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          isVisible ? "min-w-40 px-4" : "w-0 px-0"
        } py-4 bg-[#2D2D2D] overflow-hidden text-white flex flex-col gap-y-3`}
      >
        {/* Divided sections */}
        <div className="flex flex-col flex-grow flex flex-col gap-y-4">
          <div className="flex-grow p-2 flex flex-col gap-y-4">
            <ModelSelectModule />
          </div>

          <div className="flex-grow p-2">
            <LayerSelectModule />
          </div>
        </div>
      </aside>

      {/* Collapsible Bar */}
      <aside
        className={`transition-all duration-300 w-0.5 bg-[#4A4A4A] px-2 overflow-hidden cursor-pointer flex items-center justify-center text-white`}
        onClick={toggleVisibility}
        title={isVisible ? "Collapse" : "Expand"} // Tooltip for better UX
      >
        <span className="text-lg">{isVisible ? "<" : ">"}</span>
      </aside>
    </div>
  );
};

export default LeftSidebar;
