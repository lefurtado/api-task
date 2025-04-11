import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamsSchema,
} from "../schemas/userSchema";

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      deleted: false,
    },
    omit: {
      deleted: true,
    },
  });
  return reply.send(users);
};

export const getUserById = async (req: FastifyRequest, reply: FastifyReply) => {
  const paramsResult = userIdParamsSchema.safeParse(req.params);

  if (!paramsResult.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: paramsResult.error.format(),
    });
  }

  const id = parseInt(paramsResult.data.id);

  try {
    const result = await prisma.user.findUnique({
      where: { id, deleted: false },
    });

    if (result !== null) {
      return reply.status(200).send(result);
    } else {
      return reply.status(404).send({
        error: "Usuário não encontrado",
      });
    }
  } catch (err) {
    return reply.status(404).send({
      error: "Usuário não localizado",
    });
  }
};

export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: result.error.format(),
    });
  }

  const { name, email } = result.data;

  try {
    const hasEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (hasEmail) {
      return reply.status(400).send({
        error: "Email já utilizado por outro usuário!",
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      return reply.status(201).send(newUser);
    }
  } catch (err) {
    return reply.status(404).send({
      error: "Usuário não encontrado.",
    });
  }
};

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodyResult = updateUserSchema.safeParse(req.body);
  const paramsResult = userIdParamsSchema.safeParse(req.params);

  if (!bodyResult.success || !paramsResult.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: {
        ...(bodyResult.error?.format() || {}),
        ...(paramsResult.error?.format() || {}),
      },
    });
  }

  const id = parseInt(paramsResult.data.id);
  const { name, email } = bodyResult.data;

  try {
    const hasEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (hasEmail) {
      return reply.status(400).send({
        error: "Email já utilizado por outro usuário!",
      });
    } else {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
        },
      });

      return reply.send(updatedUser);
    }
  } catch (err) {
    return reply.status(404).send({
      error: "Usuário não encontrado",
    });
  }
};

export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const paramsResult = userIdParamsSchema.safeParse(req.params);

  if (!paramsResult.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: paramsResult.error.format(),
    });
  }

  const id = parseInt(paramsResult.data.id);

  try {
    await prisma.user.update({
      where: { id },
      data: {
        deleted: true,
      },
    });

    return reply.status(200).send("Usuário deletado com sucesso!");
  } catch (err) {
    return reply.status(404).send({
      error: "Usuário não encontrado",
    });
  }
};
