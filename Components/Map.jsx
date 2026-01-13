import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useGeolocation } from "../Hooks/useGeolocation";
import Button from "./Button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useURLPosition } from "../Hooks/useURLPosition";

export default function Map() {
  const {
    isLoading: geoLoding,
    position: userPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useURLPosition();
  const [position, setPosition] = useState([60, 60]);
  const { cities } = useCities();
  console.log(cities)
  useEffect(
    function () {
      if (userPosition) setPosition([userPosition.lat, userPosition.lng]);
    },
    [userPosition]
  );
  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      {!userPosition ? (
        <Button type={"position"} onClick={getPosition}>
          {geoLoding ? "Loading" : "Get Position"}
        </Button>
      ) : (
        ""
      )}
      <MapContainer
        center={position}
        zoom={100}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityname}</Popup>
          </Marker>
        ))}
        <ChangePosition position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );

  // eslint-disable-next-line react/prop-types
  function ChangePosition({ position }) {
    const map = useMap();

    // Check if the position array has valid values before updating the map
    if (position && !isNaN(position[0]) && !isNaN(position[1])) {
      map.setView(position);
    }

    return null;
  }
  function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
  }
}
