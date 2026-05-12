import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => {
    return "Hello, World!";
  })
  .get("/json", () => {
    return {
      message: "Hello, World!",
    };
  })
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
