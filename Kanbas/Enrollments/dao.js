import Database from '../Database/index.js';
import model from './model.js';

export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate('course');
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate('user');
  return enrollments.map((enrollment) => enrollment.user);
}


export const findAllEnrollments = () => {
  return Database.enrollments;
};
export const findEnrollmentsForCourse = (courseId) => {
  return Database.enrollments.filter(
    (enrollment) => enrollment.course === courseId
  );
};
export const findEnrollmentsForUser = (userId) => {
  return Database.enrollments.filter(
    (enrollment) => enrollment.user === userId
  );
};
