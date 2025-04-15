import { prisma } from "../../lib/prisma";
import { userMapper } from "../../mappers/user.mapper";
import { UserResponseDTOType } from "../../dtos/user/UserResponseDTO";

export const GetUsersService = async (): Promise<UserResponseDTOType[]> => {
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      deleted: false,
    },
  });

  return users.map((user) => userMapper.toResponse(user));
};
