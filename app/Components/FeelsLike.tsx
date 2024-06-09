"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermometer } from "@/app/utils/Icons";
import { feelsLikeText, kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:shadow-slate-800 dark:hover:bg-slate-900 shadow-2xl ">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-md ">
          {thermometer} Feels Like
        </h2>
        <p className="pt-2 text-2xl">{kelvinToCelsius(feels_like)}°</p>
      </div>

      <p className="text-xs">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
