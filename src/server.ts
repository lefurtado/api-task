import Fastify from "fastify";
import { taskRoutes } from "./routes/tasks";

const app = Fastify();

app.register(taskRoutes);

app.listen({ port: 3333 }, () => {
  console.log("Servidor rodando em http://localhost:3333!");
});
