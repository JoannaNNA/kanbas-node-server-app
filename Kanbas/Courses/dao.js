// import Database from "../Database/index.js";
import model from "./model.js";
import * as enrollmentsDao from '../Enrollments/dao.js';
export function findAllCourses() {
  // return Database.courses;
  return model.find({});
}
export async function findCoursesForEnrolledUser(userId) {
  try {
    const enrollments = await enrollmentsDao.findEnrollmentsByUser(userId);
    const courseIds = enrollments.map(enrollment => enrollment.course);
    const enrolledCourses = await model.find({ _id: { $in: courseIds }});
    return enrolledCourses;
  } catch (error) {
    console.error("Error finding courses for user:", error);
    return [];
  }
}
export function createCourse(course) {
  delete course._id;
  return model.create(course);
  // const newCourse = { ...course, _id: Date.now().toString() };
  // Database.courses = [...Database.courses, newCourse];
  // return newCourse;
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}
// const { courses, enrollments } = Database;
// Database.courses = courses.filter((course) => course._id !== courseId);
// Database.enrollments = enrollments.filter(
//   (enrollment) => enrollment.course !== courseId
// );
export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  // const { courses } = Database;
  // const course = courses.find((course) => course._id === courseId);
  // Object.assign(course, courseUpdates);
  // return course;
}
  