import { prisma } from "../../lib/prisma";
import { UserResponseDTOType } from "../../dtos/user/UserResponseDTO";
import { userMapper } from "../../mappers/user.mapper";

export const DeleteUserService = async (
  id: number
): Promise<UserResponseDTOType> => {
  const user = await prisma.user.update({
    where: { id },
    data: { deleted: true },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return userMapper.toResponse(user);
};
