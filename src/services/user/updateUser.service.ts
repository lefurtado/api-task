import { UpdateUserDTOType } from "../../dtos/user/UpdateUserDTO";
import { UserResponseDTOType } from "../../dtos/user/UserResponseDTO";

import { prisma } from "../../lib/prisma";
import { userMapper } from "../../mappers/user.mapper";

export const UpdateUserService = async (
  id: number,
  data: UpdateUserDTOType
): Promise<UserResponseDTOType> => {
  const user = await prisma.user.update({
    where: { id, deleted: false },
    data,
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return userMapper.toResponse(user);
};
