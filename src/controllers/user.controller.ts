import { FastifyRequest, FastifyReply } from "fastify";
import { IdParamsDTO } from "../dtos/shared/IdParamsDTO";
import { CreateUserDTO } from "../dtos/user/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/user/UpdateUserDTO";
import { CreateUserService } from "../services/user/createUser.service";
import { GetUsersService } from "../services/user/getUsers.service";
import { GetUserService } from "../services/user/getUser.service";
import { UpdateUserService } from "../services/user/updateUser.service";
import { DeleteUserService } from "../services/user/deleteUser.service";

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await GetUsersService();

    return reply.status(200).send(users);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao buscar usuários",
    });
  }
};

export const getUserById = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedParams = IdParamsDTO.safeParse(req.params);

  if (!parsedParams.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: parsedParams.error.format(),
    });
  }

  const id = parseInt(parsedParams.data.id);

  try {
    const user = await GetUserService(id);

    return reply.status(200).send(user);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao buscar usuário",
    });
  }
};

export const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedBody = CreateUserDTO.safeParse(req.body);

  if (!parsedBody.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: parsedBody.error.format(),
    });
  }

  try {
    const user = await CreateUserService(parsedBody.data);

    return reply.status(201).send(user);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao criar usuário",
    });
  }
};

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedParams = IdParamsDTO.safeParse(req.params);
  const parsedBody = UpdateUserDTO.safeParse(req.body);

  if (!parsedBody.success || !parsedParams.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: {
        ...(parsedBody.error?.format() || {}),
        ...(parsedParams.error?.format() || {}),
      },
    });
  }

  const id = parseInt(parsedParams.data.id);

  try {
    const updatedUser = await UpdateUserService(id, parsedBody.data);

    return reply.status(200).send(updatedUser);
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao atualizar usuário",
    });
  }
};

export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const parsedParams = IdParamsDTO.safeParse(req.params);

  if (!parsedParams.success) {
    return reply.status(400).send({
      error: "Erro de validação",
      issues: parsedParams.error.format(),
    });
  }

  const id = parseInt(parsedParams.data.id);

  try {
    await DeleteUserService(id);

    return reply.status(200).send("Usuário deletado com sucesso!");
  } catch (err) {
    return reply.status(500).send({
      error: err instanceof Error ? err.message : "Erro ao deletar usuário",
    });
  }
};
