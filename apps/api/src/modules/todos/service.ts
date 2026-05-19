import { TodoModel } from "./model";

export abstract class TodoService {
  static getAllTodos() {
    return [];
  }
  static getTodoById(id: Number) {
    return id;
  }
  static createTodo(todoData: TodoModel["createBody"]) {
    return todoData;
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
