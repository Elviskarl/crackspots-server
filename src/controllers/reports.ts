import type { Request, Response } from "express";
import reportModel from "../model/reportSchema.ts";
import { connectImageBucket } from "../server/connectImageBucket.ts";
import { wrapBuffer } from "../middleware/wrapBuffer.ts";
import type { Report } from "../types/index.ts";
import { handleExifData } from "../utils/handleExifData.ts";
import { reverseGeocode } from "../utils/reverseGeocode.ts";

export async function getAllReports(req: Request, res: Response) {
  try {
    const reports = await reportModel.find({});
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error(error);
  }
}

export async function createReport(
  req: Request<{}, {}, Report>,
  res: Response,
) {
  try {
    // Validate request
    if (!req.is("multipart/form-data")) {
      return res.status(415).json({
        error: "Expected multipart/form-data",
      });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    if (!req.body.coordinates || !req.body.severity) {
      return res.status(422).json({ error: "Missing required fields" });
    }

    // Process and upload image to Cloudinary
    const stream = wrapBuffer(req.file.buffer);
    const uploadResult = await connectImageBucket(stream, req.body.severity);

    // Save report to database
    const { lat, long, dateTaken } = handleExifData(req.body.coordinates);

    // Extract reverse geocode data
    const reverseGeocodeResult = await reverseGeocode(lat, long);
    const { category, address } = reverseGeocodeResult;
    if (!category || !address) {
      return res
        .status(422)
        .json({ error: "Unable to determine location category or address" });
    }

    await reportModel.create({
      location: {
        type: "Point",
        coordinates: [long, lat],
        category,
        address: {
          road: address.road || "",
          neighbourhood: address.neighbourhood || "",
          city: address.city || "",
          state: address.state || "",
        },
      },
      severity: req.body.severity,
      cloudinary_url: uploadResult.secure_url,
      cloudinary_public_id: uploadResult.public_id,
      dateTaken,
    });
    return res.json({ success: true, message: "Report successfully created" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating report" });
  }
}
