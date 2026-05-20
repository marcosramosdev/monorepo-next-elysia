import Elysia from "elysia";
import { TodoService } from "./service";
import { todoModel } from "./model";
import { z } from "zod";

export const todosRoute = new Elysia({ prefix: "/todos" })
  .get(
    "/",
    async () => {
      const todos = await TodoService.getAllTodos();
      if (todos.length === 0) {
        return {
          message: "No todos found",
          todos: [],
        };
      }
      return todos;
    },
    {
      response: {
        200: z.array(todoModel.todo),
        400: z.object({
          message: z.string(),
          todos: z.array(todoModel.todo),
        }),
      },
    },
  )
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const todo = await TodoService.getTodoById(id);
      if (!todo) {
        return {
          error: "Todo not found",
        };
      }
      return todo;
    },
    {
      params: todoModel.params,
      response: {
        200: todoModel.todo,
        404: z.object({
          error: z.string(),
        }),
      },
    },
  )
  .post(
    "/",
    async ({ body }) => {
      const newTodo = await TodoService.createTodo({
        title: body.title,
        description: body.description,
      });

      if (!newTodo) {
        return { error: "Failed to create todo" };
      }

      return {
        todo: newTodo,
        message: "Todo created successfully",
      };
    },
    {
      response: {
        200: z.object({
          todo: todoModel.todo,
          message: z.string(),
        }),
        422: todoModel.errorResponse,
      },
      body: z.object({
        title: z.string().trim().min(1, "Title is required"),
        description: z.string().optional(),
      }),
    },
  );
