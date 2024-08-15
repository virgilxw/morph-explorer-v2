import selectedCityContext from "../../contexts/selectedCityContext.jsx";
import selectedLayerContext from "../../contexts/selectedLayerContext.jsx";
import { useContext, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import mapContext from "../../contexts/mapContext.jsx";

import directory from "../../data/directory_v2.json";

export default function LaterSelectModule() {
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
  const [layerList, setlayerList] = useState([]);
  const { map, mapContainer } = useContext(mapContext);

  const [layerName, setlayerName] = useState([]);

  useEffect(() => {
    if (!dataset || !selectedLayer) return;

    let subUrl =
      selectedLayer.anchorKey == null
        ? selectedLayer.keys().next().value
        : selectedLayer.anchorKey;

    if (!dataset[subUrl]) return;
    setlayerList(dataset[subUrl]["layers"]);

    if (!dataset) return;

    // Clean up previous styledata event listener
    const onStyleData = () => {
      Object.keys(dataset[subUrl]["layers"]).forEach((value) => {
        const layerName = (selectedCity + value).replace(/\s/g, "");

        const PMTILES_URL =
          directory.cdn_url + dataset[subUrl]["layers"][value]["subUrl"];

        // Check if source already exists
        if (!map.current.getSource(layerName)) {
          map.current.addSource(layerName, {
            type: "vector",
            url: `pmtiles://${PMTILES_URL}`,
          });
        }
      });
    };

    map.current.on("styledata", onStyleData);

    // Clean up the event listener on component unmount
    return () => {
      map.current.off("styledata", onStyleData);
    };

    setlayerName(dataset[subUrl]["layer_name"]);
  }, [dataset, selectedLayer]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    let subUrl =
      selectedLayer.anchorKey == null
        ? selectedLayer.keys().next().value
        : selectedLayer.anchorKey;

    if (currentIndex === -1) {
      // Checked
      newChecked.push(value);

      const layerName = (selectedCity + value).replace(/\s/g, "");

      if (value == "ClusterCloud") {
        map.current.addLayer({
          id: "ClusterCloud",
          type: "circle",
          source: dataset[subUrl]["layer_name"],
          "source-layer": dataset[subUrl]["layer_name"],
          paint: {
            "circle-radius": 2, // Set the radius to 2px
            "circle-color": dataset[subUrl]["style"], // Set the color based on your dataset
            "circle-opacity": 1, // Set the opacity to 0.4
            "circle-stroke-width": 0, // Remove the outline by setting the stroke width to 0
          },
        });
      } else if (layerList[value]["geometry"] == "Polygon") {
        map.current.addLayer({
          id: layerName,
          type: "fill",
          source: layerName,
          "source-layer": dataset[subUrl]["layers"][value]["layer_name"],
          paint: dataset[subUrl]["layers"][value]["style"],
        });
      } else if (layerList[value]["geometry"] == "Point") {
        map.current.addLayer({
          id: layerName,
          type: "circle",
          source: layerName,
          "source-layer": dataset[subUrl]["layers"][value]["layer_name"],
          paint: {
            "circle-radius": 2, // Set the radius to 2px
            "circle-color": "red", // Set the color based on your dataset
            "circle-opacity": 0.4, // Set the opacity to 0.4
            "circle-stroke-width": 2, // Remove the outline by setting the stroke width to 0
          },
        });
      } else if (layerList[value]["geometry"] == "Line") {
        map.current.addLayer({
          id: layerName,
          type: "line",
          source: layerName,
          "source-layer": dataset[subUrl]["layers"][value]["layer_name"],
          paint: {
            "line-width":2
          }
        });
      }
    } else {
      // Unchecked
      newChecked.splice(currentIndex, 1);
      if (value == "ClusterCloud") {
        map.current.removeLayer(value);
      } else {
        const layerName = (selectedCity + value).replace(/\s/g, "");
        map.current.removeLayer(layerName);
      }
    }
    setChecked(newChecked);
  };

  const [checked, setChecked] = useState(["ClusterCloud"]);

  return (
    <>
      <p>Layers:</p>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        <ListItem
          key="ClusterCloud"
          secondaryAction={
            <IconButton edge="end" aria-label="info" color="secondary">
              <InfoIcon />
            </IconButton>
          }
          disableGutters
          disablePadding
        >
          <ListItemButton dense onClick={handleToggle("ClusterCloud")}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf("ClusterCloud") !== -1}
                disableRipple
                inputProps={{ "aria-labelledby": "ClusterCloud" }}
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: "12px" }}
              id="ClusterCloud"
              primary= "Building Urban Type Cluster"
            />
          </ListItemButton>
        </ListItem>
        {Object.keys(layerList).map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
              key={index} // Using index as key
              secondaryAction={
                <IconButton edge="end" aria-label="info" color="secondary">
                  <InfoIcon />
                </IconButton>
              }
              disableGutters
              disablePadding
            >
              <ListItemButton dense onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "12px" }}
                  id={labelId}
                  primary={value}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
