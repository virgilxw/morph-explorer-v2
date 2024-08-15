import React, { useState, useEffect, useContext, useRef } from "react";
import selectedCityContext from "../../contexts/selectedCityContext.jsx";
import selectedLayerContext from "../../contexts/selectedLayerContext.jsx";
import mapContext from "../../contexts/mapContext.jsx";
import directory from "../../data/directory_v2.json";
import ViolinPlot from "./ViolinShape.tsx";
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
  } = useContext(selectedLayerContext);
  const { map, mapContainer } = useContext(mapContext);
  const [data, setData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // Keep track of the expanded card

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle the clicked card
  };

  useEffect(() => {
    if (!dataset || !selectedLayer) return;

    let subUrl =
      selectedLayer.anchorKey == null
        ? selectedLayer.keys().next().value
        : selectedLayer.anchorKey;

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
