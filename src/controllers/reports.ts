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
