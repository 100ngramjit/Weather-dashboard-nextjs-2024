"use client";
import React, { useEffect, useState } from "react";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { commandIcon } from "@/app/utils/Icons";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandInput } from "@/components/ui/command";

function SearchDialog() {
  const [open, setOpen] = useState(false);
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <Button
        variant="outline"
        className="border inline-flex items-center min-w-[2rem] justify-center text-xs font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200  dark:shadow-slate-800 shadow-md"
        onClick={() => setOpen(true)}
      >
        <p className="text-xs text-muted-foreground">Search City</p>
        <div className="command dark:bg-[#262626] bg-slate-200 rounded-sm ml-[10rem] flex items-center gap-2">
          {commandIcon}
          <span className="text-[15px]">S</span>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={inputValue}
          onChangeCapture={handleInput}
          placeholder="Type a city to search..."
        />
        <ul className="px-3 pb-2">
          <p className="p-2 text-xs text-muted-foreground">Suggestions</p>

          {geoCodedList?.length === 0 || (!geoCodedList && <p>No Results</p>)}

          {geoCodedList &&
            geoCodedList.map(
              (
                item: {
                  name: string;
                  country: string;
                  state: string;
                  lat: number;
                  lon: number;
                },
                index: number
              ) => {
                const { country, state, name } = item;
                return (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`py-3 px-2 text-xs  rounded-sm cursor-default
                        ${hoveredIndex === index ? "bg-accent" : ""}
                      `}
                    onClick={() => {
                      getClickedCoords(item.lat, item.lon);
                      setOpen(false);
                    }}
                  >
                    <p className=" text">
                      {name}, {state && state + ","} {country}
                    </p>
                  </li>
                );
              }
            )}
        </ul>
      </CommandDialog>
    </>
  );
}

export default SearchDialog;
