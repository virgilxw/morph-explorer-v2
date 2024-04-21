import React, { useState, useContext, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";
import directory from "../../data/directory.json";
import selectedCityContext from "../../contexts/selectedCityContext.jsx";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import selectedLayerContext from "../../contexts/selectedLayerContext.jsx";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

const DefaultContent = () => {
  return (
    <>
      <p>
        This layer was generated from Ordinance Survey street and building data.
      </p>

      <Select />
    </>
  );
};

const LayerList = ({ layerName }) => {
  const { selectedCity, setSelectedCity } = useContext(selectedCityContext);
  const { selectedLayer, setSelectedLayer } = useContext(selectedLayerContext);
  const [cityData, setCityData] = useState(null);
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    // Find city data when currentCity changes
    const cityData = directory.cities.find(
      (city) => city.city_name === selectedCity
    );
    setCityData(cityData);
    if (cityData && cityData.datasets) {
      setDataset(cityData.datasets);
    }

  }, [selectedCity]);

  if (!selectedCity || !cityData || !dataset) {
    return null; // Return null if currentCity, cityData, or dataset is not available
  }

  return (
    <Accordion
      isCompact
      defaultExpanded
      selectedKeys={selectedLayer}
      onSelectionChange={setSelectedLayer}
    >
      {Object.keys(dataset).map((layer_name) => (
        <AccordionItem
          key={layer_name}
          aria-label={layer_name + "Accordion"}
          title={layer_name}
          expanded // Set expanded to true to expand all items by default
          className="accordianItem"
          indicator={({ isOpen }) =>
            isOpen ? (
              <CheckBoxOutlinedIcon />
            ) : (
              <CheckBoxOutlineBlankOutlinedIcon />
            )
          }
        >
          <DefaultContent />
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LayerList;
