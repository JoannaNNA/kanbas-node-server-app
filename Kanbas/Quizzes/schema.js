import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    course: {
        type: String,
        ref: 'Course',
        required: true
    },
    quizType: {
        type: String,
        enum: ['GRADED_QUIZ', 'PRACTICE_QUIZ', 'GRADED_SURVEY', 'UNGRADED_SURVEY'],
        default: 'GRADED_QUIZ'
    },
    points: {
        type: Number,
        default: 0
    },
    assignmentGroup: {
        type: String,
        enum: ['QUIZZES', 'EXAMS', 'ASSIGNMENTS', 'PROJECT'],
        default: 'QUIZZES'
    },
    shuffleAnswers: {
        type: Boolean,
        default: true
    },
    timeLimit: {
        type: Number,
        default: 20
    },
    multipleAttempts: {
        type: Boolean,
        default: false
    },
    attemptsAllowed: {
        type: Number,
        default: 1
    },
    showCorrectAnswers: {
        type: Boolean,
        default: true
    },
    accessCode: {
        type: String,
        default: ''
    },
    oneQuestionAtTime: {
        type: Boolean,
        default: true
    },
    webcamRequired: {
        type: Boolean,
        default: false
    },
    lockQuestionsAfterAnswering: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    },
    availableFrom: {
        type: Date
    },
    availableUntil: {
        type: Date
    },
    editing: {
        type: Boolean,
        default: false
    }
}, { collection: 'quizzes', _id: false });

export default quizSchema; 