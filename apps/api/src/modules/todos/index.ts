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
      const todo = TodoService.getTodoById(+id);
      if (!todo) {
        return { error: "Todo not found" };
      }
      return todo;
    },
    {
      params: todoModel.params,
      response: {
        200: todoModel.todo,
        404: todoModel.errorResponse,
      },
    },
  )
  .post("/", ({ body }) => TodoService.createTodo(body), {
    body: todoModel.createBody,
    response: {
      200: todoModel.createBody,
    },
  })
  .patch(
    "/:id",
    ({ params: { id }, body, set }) => {
      const updated = TodoService.updateTodo(id, body);
      if (!updated) {
        set.status = 404;
        return { error: "Todo not found" };
      }
      return updated;
    },
    {
      params: todoModel.params,
      body: todoModel.updateBody,
      response: {
        200: todoModel.todo,
        404: todoModel.errorResponse,
      },
    },
  )
  .delete(
    "/:id",
    ({ params: { id }, set }) => {
      const result = TodoService.deleteTodo(id);
      if (!result) {
        set.status = 404;
        return { error: "Todo not found" };
      }
      return result;
    },
    {
      params: todoModel.params,
      response: {
        200: todoModel.deleteResponse,
        404: todoModel.errorResponse,
      },
    },
  );
