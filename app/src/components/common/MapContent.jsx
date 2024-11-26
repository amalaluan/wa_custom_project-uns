import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import boundaryJson from "@/assets/json/boundary.json";
import pathJson from "@/assets/json/path.json";
import buildingIconUrl from "@/assets/location_fill.svg";

// Define custom icon
const buildingIcon = new L.Icon({
  iconUrl: buildingIconUrl,
  iconSize: [10, 10], // Size of the icon
  iconAnchor: [8, 8], // Center of the icon
  popupAnchor: [0, -8], // Adjust popup to appear above the center
});

const MapContent = ({ state, handleBuildingClick, buildingJson, selected }) => {
  const createColoredIcon = (color) => {
    const svgString = `
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <title>building_2_fill</title>
        <g id="building_2_fill" fill='none' fill-rule='nonzero'>
          <path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z'/>
          <path fill='${color}' d='M3 19h1V6.36a1.5 1.5 0 0 1 1.026-1.423l8-2.666A1.5 1.5 0 0 1 15 3.694V19h1V9.99a.5.5 0 0 1 .598-.49l2.196.44A1.5 1.5 0 0 1 20 11.41V19h1a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2Z'/>
        </g>
      </svg>
    `;
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgString)}`,
      iconSize: [16, 16], // Adjust size
      iconAnchor: [12, 12],
    });
  };

  const pointToLayer = useMemo(() => {
    return (feature, latlng) => {
      const isSelected = feature.properties.id == selected;
      const color = isSelected ? "#FF0000" : "#ff9933";
      return L.marker(latlng, { icon: createColoredIcon(color) });
    };
  }, [selected]);

  return (
    <MapContainer
      center={[12.396672, 121.986217]}
      zoom={17}
      className="z-0 w-full h-full cursor-grab"
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution='&copy; <a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">Google</a>'
      />
      {state.selectedData == null && state.show.path && pathJson && (
        <GeoJSON data={pathJson} style={{ color: "magenta" }} />
      )}
      {state.show.boundary && boundaryJson && (
        <GeoJSON data={boundaryJson} style={{ color: "red", fill: false }} />
      )}
      {state.show.building && buildingJson && (
        <GeoJSON
          // key={selected}
          key={JSON.stringify(buildingJson)}
          data={buildingJson}
          onEachFeature={handleBuildingClick}
          pointToLayer={pointToLayer}
          className="bg-green-600"
        />
      )}

      {state.routeFG1 && (
        <GeoJSON
          key={JSON.stringify(state.routeFG1)}
          data={state.routeFG1}
          style={{ color: "#50BFE6" }}
        />
      )}
      {state.routeFG2 && (
        <GeoJSON
          key={JSON.stringify(state.routeFG2)}
          data={state.routeFG2}
          style={{ color: "#66FF66" }}
        />
      )}
      {state.routeFG3 && (
        <GeoJSON
          key={JSON.stringify(state.routeFG3)}
          data={state.routeFG3}
          style={{ color: "#ff017e" }}
        />
      )}
    </MapContainer>
  );
};

export default MapContent;
