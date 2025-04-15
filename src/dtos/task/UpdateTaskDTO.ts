import { z } from "zod";

export const UpdateTaskDTO = z.object({
  title: z.string().optional(),
  done: z.boolean().optional(),
});

export type UpdateTaskDTOType = z.infer<typeof UpdateTaskDTO>;
