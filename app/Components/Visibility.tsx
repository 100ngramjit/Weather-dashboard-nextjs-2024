"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { eye } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { getVisibilityDescription } from "../utils/misc";

function Visibility() {
  const { forecast } = useGlobalContext();
  const { visibility } = forecast;

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:shadow-slate-800 dark:hover:bg-slate-900 shadow-2xl ">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-md ">
          {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
      </div>

      <p className="text-xs">{getVisibilityDescription(visibility)}.</p>
    </div>
  );
}

export default Visibility;
