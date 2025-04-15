import { FastifyInstance } from "fastify";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "../controllers/task.controller";

export async function taskRoutes(app: FastifyInstance) {
  app.get("/tasks", getTasks);
  app.get("/tasks/:id", getTaskById);
  app.post("/tasks", createTask);
  app.put("/tasks/:id", updateTask);
  app.delete("/tasks/:id", deleteTask);
}
