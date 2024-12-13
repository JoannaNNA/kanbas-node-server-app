import * as dao from "./dao.js";

function QuizRoutes(app) {
    // 获取所有测验
    app.get("/api/quizzes", async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    });

    // 获取特定课程的测验
    app.get("/api/quizzes/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesByCourse(courseId);
        res.json(quizzes);
    });

    // 获取单个测验
    app.get("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        res.json(quiz);
    });

    // 创建新测验
    app.post("/api/quizzes", async (req, res) => {
        const newQuiz = await dao.createQuiz(req.body);
        res.json(newQuiz);
    });

    // 更新测验
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.updateQuiz(quizId, req.body);
        res.json(status);
    });

    // 删除测验
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.json(status);
    });
}

export default QuizRoutes; 