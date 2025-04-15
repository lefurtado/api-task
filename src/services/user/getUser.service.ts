import { prisma } from "../../lib/prisma";
import { userMapper } from "../../mappers/user.mapper";
import { UserResponseDTOType } from "../../dtos/user/UserResponseDTO";

export const GetUserService = async (
  id: number
): Promise<UserResponseDTOType> => {
  const user = await prisma.user.findUnique({
    where: { id, deleted: false },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return userMapper.toResponse(user);
};
