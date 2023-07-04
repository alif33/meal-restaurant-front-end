import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";

import { useSelector } from "react-redux";

function LocationMarker({ lat, lng }) {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.flyTo([lat, lng], map.getZoom());
      // console.log("e.latlng", e.latlng);
      const latlng = { lat, lng };
      // console.log("e.accuracy", e.accuracy);
      const radius = e.accuracy;
    //   const circle = L.circle(latlng, radius);
    //   circle.addTo(map);
    });
  }, [lat]);
  // const map = useMap();
  // useEffect(() => {
  //   map.flyTo([lat, lng], map.getZoom());
  // }, [lat]);

  return position === null ? null : (
    <Marker
      position={position}
      // icon={myIcon}
      // icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
    >
      <Circle center={position} radius={200} pathOptions={{ color: "blue" }} />
    </Marker>
  );
}

export default function Map({ lat, lng }) {
  const { restaurant } = useSelector((state) => state);
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker lat={lat} lng={lng} />
    </MapContainer>
  );
}
