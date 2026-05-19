import Elysia, { t } from "elysia";
import { TodoService } from "./service";
import { todoModel } from "./model";

export const todosRoute = new Elysia({ prefix: "/todos" })
  .get("/", () => TodoService.getAllTodos(), {
    response: t.Array(todoModel.todo),
  })
  .get(
    "/:id",
    ({ params: { id } }) => {
      return id;
    },
    {
      params: todoModel.params,
    },
  )
  .post("/", ({ body }) => TodoService.createTodo(body), {
    body: todoModel.createBody,
    response: {
      200: todoModel.createBody,
    },
  });
