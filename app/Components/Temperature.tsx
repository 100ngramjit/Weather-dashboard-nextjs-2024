"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";

function Temperature() {
  const { forecast } = useGlobalContext();
  const { fiveDayForecast } = useGlobalContext();

  const { list } = fiveDayForecast;

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(list[0]?.main?.temp_min);
  const maxTemp = kelvinToCelsius(list[0]?.main?.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  const getWeatherBg = () => {
    switch (weatherMain) {
      case "Dust":
        return "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZtNmE3NzV4b2plMGdqZXA2d2tmejcwdnNvbmc4bTNrMHV5ZG1nYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/elV7dTuWPRigd62Oe4/giphy.gif";
      case "Smoke":
        return "https://j.gifs.com/9QR6qz.gif";
      case "Mist":
        return "https://64.media.tumblr.com/41df0017b396abc60d77d1ff10150117/f68ba84efc246391-8c/s500x750/93e1a93b3d27f0e4b7d7a4bff1be8aafdcba832b.gif";
      case "Haze":
        return "https://64.media.tumblr.com/67e215ad5200bd6fa5fd66684be4b089/8893455ed3956dea-51/s250x400/2523763b816a1917c1533f41a729c073b3c2534f.gif";
      case "Thunderstorm":
        return "https://64.media.tumblr.com/a143f71cf31c64c84e4d8d301533df02/a595483d4753ef40-14/s250x400/ed1de81514e058da31de7dfdb8c4cec62e0c481c.gif";
      case "Drizzle":
        return "https://64.media.tumblr.com/530a463537556e669f1adc41cd7fa879/ef0696a53c543835-60/s500x750/e237d9d38d5a24370fc5eecfb595c6ffa55530e8.gif";
      case "Rain":
        return "https://64.media.tumblr.com/95dc14a266648e8578d8d1974bc8bba3/9275027726aa8e85-39/s500x750/c681e3e61a3a5e7ab7369b9b1e28f82e6963243e.gif";
      case "Snow":
        return "https://64.media.tumblr.com/9b291c82c481d18aa59f4bed862649f5/98ac2ba91feea365-c2/s640x960/47a10ab153379164221418eed8d2f382af68305b.gif";
      case "Clear":
        return "https://64.media.tumblr.com/091e944e6e108bc0288943a91446f772/9be108972fd8c6dc-02/s500x750/d1843c36fb34233ca53f308e9a0790a2566bf819.gif";
      case "Clouds":
        return "https://64.media.tumblr.com/f76841b92642860a49b6325a326c37a8/f442cbc940c9ec0f-06/s500x750/c3fef024a762b82e4f34c530c4e03af5f7ce1f42.gif";
      default:
        return "";
    }
  };
  const weatherBg = getWeatherBg();

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
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-md font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>High: {maxTemp}°</span>
          <span>Low: {minTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
