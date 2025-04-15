import { z } from "zod";

export const TaskQueryDTO = z.object({
  userId: z.string().regex(/^\d+$/, "userId deve ser um número").optional(),
});

export type TaskQueryDTOType = z.infer<typeof TaskQueryDTO>;
