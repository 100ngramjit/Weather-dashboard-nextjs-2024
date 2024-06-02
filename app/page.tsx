"use client";
import AirPollution from "./Components/AirPollution";
import DailyForecast from "./Components/DailyForecast";
import FeelsLike from "./Components/FeelsLike";
import Humidity from "./Components/Humidity";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population";
import Pressure from "./Components/Pressure";
import Sunset from "./Components/Sunset";
import Temperature from "./Components/Temperature";
import UvIndex from "./Components/UvIndex";
import Visibility from "./Components/Visibility";
import Wind from "./Components/Wind";
import defaultStates from "./utils/defaultStates";
import FiveDayForecast from "./Components/FiveDayForecast";
import { useGlobalContextUpdate } from "./context/globalContext";
import dynamic from "next/dynamic";

const Mapbox = dynamic(() => import("./Components/Mapbox"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});
export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto ">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row bg-none	">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <DailyForecast />
            <Humidity />

            <FeelsLike />

            <AirPollution />
            <Pressure />

            <UvIndex />
            <Wind />
            <Sunset />

            <Visibility />
            <Population />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates?.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:shadow-slate-800 dark:hover:bg-slate-900 shadow-2xl "
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 flex justify-center pb-8"></footer>
    </main>
  );
}
