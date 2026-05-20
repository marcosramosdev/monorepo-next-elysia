import { TodoModel } from "./model";
import { db } from "@/db/db";
import { todos } from "@/db/schema/todosSchema";
import { eq } from "drizzle-orm";

export abstract class TodoService {
  static async getAllTodos() {
    console.log("Getting all todos...");
    return await db.select().from(todos);
  }
  static async getTodoById(id: string) {
    const todo = await db.select().from(todos).where(eq(todos.id, id));
    return todo[0];
  }
  static async createTodo(todoData: TodoModel["createBody"]) {
    const newTodo = db.insert(todos).values({
      title: todoData.title,
      description: todoData.description,
    });
    const [result] = await newTodo.returning();
    return result;
  }
  static updateTodo(id: Number, updateBody: TodoModel["updateBody"]) {
    return {
      id,
      updateBody,
    };
  }
  static deleteTodo(id: Number) {
    return id;
  }
}
