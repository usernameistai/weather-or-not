import { API_CONFIG } from "./config";
import type { 
  Coordinates, 
  ForecastData, 
  GeocodingResponse, 
  WeatherData 
} from "./types";

class WeatherAPI {
  // Private functions
  private createUrl(
    endpoint: string, // like BASE_URL
    params: Record<string, string | number>,
    // Object with key as string, value as string or number 
  ) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params, // and will take all of the params
    });

    return `${endpoint}?${searchParams.toString()}`;
    // toString() turns objects into strings
  };

  private async fetchData<T>(url:string): Promise<T> { // Take a atring and return a promise
    // Promise was underscored red, until it had a return statement as is the retrn type
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather API Error: ${res.statusText}`);
    };
    return res.json();
  };

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchData<WeatherData>(url); // from function above
  };

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData<ForecastData>(url); // from function above
  };

  async reverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1, // whatever the first object is
    });

    return this.fetchData<GeocodingResponse[]>(url); // from function above
  };

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5,
    });
    return this.fetchData<GeocodingResponse[]>(url);
  };
 
};

export const weatherAPI = new WeatherAPI();