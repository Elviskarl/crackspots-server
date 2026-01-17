import { Router } from "express";
import { getAllReports } from "../controllers/reports.ts";

const route = Router();

route.get("/", getAllReports);

export default route;