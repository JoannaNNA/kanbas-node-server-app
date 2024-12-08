import model from "./model.js";
import mongoose from "mongoose";

export const findAllAssignments = () => model.find();

export const findAssignmentsForCourse = (courseId) => 
  model.find({ course: new mongoose.Types.ObjectId(courseId) });

export const findAssignmentById = (assignmentId) => 
  model.findById(assignmentId);

export const createAssignment = async (assignment) => {
  try {
    console.log("DAO: Creating assignment with data:", assignment);
    
    // 移除空的 _id
    const { _id, ...assignmentData } = assignment;
    
    const processedAssignment = {
      ...assignmentData,
      course: new mongoose.Types.ObjectId(assignmentData.course),
      start_date: assignmentData.start_date ? new Date(assignmentData.start_date) : undefined,
      due_date: assignmentData.due_date ? new Date(assignmentData.due_date) : undefined,
      end_date: assignmentData.end_date ? new Date(assignmentData.end_date) : undefined,
      title: assignmentData.title || "New Assignment",
      points: assignmentData.points || 100
    };
    
    console.log("DAO: Processed assignment data:", processedAssignment);
    const created = await model.create(processedAssignment);
    console.log("DAO: Successfully created assignment:", created);
    return created;
  } catch (error) {
    console.error("DAO Error Details:", {
      message: error.message,
      stack: error.stack,
      data: assignment
    });
    throw error;
  }
};

export const updateAssignment = (aid, assignment) => {
  const { _id, ...updateData } = assignment;
  return model.findByIdAndUpdate(aid, updateData, { new: true });
};

export const deleteAssignment = (aid) => 
  model.findByIdAndDelete(aid);   