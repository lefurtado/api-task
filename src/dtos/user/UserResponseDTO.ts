import { z } from "zod";

export const UserResponseDTO = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponseDTOType = z.infer<typeof UserResponseDTO>;
