// VERY IMPORTANT PAR OF MINI COURSE
// React Query provides a hook called useQuery
import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const; // So this cannot be changed

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? {lat: 0, lon: 0}) ,
    // when referring later can use this key "weather"
    queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates): null,
    enabled: !!coordinates, // normally set to false to diable query from automatically running
                          // so here want to ensure IS automatically running
  });
};

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat: 0, lon: 0}) ,
    // when referring later can use this key "weather"
    queryFn: () => coordinates ? weatherAPI.getForecast(coordinates): null,
    enabled: !!coordinates,
  });
};

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? {lat: 0, lon: 0}) ,
    // when referring later can use this key "weather"
    queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates): null,
    enabled: !!coordinates,
  });
};

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
};