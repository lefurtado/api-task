import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import {
  createTaskSchema,
  updateTaskSchema,
  idParamsSchema,
} from "../schemas/taskSchema";

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const tasks = await prisma.task.findMany();
  return reply.send(tasks);
};

export const getTasksById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const paramsResult = idParamsSchema.safeParse(req.params);

  if (!paramsResult.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: paramsResult.error.format(),
    });
  }

  const id = parseInt(paramsResult.data.id);

  try {
    const result = await prisma.task.findUnique({
      where: { id },
    });

    if (result !== null) {
      return reply.status(200).send(result);
    } else {
      return reply.status(404).send({
        error: "Tarefa não encontrada!",
      });
    }
  } catch (err) {
    return reply.status(404).send({
      error: "Tarefa não encontrada",
    });
  }
};

export const createTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: result.error.format(),
    });
  }

  const { title } = result.data;

  const newTask = await prisma.task.create({
    data: {
      title,
    },
  });

  return reply.status(201).send(newTask);
};

export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodyResult = updateTaskSchema.safeParse(req.body);
  const paramsResult = idParamsSchema.safeParse(req.params);

  if (!paramsResult.success || !bodyResult.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: {
        ...(paramsResult.error?.format() || {}),
        ...(bodyResult.error?.format() || {}),
      },
    });
  }

  const id = parseInt(paramsResult.data.id);
  const { done } = bodyResult.data;

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { done },
    });

    return reply.send(updatedTask);
  } catch (err) {
    return reply.status(404).send({
      error: "Tarefa não encontrada",
    });
  }
};

export const deleteTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const paramsResult = idParamsSchema.safeParse(req.params);

  if (!paramsResult.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: {
        ...(paramsResult.error?.format() || {}),
      },
    });
  }

  const id = parseInt(paramsResult.data.id);

  try {
    await prisma.task.delete({
      where: { id },
    });

    return reply.status(200).send("Tarefa excluída com sucesso");
  } catch (err) {
    return reply.status(404).send({
      error: "Tarefa não encontrada",
    });
  }
};
