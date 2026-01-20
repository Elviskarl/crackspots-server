import type { Request, Response } from "express";
import reportModel from "../model/reportSchema.ts";

export async function getAllReports(req: Request, res: Response) {
  try {
    const reports = await reportModel.find({});
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error(error);
  }
}

export async function createReport(req: Request, res: Response) {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }
    return res.json({ success: true, message: "Report received" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating report" });
  }
}
