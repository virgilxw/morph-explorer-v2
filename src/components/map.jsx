"use client";

import React, { useRef, useEffect, useState, useContext } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import "./map.css";
import selectedCityContext from "../contexts/selectedCityContext.jsx";
import selectedLayerContext from "../contexts/selectedLayerContext.jsx";
import mapContext from '../contexts/mapContext.jsx';

import directory from "../data/directory_v2.json";
import legendContext from "../contexts/legendContext.jsx";
import selectedDendogramContext from "@/contexts/selectedDendogramContext.jsx";

export default function Map() {
  const [lng] = useState(-4.25);
  const [lat] = useState(55.861111);
  const [zoom] = useState(14);
  const [API_KEY] = useState(process.env.NEXT_PUBLIC_MAPTILER_API_KEY);
  const { legend, setLegend } = useContext(legendContext);
  const { selectedCity, setSelectedCity, dataset, setDataset } =
    useContext(selectedCityContext);
  const { selectedLayer, setSelectedLayer, activeLayers, setActiveLayers, activeModel, setActiveModel } = useContext(selectedLayerContext);
  const { selectedDendogram, setSelectedDendogram } = useContext(
    selectedDendogramContext
  );

  const {map, mapContainer} = useContext(mapContext)
  const [dataSource, setDataSource] = useState(directory.cdn_url);

  useEffect(() => {
    // Find city data when currentCity changes
    const cityData = directory.cities.find(
      (city) => city.city_name === selectedCity
    );
    if (cityData && cityData.datasets) {
      setDataset(cityData.datasets);
    }
  }, [selectedCity, directory]);

  useEffect(() => {
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return; // Ensure this runs once and all conditions are met

    // Initialize the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      style: `https://api.maptiler.com/maps/a6249906-280e-4902-b494-bfb1b59503dd/style.json?key=${API_KEY}`,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, [API_KEY, lat, lng, zoom]);

  useEffect(() => {
    if (dataset) {
      setSelectedLayer(new Set([Object.keys(dataset)[0]]));
    }
  }, [dataset]);
  useEffect(() => {
    if (!dataSource || !dataset || !selectedLayer) return;

    // Function that executes the layer operations
    const executeLayerOperations = () => {
      let subUrl =
        selectedLayer.anchorKey == null
          ? selectedLayer.keys().next().value
          : selectedLayer.anchorKey;

      const PMTILES_URL = dataSource + dataset[subUrl]["subUrl"];
      const layerName = dataset[subUrl]["layer_name"];

      map.current.addSource(layerName, {
        type: "vector",
        url: `pmtiles://${PMTILES_URL}`,
      });

      setActiveLayers(["ClusterCloud"])


      if (dataset[subUrl]["geometry"] == "Polygon") {
        map.current.addLayer({
          id: "ClusterCloud",
          type: "fill",
          source: layerName,
          "source-layer": layerName,
          paint: {
            "fill-color": dataset[subUrl]["style"],
            "fill-opacity": 0.4,
          },
        });
      } else if (dataset[subUrl]["geometry"] == "Point") {
        map.current.addLayer({
          id: "ClusterCloud",
          type: "circle",
          source: layerName,
          "source-layer": layerName,
            paint: {
              "circle-radius": 2, // Set the radius to 2px
              "circle-color": dataset[subUrl]["style"], // Set the color based on your dataset
              "circle-opacity": 1, // Set the opacity to 0.4
              "circle-stroke-width": 0, // Remove the outline by setting the stroke width to 0
          }
        });
      }

      setLegend(dataset[subUrl]["style"]);
      setSelectedDendogram(dataset[subUrl]["dendogram"]);

      setActiveModel(layerName); // Update activeModel state
    };

    // Only setup the listener once and ensure clean up
    if (map && map.current) {
      // Check if activeModel exists and remove it
      if (activeModel) {
        map.current.removeLayer(activeModel);
        map.current.removeSource(activeModel); // Ensure removal uses the source name/id
        setActiveModel(null);
      }
      // Check if the map's style is already loaded
      if (map.current.isStyleLoaded()) {
        // Execute immediately if style is already loaded
        executeLayerOperations();
      } else {
        // Wait for the style to load before executing
        map.current.once("styledata", executeLayerOperations);
      }
    }

    // Cleanup function to be run on componentWillUnmount
    return () => {
      if (map && map.current) {
        map.current.off("styledata", executeLayerOperations);
      }
    };
  }, [dataSource, dataset, selectedLayer, activeModel]);

  const [mapHeight, setMapHeight] = useState(1500);

  useEffect(() => {
    const setHeight = () => {
      if (typeof window !== "undefined") {
        setMapHeight(window.innerHeight - 80);
      }
    };

    setHeight(window.innerHeight - setMapHeight(1500)); // Call once initially

    window.addEventListener("resize", setHeight); // Update height on window resize

    return () => {
      window.removeEventListener("resize", setHeight); // Cleanup event listener
    };
  }, []); // Empty dependency array means effect runs only once after initial render

  useEffect(() => {
    if (mapContainer.current) {
      mapContainer.current.style.height = `${mapHeight}px`;
    }
  });

  return (
    <div className="map-wrap flex-grow bg-gray-200">
      <div
        ref={mapContainer}
        className="map ma absolute w-full top-20"
        style={{ height: mapHeight }}
      />
    </div>
  );
}
