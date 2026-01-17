import { Schema, model } from "mongoose";

const reportSchema = new Schema(
  {
    user: {
      type: String,
      default: "community",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    severity: {
      type: String,
      enum: {
        values: ["high", "medium", "low"],
        message: "{VALUE} is not supported",
      },
      trim: true,
    },
    cloudinary_url: {
      type: String,
      required: [true, "Why no base64String"],
    },
    cloudinary_public_id: {
      type: String,
      required: [true, "Why no cloudinary_public_id"],
    },
    dateTaken: {
      type: String,
      required: [true, "Why no date"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const reportModel = model("metadata", reportSchema);
export default reportModel;
