import { useCallback, useRef, useState } from "react";

const flyToOptions = {
  duration: 1.2,
  easeLinearity: 0.25,
};

const useLunchMapController = () => {
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const setMap = useCallback((mapInstance) => {
    mapRef.current = mapInstance;
  }, []);

  const flyToRestaurant = useCallback((restaurant) => {
    if (!mapRef.current || !restaurant) return;
    const { lat, lng } = restaurant.coordinates;
    mapRef.current.flyTo([lat, lng], 15, flyToOptions);
  }, []);

  return {
    selectedId,
    setSelectedId,
    setMap,
    flyToRestaurant,
  };
};

export default useLunchMapController;
