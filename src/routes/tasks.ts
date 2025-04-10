import { FastifyInstance } from "fastify";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksById,
} from "../controllers/taskController";

export async function taskRoutes(app: FastifyInstance) {
  app.get("/tasks", getTasks);
  app.get("/tasks/:id", getTasksById);
  app.post("/tasks", createTask);
  app.put("/tasks/:id", updateTask);
  app.delete("/tasks/:id", deleteTask);
}
