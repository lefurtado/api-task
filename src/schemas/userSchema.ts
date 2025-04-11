import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("E-mail inválido").optional(),
});

export const userIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID deve ser um número"),
});
