import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
};

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) { // built in to javascript
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browswer",
        isLoading: false,
      }); // if object is not present return;
      return;
    };

    navigator.geolocation.getCurrentPosition((position) => {
      setLocationData({
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        error: null,
        isLoading: false,
      });
    }, (error) => {
      let errorMessage: string;

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location permission denied. Please enable location access";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Locaiton information is unavailable";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out";
          break;
        default:
          errorMessage = "An unknown error occurred";
      }

      setLocationData({
        coordinates: null,
        error: errorMessage,
        isLoading: false,
      });
    }, {
      enableHighAccuracy: true,
      timeout: 500,
      maximumAge: 0,
    }
    );
  };

  useEffect(() => { // called as soon as app is loaded / component did mount
    getLocation();
  }, []);

  return { 
    ...locationData, 
    getLocation, // Expose method to manually refresh location
  };
};