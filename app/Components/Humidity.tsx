"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { getHumidityText } from "../utils/misc";

function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = forecast?.main;

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:shadow-slate-600 dark:hover:bg-slate-900 shadow-lg">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-md ">
          {droplets} Humidity
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>

      <p className="text-xs">{getHumidityText(humidity)}.</p>
    </div>
  );
}

export default Humidity;
