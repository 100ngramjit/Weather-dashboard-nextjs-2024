import { create } from "zustand";

interface weatherData {
  forecast: any;
  airQuality: { list: { main: { aqi: number } }[] };
  fiveDayForecast: any;
  uvIndex: any;
  geoCodedList: any;
  inputValue: string;
  handleInput: (e: {
    target: {
      value: React.SetStateAction<string>;
    };
  }) => void;
  setActiveCityCoords: React.Dispatch<React.SetStateAction<number[]>>;
}

export const useWeatherData = create<weatherData>()(() => ({
  forecast: {},
  airQuality: {
    list: [],
  },
  fiveDayForecast: {},
  uvIndex: {},
  geoCodedList: [],
  inputValue: "",
  handleInput: () => {},
  setActiveCityCoords: () => {},
}));
