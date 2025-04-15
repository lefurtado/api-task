import { TaskResponseDTOType } from "../../dtos/task/TaskResponseDTO";
import { prisma } from "../../lib/prisma";
import { taskMapper } from "../../mappers/task.mapper";

export const GetTasksByUser = async (
  userId: number
): Promise<TaskResponseDTOType[]> => {
  const tasks = await prisma.task.findMany({
    where: { userId },
  });

  if (tasks.length === 0) {
    throw new Error("Não existem tarefas para o usuário selecionado");
  }

  return tasks.map(taskMapper.toResponse);
};
