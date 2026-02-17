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
export interface ReverseGeocodeResponse {
  osm_type?: string;
  osm_id?: number;
  category?: string;
  address?: {
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state?: string;
  };
}
