"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { calender } from "@/app/utils/Icons";
import {
  kelvinToCelsius,
  processDailyWeatherData,
  unixToDay,
} from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FiveDayForecast() {
  const { fiveDayForecast } = useGlobalContext();

  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list?.slice(i, i + 5);
    dailyForecasts.push(processDailyWeatherData(dailyData));
  }

  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
        justify-between dark:shadow-slate-600 dark:hover:bg-slate-900 shadow-lg"
    >
      <div>
        <h2 className="flex items-center gap-2 font-medium text-md ">
          {calender} 5-Day Forecast for {city.name}
        </h2>

        <div className="forecast-list pt-3">
          {dailyForecasts.map((day, i) => {
            return (
              <div
                key={i}
                className="daily-forevast py-4 flex flex-col justify-evenly border-b-2"
              >
                <p className="text-md min-w-[3.5rem]">{day.day}</p>
                <p className="text-xs flex justify-between">
                  <span>(low)</span>
                  <span>(high)</span>
                </p>

                <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="font-bold">{day.minTemp}°C</p>
                  <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                  <p className="font-bold">{day.maxTemp}°C</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FiveDayForecast;
