import * as modulesDao from "./dao.js";

const findModulesForCourse = async (req, res) => {
  const { courseId } = req.params;
  const modules = await modulesDao.findModulesForCourse(courseId);
  res.json(modules);
};

export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    modulesDao.deleteModule(moduleId);
    res.sendStatus(204);
  }); 

  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    modulesDao.updateModule(moduleId, moduleUpdates);
    res.sendStatus(204); 
  });

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
}