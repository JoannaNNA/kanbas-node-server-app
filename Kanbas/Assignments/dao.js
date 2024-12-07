import model from "./model.js";

export const findAllAssignments = () => model.find();

export const findAssignmentsForCourse = (courseId) => 
  model.find({ course: courseId });

export const findAssignmentById = (assignmentId) => 
  model.findById(assignmentId);

export const createAssignment = (assignment) => 
  model.create(assignment);

export const updateAssignment = (aid, assignment) => 
  model.findByIdAndUpdate(aid, assignment, { new: true });

export const deleteAssignment = (aid) => 
  model.findByIdAndDelete(aid);   