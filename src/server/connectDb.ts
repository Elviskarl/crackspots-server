import mongoose from "mongoose";

export default async function connectDb(param: string) {
  try {
    await mongoose.connect(param);
    console.log("connected to MongoDb");
  } catch (error) {
    console.error(error);
  }
}
