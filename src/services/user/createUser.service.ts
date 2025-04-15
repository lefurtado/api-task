import { CreateUserDTOType } from "../../dtos/user/CreateUserDTO";
import { UserResponseDTOType } from "../../dtos/user/UserResponseDTO";
import { prisma } from "../../lib/prisma";
import { userMapper } from "../../mappers/user.mapper";

export const CreateUserService = async (
  data: CreateUserDTOType
): Promise<UserResponseDTOType> => {
  const { name, email } = data;

  const exists = await prisma.user.findUnique({ where: { email } });

  if (exists) {
    throw new Error("Usuário já existe");
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return userMapper.toResponse(newUser);
};
