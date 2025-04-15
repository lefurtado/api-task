import { FastifyInstance } from "fastify";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", getUsers);
  app.get("/user/:id", getUserById);
  app.post("/user", createUser);
  app.put("/user/:id", updateUser);
  app.delete("/user/:id", deleteUser);
}
