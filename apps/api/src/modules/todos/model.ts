import { z } from "zod";

export const todoModel = {
  todo: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    completed: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  createBody: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
  updateBody: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
  }),
  params: z.object({
    id: z.uuid(),
  }),
  errorResponse: z.object({
    error: z.string(),
  }),
  deleteResponse: z.object({
    deleted: z.boolean(),
  }),
} as const;

export type TodoModel = {
  [k in keyof typeof todoModel]: z.infer<(typeof todoModel)[k]>;
};
