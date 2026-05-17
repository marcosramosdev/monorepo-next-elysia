import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { todosRoute } from "./modules/todos/index";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
    }),
  )
  .get("/", () => {
    return "Hello, World!";
  })
  .get("/auth", ({ query: { name } }) => `Welcome ${name}`, {
    headers: t.Object({
      "api-token": t.String(),
    }),
    beforeHandle({ request, set }) {
      const token = request.headers.get("api-token");
      if (token !== "5LEnc5WYU68YEGgb81tKk6t5TTBhOrWB") {
        set.status = 401;
        return { error: "Unauthorized" };
      }
      return;
    },
    response: {
      200: t.String(),
      401: t.Object({ error: t.String() }),
    },
  })
  .guard({
    beforeHandle({ request, set }) {
      console.log(request.url);
      const auth = request.headers.get("authorization");
      if (auth !== "5LEnc5WYU68YEGgb81tKk6t5TTBhOrWB") {
        set.status = 401;
        return { error: "Unauthorized" };
      }
      set.status = 200;
      return "Authorized";
    },
    response: {
      401: t.Object({ error: t.String() }),
      200: t.String(),
    },
  })
  .use(todosRoute)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
