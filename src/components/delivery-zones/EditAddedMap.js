import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useSelector } from "react-redux";

function DraggableMarker({ lat, lng, setLng, setLat }) {

  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState([lat, lng]);
  const [bbox, setBbox] = useState([]);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);

      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
    //   const circle = L.circle(e.latlng, radius);
    //   circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setLat(lat);
          setLng(lng);
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

function LocationMarker({ lat, lng }) {

  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom());
  }, [lat]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function EditAddedMap({ lat, lng, setLat, setLng }) {

  const { restaurant } = useSelector((state) => state);

  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker lat={lat} lng={lng} />
      <DraggableMarker lat={lat} lng={lng} setLng={setLng} setLat={setLat} />
    </MapContainer>
  );
}
