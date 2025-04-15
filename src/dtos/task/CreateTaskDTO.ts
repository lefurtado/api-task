import { z } from "zod";

export const CreateTaskDTO = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  userId: z.number().int().positive("Usuário inválido"),
});

export type CreateTaskDTOType = z.infer<typeof CreateTaskDTO>;
