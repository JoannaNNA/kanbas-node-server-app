import Database from "../Database/index.js";

export const findAllEnrollments = () => {
  return Database.enrollments;
};

export const findEnrollmentsForCourse = (courseId) => {
  return Database.enrollments.filter((enrollment) => enrollment.course === courseId);
};

export const findEnrollmentsForUser = (userId) => {
  return Database.enrollments.filter((enrollment) => enrollment.user === userId);
};

export const enrollUserInCourse = (userId, courseId) => {
  // 检查是否已经注册
  const enrollment = Database.enrollments.find(
    (e) => e.user === userId && e.course === courseId
  );
  if (!enrollment) {
    const newEnrollment = {
      _id: new Date().getTime().toString(),
      user: userId,
      course: courseId
    };
    Database.enrollments.push(newEnrollment);
  }
}
