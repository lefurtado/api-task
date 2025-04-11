import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  userId: z.number(),
});

export const updateTaskSchema = z.object({
  done: z.boolean(),
});

export const idParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID deve ser um número"),
});
