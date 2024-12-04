import * as modulesDao from "./dao.js";

const findModulesForCourse = async (req, res) => {
  const { courseId } = req.params;
  const modules = await modulesDao.findModulesForCourse(courseId);
  res.json(modules);
};

export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  }); 

  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });

  app.get("/api/courses/:courseId/modules", findModulesForCourse);

  
}