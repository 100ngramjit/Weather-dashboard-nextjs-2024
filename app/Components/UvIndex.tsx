"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { sun } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { UvProgress } from "./UvProgress";
import { uvIndexCategory } from "../utils/misc";

function UvIndex() {
  const { uvIndex } = useGlobalContext();

  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { daily } = uvIndex;
  const { uv_index_max } = daily;

  const uvIndexMax = uv_index_max[0].toFixed(0);
  const marginLeftPercentage = (uvIndexMax / 14) * 100;

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:shadow-slate-600 dark:hover:bg-slate-900 shadow-lg">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-md">
          {sun} Uv Index
        </h2>
        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl">
            {uvIndexMax}
            <span className="text-xs">
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgress
            value={marginLeftPercentage}
            max={14}
            className="progress"
          />
        </div>
      </div>

      <p className="text-xs">{uvIndexCategory(uvIndexMax).protection} </p>
    </div>
  );
}

export default UvIndex;
