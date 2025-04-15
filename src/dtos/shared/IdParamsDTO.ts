import { z } from "zod";

export const IdParamsDTO = z.object({
  id: z.string().regex(/^\d+$/, "ID deve ser um número"),
});

export type IdParamsDTOType = z.infer<typeof IdParamsDTO>;
