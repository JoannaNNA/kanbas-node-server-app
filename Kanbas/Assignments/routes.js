import * as dao from "./dao.js";
import mongoose from "mongoose";

function AssignmentRoutes(app) {
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    try {
      const { cid } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(400).json({ error: "Invalid course ID format" });
      }

      const newAssignment = {
        ...req.body,
        course: cid
      };
      
      console.log("Routes: Attempting to create assignment:", newAssignment);
      
      const assignment = await dao.createAssignment(newAssignment);
      res.json(assignment);
    } catch (error) {
      console.error("Routes Error Details:", {
        message: error.message,
        stack: error.stack,
        body: req.body,
        params: req.params
      });
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          error: "Validation Error", 
          details: error.message 
        });
      }
      
      res.status(500).json({ 
        error: "Server error", 
        details: error.message 
      });
    }
  });

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    try {
      const { cid } = req.params;
      const assignments = await dao.findAssignmentsForCourse(cid);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    try {
      const { aid } = req.params;
      const status = await dao.deleteAssignment(aid);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    try {
      const { aid } = req.params;
      const status = await dao.updateAssignment(aid, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

export default AssignmentRoutes;
