"use client";
import moment from "moment";

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
    day: unixToDay(dailyData[0].dt),
    minTemp: kelvinToCelsius(minTemp),
    maxTemp: kelvinToCelsius(maxTemp),
  };
};
