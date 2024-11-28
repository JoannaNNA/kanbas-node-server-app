import * as dao from "./dao.js";

function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
    };
    const assignment = dao.createAssignment(newAssignment);
    res.json(assignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const status = dao.deleteAssignment(aid);
    res.json(status);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const updatedAssignment = dao.updateAssignment(aid, req.body);
    res.json(updatedAssignment);
  });
}

export default AssignmentRoutes;
