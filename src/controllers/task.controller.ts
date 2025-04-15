import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { TaskResponseDTO } from "../dtos/task/TaskResponseDTO";
import { IdParamsDTO } from "../dtos/shared/IdParamsDTO";
import { CreateTaskDTO } from "../dtos/task/CreateTaskDTO";
import { UpdateTaskDTO } from "../dtos/task/UpdateTaskDTO";
import { CreateTaskService } from "../services/task/createTask.service";
import { GetTaskService } from "../services/task/getTask.service";
import { UpdateTaskService } from "../services/task/updateTask.service";
import { DeleteTaskService } from "../services/task/deleteTask.service";

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const tasks = await prisma.task.findMany();
    const result = tasks.map((task) => TaskResponseDTO.parse(task));
    return reply.status(200).send(result);
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
