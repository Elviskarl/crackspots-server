import { Router } from "express";
import { getAllReports, createReport } from "../controllers/reports.ts";
import upload from "../middleware/handleFormData.ts";

const route = Router();

route
  .route("/reports")
  .get(getAllReports)
  .post(upload.single("file"), createReport);
export default route;
