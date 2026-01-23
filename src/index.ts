import express from "express";
import { config } from "dotenv";
import connectDb from "./server/connectDb.ts";
import reportRoute from "./routes/reportRoute.ts";
import { initializeCloudinaryConfig } from "./server/connectImageBucket.ts";

const app = express();
const PORT = process.env.PORT || 3000;

config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
