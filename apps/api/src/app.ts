import { Elysia } from "elysia";
import { todosRoute } from "./modules/todos/index";
import { betterAuthMacro } from "./macros/betterAuthMacro";
import { auth } from "./lib/auth";
import { openapi } from "@elysia/openapi";
import { OpenAPI } from "./lib/openapi";

const app = new Elysia()
  .get("/", () => "Hello World")
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .mount("/auth", auth.handler)
  .use(betterAuthMacro)
  .use(todosRoute)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
