import express from "express";
import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors";
import expressRateLimit from "express-rate-limit";

config();

import connectDb from "./server/connectDb.ts";
import reportRoute from "./routes/reportRoute.ts";
import { initializeCloudinaryConfig } from "./server/connectImageBucket.ts";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/api/v1", reportRoute);

app.listen(PORT, async () => {
  try {
    await connectDb(process.env.MONGO_DB_URI as string);
    console.log(`Server is running on port ${PORT}`);
    initializeCloudinaryConfig();
    console.log("Cloudinary configured successfully");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
});
