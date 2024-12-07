import model from './model.js';
import CourseModel from '../Courses/model.js';
export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
    }
export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
        // const { modules } = Database;
        // Database.modules = modules.filter((module) => module._id !== moduleId);
    }
export function createModule(module) {
    return model.create(module);
    }
export async function findModulesForCourse(courseId) {
    const course  = await CourseModel.findById(courseId).exec();
    return model.find({ course:course}).exec();
}