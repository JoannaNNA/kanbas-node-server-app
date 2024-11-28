import db from "../Database/assignments.js";
let assignments = db;

export const findAllAssignments = () => assignments;

export const findAssignmentsForCourse = (courseId) => {
  return assignments.filter((assignment) => assignment.course === courseId);
};

export const findAssignmentById = (assignmentId) => {
  return assignments.find((assignment) => assignment._id === assignmentId);
};

export const createAssignment = (assignment) => {
  const newAssignment = { ...assignment, _id: new Date().getTime().toString() };
  assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = (aid, assignment) => {
  const updatedAssignment = { ...assignment, _id: aid };
  assignments = assignments.map((a) =>
    a._id === aid ? updatedAssignment : a
  );
  return updatedAssignment;
};

export const deleteAssignment = (aid) => {
  assignments = assignments.filter((a) => a._id !== aid);
  return { status: "OK" };
};   