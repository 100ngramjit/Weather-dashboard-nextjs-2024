import { create } from "zustand";

export const useWeatherData = create()(() => ({
  forecast: undefined,
  airQuality: undefined,
  fiveDayForecast: undefined,
  uvIndex: undefined,
  geoCodedList: undefined,
  inputValue: undefined,
  handleInput: () => {},
  setActiveCityCoords: () => {},
}));
