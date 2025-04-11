import Fastify from "fastify";
import { taskRoutes } from "./routes/tasks";
import { userRoutes } from "./routes/users";

const app = Fastify();

app.register(taskRoutes);
app.register(userRoutes);

app.listen({ port: 3333 }, () => {
  console.log("Servidor rodando em http://localhost:3333!");
});
