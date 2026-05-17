import { t, UnwrapSchema } from "elysia";

export const todoModel = {
  todo: t.Object({
    id: t.Number(),
    title: t.String(),
    description: t.Optional(t.String()),
    completed: t.Optional(t.Boolean({ default: false })),
    createdAt: t.Optional(t.Date({ default: new Date() })),
  }),
  createBody: t.Object({
    title: t.String(),
    description: t.Optional(t.String()),
  }),
  updateBody: t.Object({
    title: t.Optional(t.String()),
    description: t.Optional(t.String()),
    completed: t.Optional(t.Boolean()),
  }),
  params: t.Object({
    id: t.Number(),
  }),
  errorResponse: t.Object({
    error: t.String(),
  }),
  deleteResponse: t.Object({
    deleted: t.Boolean(),
  }),
} as const;

// Or make the entire object as type
export type TodoModel = {
  [k in keyof typeof todoModel]: UnwrapSchema<(typeof todoModel)[k]>;
};
