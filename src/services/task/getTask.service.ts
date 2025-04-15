import { prisma } from "../../lib/prisma";
import { TaskResponseDTOType } from "../../dtos/task/TaskResponseDTO";
import { taskMapper } from "../../mappers/task.mapper";

export const GetTaskService = async (
  id: number
): Promise<TaskResponseDTOType> => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new Error("Tarefa não encontrada");
  }

  return taskMapper.toResponse(task);
};
