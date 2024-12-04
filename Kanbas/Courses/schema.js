import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: String,
    credits: Number,
    description: String,
    image: String,
    startDate: Date,
    endDate: Date,
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { collection: "courses" }
);
export default courseSchema;