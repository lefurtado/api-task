import { z } from "zod";

export const CreateUserDTO = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
});

export type CreateUserDTOType = z.infer<typeof CreateUserDTO>;
