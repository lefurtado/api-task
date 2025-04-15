import { User } from "@prisma/client";
import { UserResponseDTOType } from "../dtos/user/UserResponseDTO";

export const userMapper = {
  toResponse(user: User): UserResponseDTOType {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
