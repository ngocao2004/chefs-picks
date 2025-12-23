import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const mapOptions = {
  zoomControl: false,
  scrollWheelZoom: false,
};

const LunchMap = ({ restaurants, activeId, onMapReady, onMarkerClick }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const markerLayerRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    iconRef.current = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const defaultCenter = restaurants.length
      ? [restaurants[0].coordinates.lat, restaurants[0].coordinates.lng]
      : [0, 0];
    const mapInstance = L.map(mapContainerRef.current, mapOptions).setView(
      defaultCenter,
      13
    );

    mapRef.current = mapInstance;
    if (typeof onMapReady === "function") {
      onMapReady(mapInstance);
    }

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance);

    markerLayerRef.current = L.layerGroup().addTo(mapInstance);

    return () => {
      mapInstance.remove();
      mapRef.current = null;
      markersRef.current = {};
      markerLayerRef.current = null;
      if (typeof onMapReady === "function") {
        onMapReady(null);
      }
    };
  }, [onMapReady, restaurants]);

  useEffect(() => {
    if (!markerLayerRef.current) return;

    markerLayerRef.current.clearLayers();
    markersRef.current = {};

    restaurants.forEach((restaurant) => {
      const { lat, lng } = restaurant.coordinates;
      const marker = L.marker([lat, lng], { icon: iconRef.current })
        .addTo(markerLayerRef.current)
        .bindPopup(restaurant.name);

      marker.on("click", () => {
        if (typeof onMarkerClick === "function") {
          onMarkerClick(restaurant.id);
        }
      });

      markersRef.current[restaurant.id] = marker;
    });
  }, [restaurants, onMarkerClick]);

  useEffect(() => {
    if (!activeId) return;
    const marker = markersRef.current[activeId];
    if (marker) {
      marker.openPopup();
    }
  }, [activeId]);

  return (
    <div
      ref={mapContainerRef}
      className="h-[400px] w-full"
      aria-label="Lunch map"
    />
  );
};

export default LunchMap;
