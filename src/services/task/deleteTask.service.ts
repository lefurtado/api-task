import { prisma } from "../../lib/prisma";

export const DeleteTaskService = async (id: number): Promise<void> => {
  await prisma.task.delete({
    where: { id },
  });
};
