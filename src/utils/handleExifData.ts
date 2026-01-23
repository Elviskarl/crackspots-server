import type { Coordinates } from "../types/index.ts";

export function handleExifData(param: string) {
  const data = JSON.parse(param) as Coordinates;
  const { DateTimeOriginal, GPSLatitude: lat, GPSLongitude: long } = data;

  // Convert "YYYY:MM:DD HH:MM:SS"[EXif Date] →[to] "YYYY-MM-DD HH:MM:SS"
  const configuredDate = DateTimeOriginal.replace(
    /^(\d{4}):(\d{2}):(\d{2})/,
    "$1-$2-$3",
  );

  const date = new Date(configuredDate);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format in EXIF data");
  }

  const newDate = date
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/,/g, "");
  return {
    lat,
    long,
    dateTaken: newDate,
  };
}
