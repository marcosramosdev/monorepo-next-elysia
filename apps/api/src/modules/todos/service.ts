import { todos } from "../../db/db";
import { TodoModel } from "./model";

export abstract class TodoService {
  static getAllTodos() {
    return todos;
  }
  static getTodoById(id: Number) {
    return todos.find((todo: TodoModel["todo"]) => todo.id === id);
  }
  static createTodo(todoData: TodoModel["createBody"]) {
    const newTodo = {
      id: todos.length + 1,
      title: todoData.title,
      description: todoData.description || "",
    };
    todos.push(newTodo);
    return newTodo;
  }
  static updateTodo(id: Number, updateBody: TodoModel["updateBody"]) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return null;
    Object.assign(todoToEdit, updateBody);
    return todoToEdit;
  }
  static deleteTodo(id: Number) {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return null;
    todos.splice(index, 1);
    return { deleted: true };
  }
}
