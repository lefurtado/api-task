import { z } from "zod";

export const TaskResponseDTO = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number().optional(),
});

export type TaskResponseDTOType = z.infer<typeof TaskResponseDTO>;
