import { prisma } from "../../lib/prisma";
import { TaskResponseDTOType } from "../../dtos/task/TaskResponseDTO";
import { taskMapper } from "../../mappers/task.mapper";

export const GetTasksService = async (): Promise<TaskResponseDTOType[]> => {
  const tasks = await prisma.task.findMany();

  return tasks.map((task) => taskMapper.toResponse(task));
};
