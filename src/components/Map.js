import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

const planeIcon = new L.Icon({
  iconUrl: process.env.NEXT_PUBLIC_URL + "/drone.png", // Adjusted iconUrl to point to drone.png in the public folder,
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [19, 19], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -19], // Point from which the popup should open relative to the iconAnchor
});

const Map = ({ center }) => {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={planeIcon}></Marker>
    </MapContainer>
  );
};

export default Map;
