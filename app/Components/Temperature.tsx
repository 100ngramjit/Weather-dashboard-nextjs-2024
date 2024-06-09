"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { navigation } from "@/app/utils/Icons";
import {
  getIcon,
  getWeatherBg,
  kelvinToCelsius,
  processDailyWeatherData,
} from "@/app/utils/misc";
import moment from "moment";

function Temperature() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  const { list } = fiveDayForecast;

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const dailyForecasts = [];
  const dailyData = list?.slice(0, 5);
  dailyForecasts.push(processDailyWeatherData(dailyData));

  const temp = kelvinToCelsius(main?.temp);
  // State
  const [localTime, setLocalTime] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const weatherBg = getWeatherBg(weatherMain);

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format("LLLL");

      setLocalTime(formattedTime);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className={`pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:shadow-slate-800 shadow-2xl text-grey-800 ${
          [
            "Drizzle",
            "Snow",
            "Clear",
            "Clouds",
            "Thunderstorm",
            "Mist",
            "Haze",
            "Smoke",
          ].includes(weatherMain)
            ? "text-white"
            : ""
        } ${weatherMain === "Rain" ? "dark:text-black" : ""}`}
      style={
        weatherBg
          ? {
              backgroundImage: `url(${weatherBg})`,
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <p className="flex justify-between items-center ">
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

      <div>
        <div>
          <span>{getIcon(weatherMain)}</span>
          <p className="pt-2 capitalize text-md font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {dailyForecasts ? dailyForecasts[0]?.minTemp : ""}°</span>
          <span>High: {dailyForecasts ? dailyForecasts[0]?.maxTemp : ""}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
