export interface Coordinates {
  DateTimeOriginal: string;
  GPSLatitude: number;
  GPSLongitude: number;
  GPSLatitudeRef: string;
  GPSLongitudeRef: string;
}
export interface Report {
  coordinates: string;
  severity: "high" | "medium" | "low";
}
