"use client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";

import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState(
    JSON.parse(localStorage.getItem("coords")) || [51.5074, 0.1278]
  );

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, seUvIndex] = useState({});

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Air Quality
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  // five day forecast
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //geocoded list
  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  //fetch uv data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

      seUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };

  // handle input
  const handleInput = (e) => {
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
  }, [activeCityCoords]);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setActiveCityCoords([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        localStorage.setItem(
          "coords",
          JSON.stringify([position.coords.latitude, position.coords.longitude])
        );
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

// "use client";
// import axios from "axios";
// import React, { useContext, createContext, useState, useEffect } from "react";
// import defaultStates from "../utils/defaultStates";

// import { debounce } from "lodash";

// const GlobalContext = createContext();
// const GlobalContextUpdate = createContext();

// const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

// export const GlobalContextProvider = ({ children }) => {
//   const [forecast, setForecast] = useState({});
//   const [geoCodedList, setGeoCodedList] = useState(defaultStates);
//   const [inputValue, setInputValue] = useState("");

//   const [activeCityCoords, setActiveCityCoords] = useState([
//     24.829588, 92.797148,
//   ]);

//   const [airQuality, setAirQuality] = useState({});
//   const [fiveDayForecast, setFiveDayForecast] = useState({});
//   const [uvIndex, seUvIndex] = useState({});

//   const fetchForecast = async (lat, lon) => {
//     try {
//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//       const res = await axios.get(url);

//       setForecast(res.data);
//     } catch (error) {
//       console.log("Error fetching forecast data: ", error.message);
//     }
//   };

//   // Air Quality
//   const fetchAirQuality = async (lat, lon) => {
//     try {
//       const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//       const res = await axios.get(url);
//       setAirQuality(res.data);
//     } catch (error) {
//       console.log("Error fetching air quality data: ", error.message);
//     }
//   };

//   // five day forecast
//   const fetchFiveDayForecast = async (lat, lon) => {
//     try {
//       const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//       const res = await axios.get(url);

//       setFiveDayForecast(res.data);
//     } catch (error) {
//       console.log("Error fetching five day forecast data: ", error.message);
//     }
//   };

//   //geocoded list
//   const fetchGeoCodedList = async (search) => {
//     try {
//       const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
//       const res = await axios.get(url);

//       setGeoCodedList(res.data);
//     } catch (error) {
//       console.log("Error fetching geocoded list: ", error.message);
//     }
//   };

//   //fetch uv data
//   const fetchUvIndex = async (lat, lon) => {
//     try {
//       const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

//       const res = await axios.get(url);

//       seUvIndex(res.data);
//     } catch (error) {
//       console.error("Error fetching the forecast:", error);
//     }
//   };

//   // handle input
//   const handleInput = (e) => {
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

//   return (
//     <GlobalContext.Provider
//       value={{
//         forecast,
//         airQuality,
//         fiveDayForecast,
//         uvIndex,
//         geoCodedList,
//         inputValue,
//         handleInput,
//         setActiveCityCoords,
//       }}
//     >
//       <GlobalContextUpdate.Provider
//         value={{
//           setActiveCityCoords,
//         }}
//       >
//         {children}
//       </GlobalContextUpdate.Provider>
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => useContext(GlobalContext);
// export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
