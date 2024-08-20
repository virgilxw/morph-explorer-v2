import React, { useState, useEffect, useContext } from "react";
import legendContext from "../../contexts/legendContext.jsx";

const Legendbox = ({ showDendogram, setShowDendogram }) => {
  const { legend, setLegend } = useContext(legendContext);
  const [legendOutput, setLegendOutput] = useState([]);

  useEffect(() => {
    // Ensure legend is properly set in the context whenever it changes
    setLegend(legend);

    console.log(legend);

    if (!legend) return;
    const legend_temp = legend.slice(2);
    legend_temp.unshift(0);
    setLegendOutput([]);
    for (let i = 0; i < legend_temp.length; i += 2) {
      setLegendOutput((prevArray) => [
        ...prevArray,
        legend_temp.slice(i, i + 2),
      ]);
    }
  }, [legend, setLegend]);

  return (
    <>
      <h2>Legend: </h2>
      <div className="legend-scale grid grid-cols-2">
        <ul className="legend-column">
          {legendOutput &&
            legendOutput
              .slice(0, Math.ceil(legendOutput.length / 2))
              .map((element) => (
                <li key={element[0]} className="flex items-center">
                  <span
                    className="legend-color block float-left h-4 w-4 mr-1 border border-gray-600"
                    style={{ backgroundColor: element[1] }}
                  ></span>
                  {element[0]}
                </li>
              ))}
        </ul>
        
        <ul className="legend-column">
          {legendOutput &&
            legendOutput
              .slice(Math.ceil(legendOutput.length / 2))
              .map((element) => (
                <li key={element[0]} className="flex items-center">
                  <span
                    className="legend-color block float-left h-4 w-4 mr-1 border border-gray-600"
                    style={{ backgroundColor: element[1] }}
                  ></span>
                  {element[0]}
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Legendbox;
