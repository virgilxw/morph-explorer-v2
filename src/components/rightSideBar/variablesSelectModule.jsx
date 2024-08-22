import React, { useState, useEffect, useContext, useRef } from "react";
import selectedCityContext from "../../contexts/selectedCityContext.jsx";
import selectedLayerContext from "../../contexts/selectedLayerContext.jsx";
import mapContext from "../../contexts/mapContext.jsx";
import legendContext from "../../contexts/legendContext.jsx";
import directory from "../../data/directory_v2.json";
import ViolinPlot from "./ViolinShape.jsx";

import {
  Card,
  CardContent,
  Typography,
  Container,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// VarCard component with collapsible content
const VarCard = ({ cardInfo, expanded, onExpandClick, isHighlighted }) => {
  return (
    <Card
      className={`w-full ${isHighlighted ? "bg-yellow-100" : ""}`} // Highlight the active card
    >
      <CardContent>
        <div className="flex items-center justify-between">
          <Typography component="subtitle1" onClick={onExpandClick}>
            {cardInfo.name}
          </Typography>
          <IconButton
            onClick={onExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <ViolinPlot
            city_data={cardInfo.sample}
            width={180}
            height={20}
            plotKey={cardInfo.name}
            targetValue={5}
          />
        </Collapse>
      </CardContent>
    </Card>
  );
};


const addLayer = (
  map,
  dataset,
  layerList,
  sourcesDict,
  selectedCity,
  value,
  selectedVar
) => {
  const subUrl = layerList[value]["subUrl"];
  const layerName = (selectedCity + value).replace(/\s/g, "");

  console.log(
    "%csrc/components/rightSideBar/variablesSelectModule.jsx:59 layerList[value]",
    "color: white; background-color: #007acc;",
    selectedVar["name"]
  );

  if (layerList[value]["geometry"] == "Polygon") {
    const fillColor = [
      "step",
      ["get", selectedVar["name"]],
      "#d73027",
      selectedVar["breaks"][0],
      "#f46d43",
      selectedVar["breaks"][1],
      "#fdae61",
      selectedVar["breaks"][2],
      "#fee090",
      selectedVar["breaks"][3],
      "#e0f3f8",
      selectedVar["breaks"][4],
      "#abd9e9",
      selectedVar["breaks"][5],
      "#74add1",
      selectedVar["breaks"][6],
      "#4575b4",
    ]

    // setLegend(fillColor)
    map.current.addLayer({
      id: layerName,
      type: "fill",
      source: layerName,
      "source-layer": layerList[value]["layer_name"],
      paint: {
        "fill-color": fillColor,
        "fill-opacity": 1,
        "fill-outline-color": "#000",
      },
    });
  } else if (layerList[value]["geometry"] == "Point") {
    const fillColor = [
      "step",
      ["get", selectedVar["name"]],
      "#d73027",
      selectedVar["breaks"][0],
      "#f46d43",
      selectedVar["breaks"][1],
      "#fdae61",
      selectedVar["breaks"][2],
      "#fee090",
      selectedVar["breaks"][3],
      "#e0f3f8",
      selectedVar["breaks"][4],
      "#abd9e9",
      selectedVar["breaks"][5],
      "#74add1",
      selectedVar["breaks"][6],
      "#4575b4",
    ]
    //setLegend(fillColor)
    map.current.addLayer({
      id: layerName,
      type: "circle",
      source: layerName,
      "source-layer": layerList[value]["layer_name"],
      paint: {
        "circle-radius": 2, // Set the radius to 2px
        "circle-color": fillColor, // Set the color based on your dataset
        "circle-opacity": 0.4, // Set the opacity to 0.4
        "circle-stroke-width": 1, // Remove the outline by setting the stroke width to 0
      },
    });
  } else if (layerList[value]["geometry"] == "Line") {
    const fillColor = [
      "step",
      ["get", selectedVar["name"]],
      "#d73027",
      selectedVar["breaks"][0],
      "#f46d43",
      selectedVar["breaks"][1],
      "#fdae61",
      selectedVar["breaks"][2],
      "#fee090",
      selectedVar["breaks"][3],
      "#e0f3f8",
      selectedVar["breaks"][4],
      "#abd9e9",
      selectedVar["breaks"][5],
      "#74add1",
      selectedVar["breaks"][6],
      "#4575b4",
    ]
    //setLegend(fillColor)
    map.current.addLayer({
      id: layerName,
      type: "line",
      source: layerName,
      "source-layer": layerList[value]["layer_name"],
      paint: { 
        "line-width": 2,
        "line-color": fillColor,
      },
    });
  }
};

const VariablesSelectModule = () => {
  const { selectedCity, setSelectedCity, dataset, setDataset } =
    useContext(selectedCityContext);
  const {
    selectedLayer,
    setSelectedLayer,
    activeLayers,
    setActiveLayers,
    activeModel,
    setActiveModel,
    expandedIndex,
    setExpandedIndex,
    layerList,
    setlayerList,
    checked,
    setChecked,
    sourcesDict,
    setsourcesDict,
  } = useContext(selectedLayerContext);
  const { map, mapContainer } = useContext(mapContext);
  const [data, setData] = useState([]);
  const [subUrl, setsubUrl] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle the clicked card

    Object.keys(layerList).map((value) => {
      const layerName = (selectedCity + value).replace(/\s/g, "");
      map.current.removeLayer(layerName);
    });

    map.current.removeLayer("ClusterCloud");

    setChecked([]);

    const newChecked = [];

    if (data[index]["domain"] == "buildings") {
      addLayer(
        map,
        dataset,
        layerList,
        sourcesDict,
        selectedCity,
        "Buildings",
        data[index]
      );
      newChecked.push("Buildings");
    } else if (data[index]["domain"] == "tess") {
      addLayer(
        map,
        dataset,
        layerList,
        sourcesDict,
        selectedCity,
        "Tesselation",
        data[index]
      );
      newChecked.push("Tesselation");
    } else if (data[index]["domain"] == "edges") {
      addLayer(
        map,
        dataset,
        layerList,
        sourcesDict,
        selectedCity,
        "Road Network Edges",
        data[index]
      );
      newChecked.push("Road Network Edges");
    } else if (data[index]["domain"] == "nodes") {
      addLayer(
        map,
        dataset,
        layerList,
        sourcesDict,
        selectedCity,
        "Road Network Nodes",
        data[index]
      );
      newChecked.push("Road Network Nodes");
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    if (!dataset || !selectedLayer) return;

    setsubUrl(
      selectedLayer.anchorKey == null
        ? selectedLayer.keys().next().value
        : selectedLayer.anchorKey
    );

    if (!dataset[subUrl]) return;

    setData(dataset[subUrl]["stats"]); // Ensure stats is defined or fallback to an empty array
  }, [selectedCity, selectedLayer, activeModel]);

  return (
    <div className="overflow-y-auto max-h-full">
      {data.length > 0 ? (
        data.map((cardInfo, index) => (
          <div key={index} className="w-full pb-4">
            <VarCard
              cardInfo={cardInfo}
              expanded={expandedIndex === index}
              onExpandClick={() => handleExpandClick(index)}
              isHighlighted={expandedIndex === index}
            />
          </div>
        ))
      ) : (
        <Typography>No data available.</Typography> // Fallback content if data is empty
      )}
    </div>
  );
};

export default VariablesSelectModule;
