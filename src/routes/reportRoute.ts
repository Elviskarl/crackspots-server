import { Router } from "express";
import { getAllReports } from "../controllers/reports.ts";

const route = Router();

route.get("/reports", getAllReports);

export default route;
