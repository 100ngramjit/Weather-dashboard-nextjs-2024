"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import defaultStates from "../utils/defaultStates";

import { debounce } from "lodash";
import { useWeatherData } from "./store";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

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
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      const res = await axios.get(url);

      setForecast(res.data);
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
      const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const res = await axios.get(url);
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
      const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      const res = await axios.get(dailyUrl);

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
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

      const res = await axios.get(url);

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
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

      const res = await axios.get(url);

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
    console.log(forecast, airQuality, fiveDayForecast, uvIndex, geoCodedList);
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

  return <></>;
};

// "use client";
// import axios from "axios";
// import React, { useState, useEffect, useRef } from "react";
// import defaultStates from "../utils/defaultStates";

// import { debounce } from "lodash";
// import { useWeatherData } from "./store";

// export const GlobalStore = () => {
//   const initUserState = useRef(false);
//   const [forecast, setForecast] = useState({} as { weather: [] });
//   const [geoCodedList, setGeoCodedList] = useState(defaultStates);
//   const [inputValue, setInputValue] = useState("");

//   const [activeCityCoords, setActiveCityCoords] = useState([
//     24.829588, 92.797148,
//   ]);

//   const [airQuality, setAirQuality] = useState(
//     {} as { list: { main: { aqi: number } }[] }
//   );
//   const [fiveDayForecast, setFiveDayForecast] = useState({});
//   const [uvIndex, seUvIndex] = useState({});

//   const fetchForecast = async (lat: number, lon: number) => {
//     try {
//       const res = await axios.get(`api/current-weather?lat=${lat}&lon=${lon}`);

//       setForecast(res.data);
//     } catch (error) {
//       console.log(
//         "Error fetching forecast data: ",
//         (error as { message: string }).message
//       );
//     }
//   };

//   // Air Quality
//   const fetchAirQuality = async (lat: number, lon: number) => {
//     try {
//       const res = await axios.get(`api/air-quality?lat=${lat}&lon=${lon}`);
//       setAirQuality(res.data);
//     } catch (error) {
//       console.log(
//         "Error fetching air quality data: ",
//         (error as { message: string }).message
//       );
//     }
//   };

//   // five day forecast
//   const fetchFiveDayForecast = async (lat: number, lon: number) => {
//     try {
//       const res = await axios.get(
//         `api/five-day-forecast?lat=${lat}&lon=${lon}`
//       );

//       setFiveDayForecast(res.data);
//     } catch (error) {
//       console.log(
//         "Error fetching five day forecast data: ",
//         (error as { message: string }).message
//       );
//     }
//   };

//   //geocoded list
//   const fetchGeoCodedList = async (search: any) => {
//     try {
//       const res = await axios.get(`/api/geo?search=${search}`);

//       setGeoCodedList(res.data);
//     } catch (error) {
//       console.log(
//         "Error fetching geocoded list: ",
//         (error as { message: string }).message
//       );
//     }
//   };

//   //fetch uv data
//   const fetchUvIndex = async (lat: number, lon: number) => {
//     try {
//       const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

//       seUvIndex(res.data);
//     } catch (error) {
//       console.error("Error fetching the forecast:", error);
//     }
//   };

//   // handle input
//   const handleInput = (e: {
//     target: { value: React.SetStateAction<string> };
//   }) => {
//     setInputValue(e.target.value);

//     if (e.target.value === "") {
//       setGeoCodedList(defaultStates);
//     }
//   };

//   // debounce function
//   useEffect(() => {
//     const debouncedFetch = debounce((search) => {
//       fetchGeoCodedList(search);
//     }, 500);

//     if (inputValue) {
//       debouncedFetch(inputValue);
//     }

//     // cleanup
//     return () => debouncedFetch.cancel();
//   }, [inputValue]);

//   useEffect(() => {
//     fetchForecast(activeCityCoords[0], activeCityCoords[1]);
//     fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
//     fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
//     fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
//   }, [activeCityCoords]);
//   useEffect(() => {
//     if (!initUserState.current) {
//       useWeatherData.setState({
//         forecast,
//         airQuality,
//         fiveDayForecast,
//         uvIndex,
//         geoCodedList,
//         inputValue,
//         handleInput,
//         setActiveCityCoords,
//       });
//     }
//     initUserState.current = true;
//   }, []);

//   return <></>;
// };
