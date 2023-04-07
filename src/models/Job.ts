import mongoose, { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    salary: { type: Number, required: true },
    experience: { type: String, required: true },
    workingModel: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export const JobModel = model("Job", jobSchema);
