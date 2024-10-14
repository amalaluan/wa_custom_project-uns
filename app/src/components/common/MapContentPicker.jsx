import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvent,
  Popup,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import html2canvas from "html2canvas"; // Import html2canvas
import "leaflet/dist/leaflet.css";

import boundaryJson from "@/assets/json/boundary.json";
import buildingJson from "@/assets/json/buildings.json";
import buildingIconUrl from "@/assets/location_fill.svg";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

// Define custom icon
const buildingIcon = new L.Icon({
  iconUrl: buildingIconUrl,
  iconSize: [16, 16], // Size of the icon
  iconAnchor: [8, 8], // Center of the icon
  popupAnchor: [0, -8], // Adjust popup to appear above the center
});

// Component to handle map clicks and show popup
const LocationMarker = ({ saveCoords }) => {
  const [position, setPosition] = useState(null);
  const [tempPosition, setTempPosition] = useState(null);
  const [mapClickEnabled, setMapClickEnabled] = useState(true);
  const { setAuthLoading } = useAuth();

  useMapEvent("click", (e) => {
    if (mapClickEnabled) {
      setTempPosition(e.latlng);
    }
  });

  const handleConfirmPosition = () => {
    setAuthLoading(true);

    setPosition(tempPosition);
    setTempPosition(null);
    setMapClickEnabled(false);

    // Capture the map after saving the coordinates
    setTimeout(() => setMapClickEnabled(true), 500);
    saveCoords(tempPosition);
  };

  const handleCancelSelect = () => {
    setTempPosition(null);
    setMapClickEnabled(false);
    setTimeout(() => setMapClickEnabled(true), 500);
  };

  return tempPosition === null ? null : (
    <Popup position={tempPosition}>
      <div className="mb-2">
        <span>Use this location?</span>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleConfirmPosition}>Yes, use this.</Button>
        <Button variant="secondary" onClick={handleCancelSelect}>
          No
        </Button>
      </div>
    </Popup>
  );
};

const MapContentPicker = ({ dispatch, defCoords }) => {
  const { setAuthLoading } = useAuth();

  const saveCoords = (coords) => {
    const mapElement = document.getElementById("leaftlet-to-capture"); // Map container

    // Introduce a delay to ensure the map fully renders before capturing
    setTimeout(() => {
      html2canvas(mapElement).then((canvas) => {
        const imageUrl = canvas.toDataURL(); // Generate the snapshot as a base64 image URL

        // Dispatch coordinates and image URL to your state
        dispatch({
          type: "update_coords",
          value: {
            coordinates: [coords.lng, coords.lat],
            temporary_url: imageUrl, // Pass the captured image
          },
        });

        setAuthLoading(false);
      });
    }, 1500); // Adjust the delay to 1000ms to ensure the UI is fully updated
  };

  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: buildingIcon });
  };

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

      <GeoJSON data={boundaryJson} style={{ color: "red", fill: false }} />
      <GeoJSON data={buildingJson} pointToLayer={pointToLayer} />

      {defCoords && (
        <Marker position={[defCoords[1], defCoords[0]]}>
          <Popup>
            Selected location: <br />
            Latitude: {defCoords[1]}
            <br />
            Longitude: {defCoords[0]}
          </Popup>
        </Marker>
      )}

      <LocationMarker saveCoords={saveCoords} />
    </MapContainer>
  );
};

export default MapContentPicker;
