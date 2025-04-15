import { UpdateTaskDTOType } from "../../dtos/task/UpdateTaskDTO";
import { prisma } from "../../lib/prisma";
import { taskMapper } from "../../mappers/task.mapper";

export const UpdateTaskService = async (
  id: number,
  data: UpdateTaskDTOType
) => {
  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      title: data.title,
      done: data.done,
    },
  });

  return taskMapper.toResponse(updatedTask);
};

