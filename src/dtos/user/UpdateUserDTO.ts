import { z } from "zod";

export const UpdateUserDTO = z.object({
  name: z.string().optional(),
  email: z.string().email("E-mail inválido").optional(),
});

export type UpdateUserDTOType = z.infer<typeof UpdateUserDTO>;
