import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: {type: String, required: true },
    description: String,
    points: { type: Number, default: 100 },
    start_date: Date,
    due_date: Date,
    end_date: Date,
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "CourseModel",
      required: true 
    }
  },
  { collection: "assignments" }
);
export default assignmentSchema;
