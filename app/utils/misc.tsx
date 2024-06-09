"use client";
import moment from "moment";
import {
  drizzleIcon,
  rain,
  haze,
  smoke,
  thunder,
  mist,
  snow,
  clearSky,
  dust,
  cloudy,
} from "./Icons";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

export const airQulaityIndexText = [
  {
    rating: 10,
    description: "excellent",
  },
  {
    rating: 20,
    description: "good",
  },
  {
    rating: 30,
    description: "satisfactory",
  },
  {
    rating: 40,
    description: "fair",
  },
  {
    rating: 50,
    description: "moderate",
  },
  {
    rating: 60,
    description: "moderate",
  },
  {
    rating: 70,
    description: "poor",
  },
  {
    rating: 80,
    description: "poor",
  },
  {
    rating: 90,
    description: "very poor",
  },
  {
    rating: 100,
    description: "very poor",
  },
];

export const processDailyWeatherData = (
  dailyData: {
    main: { temp_min: number; temp_max: number };
    dt: number;
  }[]
) => {
  let minTemp = Number.MAX_VALUE;
  let maxTemp = Number.MIN_VALUE;

  dailyData?.forEach(
    (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
      if (day.main.temp_min < minTemp) {
        minTemp = day.main.temp_min;
      }
      if (day.main.temp_max > maxTemp) {
        maxTemp = day.main.temp_max;
      }
    }
  );

  return {
    day: unixToDay(dailyData && dailyData[0].dt),
    minTemp: kelvinToCelsius(minTemp),
    maxTemp: kelvinToCelsius(maxTemp),
  };
};

export const getWeatherBg = (weather: string) => {
  switch (weather) {
    case "Dust":
      return "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZtNmE3NzV4b2plMGdqZXA2d2tmejcwdnNvbmc4bTNrMHV5ZG1nYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/elV7dTuWPRigd62Oe4/giphy.gif";
    case "Smoke":
      return "https://j.gifs.com/9QR6qz.gif";
    case "Mist":
      return "https://64.media.tumblr.com/41df0017b396abc60d77d1ff10150117/f68ba84efc246391-8c/s500x750/93e1a93b3d27f0e4b7d7a4bff1be8aafdcba832b.gif";
    case "Haze":
      return "https://media.baamboozle.com/uploads/images/109784/1604358728_872643";
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

export const getIcon = (weather: string) => {
  switch (weather) {
    case "Drizzle":
      return drizzleIcon;
    case "Rain":
      return rain;
    case "Haze":
      return haze;
    case "Smoke":
      return smoke;
    case "Thunderstorm":
      return thunder;
    case "Mist":
      return mist;
    case "Snow":
      return snow;
    case "Clear":
      return clearSky;
    case "Dust":
      return dust;
    case "Clouds":
      return cloudy;
    default:
      return clearSky;
  }
};
