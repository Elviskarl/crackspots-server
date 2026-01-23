export interface coordinates {
  DateTimeOriginal: string;
  GPSLatitude: number;
  GPSLongitude: number;
  GPSLatitudeRef: string;
  GPSLongitudeRef: string;
}
export interface Report {
  coordinates: coordinates;
  severity: "high" | "medium" | "low";
}
