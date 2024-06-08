"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { people } from "@/app/utils/Icons";
import { formatNumber } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;

  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] overflow-auto border rounded-lg flex flex-col justify-between dark:shadow-slate-800 dark:hover:bg-slate-900 shadow-2xl">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-md ">
          {people} Population
        </h2>
        <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
      </div>
      <p className="text-xs">Latest UN population data for {city.name}.</p>
    </div>
  );
}

export default Population;
