import { FastifyRequest, FastifyReply } from "fastify";
import { IdParamsDTO } from "../dtos/shared/IdParamsDTO";
import { CreateTaskDTO } from "../dtos/task/CreateTaskDTO";
import { UpdateTaskDTO } from "../dtos/task/UpdateTaskDTO";
import { CreateTaskService } from "../services/task/createTask.service";
import { GetTaskService } from "../services/task/getTask.service";
import { UpdateTaskService } from "../services/task/updateTask.service";
import { DeleteTaskService } from "../services/task/deleteTask.service";
import { GetTasksByUser } from "../services/task/getTasksByUser.service";
import { TaskQueryDTO } from "../dtos/task/TaskQueryDTO";

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const parsedQuery = TaskQueryDTO.safeParse(req.query);

    if (!parsedQuery.success) {
      return reply.status(400).send({
        error: "Erro de validação",
        issues: parsedQuery.error.format(),
      });
    }

    const userId = parsedQuery.data.userId
      ? parseInt(parsedQuery.data.userId)
      : undefined;

    if (!userId) {
      return reply.status(400).send({
        error: "O parâmetro userId é obrigatório",
      });
    }

    const tasks = await GetTasksByUser(userId);

    return reply.status(200).send(tasks);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao buscar tarefas",
    });
  }
};

export const getTaskById = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedParams = IdParamsDTO.safeParse(req.params);

  if (!parsedParams.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: parsedParams.error.format(),
    });
  }

  const id = parseInt(parsedParams.data.id);

  const task = await GetTaskService(id);

  try {
    return reply.status(200).send(task);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao buscar tarefa",
    });
  }
};

export const createTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedBody = CreateTaskDTO.safeParse(req.body);

  if (!parsedBody.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: parsedBody.error.format(),
    });
  }

  try {
    const newTask = await CreateTaskService(parsedBody.data);

    return reply.status(201).send(newTask);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao criar tarefa",
    });
  }
};

export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedBody = UpdateTaskDTO.safeParse(req.body);
  const parsedParams = IdParamsDTO.safeParse(req.params);

  if (!parsedParams.success || !parsedBody.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: {
        ...(parsedParams.error?.format() || {}),
        ...(parsedBody.error?.format() || {}),
      },
    });
  }

  const id = parseInt(parsedParams.data.id);

  try {
    const updatedTask = await UpdateTaskService(id, parsedBody.data);

    return reply.status(200).send(updatedTask);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao atualizar tarefa",
    });
  }
};

export const deleteTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedParams = IdParamsDTO.safeParse(req.params);

  if (!parsedParams.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: {
        ...(parsedParams.error?.format() || {}),
      },
    });
  }

  const id = parseInt(parsedParams.data.id);

  try {
    await DeleteTaskService(id);

    return reply.status(200).send("Tarefa excluída com sucesso");
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao excluir tarefa",
    });
  }
};

export const getTasksByUser = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const parsedParams = IdParamsDTO.safeParse(req.params);

    if (!parsedParams.success) {
      return reply.status(400).send({
        error: "Erro de validação",
        issues: parsedParams.error.format(),
      });
    }

    const userId = parseInt(parsedParams.data.id);

    const tasks = await GetTasksByUser(userId);

    return reply.status(200).send(tasks);
  } catch (err) {
    return reply.status(500).send({
      error:
        err instanceof Error
          ? err.message
          : "Erro ao buscar tarefas com os parametros fornecidos",
    });
  }
};
