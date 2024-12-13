import quizModel from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createQuiz = (quiz) => {
    const newQuiz = {
        ...quiz,
        _id: uuidv4()
    };
    return quizModel.create(newQuiz);
};

export const findAllQuizzes = () => quizModel.find();
export const findQuizById = (quizId) => quizModel.findById(quizId);
export const findQuizzesByCourse = (courseId) => quizModel.find({ course: courseId });
export const updateQuiz = (quizId, quiz) => quizModel.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => quizModel.deleteOne({ _id: quizId }); 

