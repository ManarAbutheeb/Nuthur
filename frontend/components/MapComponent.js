"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from "react-leaflet";
import L from "leaflet";
import inside from 'point-in-polygon';
import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
const SOUTH_BBOX = [
  [42.44913781277063, 18.1372207086866],
  [
    42.41137816267164,
    18.17536777169616
  ],
  [
    42.402260686160815,
    18.199053237392107
  ],
  [
    42.359260524373155,
    18.25823159040702
  ],
  [
    42.34389304364336,
    18.29734274031678
  ],
  [
    42.355046790164494,
    18.299763835054293
  ],
  [
    42.3752849917263,
    18.306384426547766
  ],
  [
    42.385912282712184,
    18.293781017604786
  ],
  [
    42.44106077139806,
    18.230660615260398
  ],
  [
    42.48790528277104,
    18.16018077510884
  ],
  [
    42.44926575424958,
    18.136262537623807
  ]
];
const WORLD_OUTER = [
  [-180, -90],
  [180, -90],
  [180, 90],
  [-180, 90],
  [-180, -90],
];

function MapClickHandler({ onMapClick }) {

  useMapEvents({
    click(e) {
      const clicked = [e.latlng.lat, e.latlng.lng];
      const insidePolygon = inside(clicked, SOUTH_BBOX.map(([lat, lng]) => [lng, lat]));

      if (!insidePolygon) {
        alert("The area is not supported !");
        return;
      }

      onMapClick(clicked);
    },
  });
  return null;
}




export default function ReportMap({ userLocation, position, setPosition }) {
  userLocation = [18.2353699, 42.3895230];
  const maskFeature = {
    type: "Feature",
    geometry: {
      type: "Polygon",

      coordinates: [WORLD_OUTER, SOUTH_BBOX],
    },
    properties: {},
  };

  return (

    <MapContainer
      center={userLocation}
      zoom={11.5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        attribution='Map data: &copy; <a href="https://opentopomap.org/">OpenTopoMap</a>'
      />






      <GeoJSON
        data={maskFeature}
        pathOptions={{
          fillColor: "black",
          fillOpacity: 0.6,
          stroke: true,
          color: "#ffcc00",
          weight: 2,
          fillRule: "evenodd",
          pane: "overlayPane",
        }}
        interactive={false}
      />
   
      <MapClickHandler onMapClick={(point) => setPosition(point)} />

      {position && (
        <Marker position={position}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
