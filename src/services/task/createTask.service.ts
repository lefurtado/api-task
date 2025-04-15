import { CreateTaskDTOType } from "../../dtos/task/CreateTaskDTO";
import { TaskResponseDTOType } from "../../dtos/task/TaskResponseDTO";
import { prisma } from "../../lib/prisma";
import { taskMapper } from "../../mappers/task.mapper";

export const CreateTaskService = async (
  data: CreateTaskDTOType
): Promise<TaskResponseDTOType> => {
  const { title, userId } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId, deleted: false },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const newTask = await prisma.task.create({
    data: {
      title,
      userId: user.id,
    },
  });

  return taskMapper.toResponse(newTask);
};
