import { Task } from "@prisma/client";
import { TaskResponseDTOType } from "../dtos/task/TaskResponseDTO";

export const taskMapper = {
  toResponse(task: Task): TaskResponseDTOType {
    return {
      id: task.id,
      title: task.title,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  },
};
