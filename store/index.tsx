"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import defaultStates from "../utils/defaultStates";

import { debounce } from "lodash";
import { useWeatherData } from "./store";

export const GlobalStore = () => {
  const initUserState = useRef(false);
  const [forecast, setForecast] = useState({} as { weather: [] });
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([
    24.829588, 92.797148,
  ]);

  const [airQuality, setAirQuality] = useState(
    {} as { list: { main: { aqi: number } }[] }
  );
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, seUvIndex] = useState({});

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/currentweather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(
        "Error fetching forecast data: ",
        (error as { message: string }).message
      );
    }
  };

  // Air Quality
  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/airquality?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log(
        "Error fetching air quality data: ",
        (error as { message: string }).message
      );
    }
  };

  // five day forecast
  const fetchFiveDayForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/fivedayforecast?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error) {
      console.log(
        "Error fetching five day forecast data: ",
        (error as { message: string }).message
      );
    }
  };

  //geocoded list
  const fetchGeoCodedList = async (search: any) => {
    try {
      const res = await axios.get(`/api/geo?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error) {
      console.log(
        "Error fetching geocoded list: ",
        (error as { message: string }).message
      );
    }
  };

  //fetch uv data
  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

      seUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };

  // handle input
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    if (!initUserState.current) {
      useWeatherData.setState({
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      });
    }
    initUserState.current = true;
  }, [activeCityCoords]);
  // useEffect(() => {
  //   if (!initUserState.current) {
  //     useWeatherData.setState({
  //       forecast,
  //       airQuality,
  //       fiveDayForecast,
  //       uvIndex,
  //       geoCodedList,
  //       inputValue,
  //       handleInput,
  //       setActiveCityCoords,
  //     });
  //   }
  //   initUserState.current = true;
  //   console.log(forecast, airQuality, fiveDayForecast, uvIndex, geoCodedList);
  // }, []);

  return <></>;
};
