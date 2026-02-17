import type { ReverseGeocodeResponse } from "../types/index.ts";

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<ReverseGeocodeResponse> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&addressdetails=1`;
  try {
    const request = new Request(url, {
      method: "GET",
      headers: {
        "user-agent": "crack-spots-app",
      },
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as ReverseGeocodeResponse;
  } catch (error) {
    console.error("Error fetching reverse geocode data:", error);
    throw error;
  }
}
