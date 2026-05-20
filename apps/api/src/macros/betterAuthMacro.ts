import { auth } from "@/lib/auth";
import Elysia from "elysia";

const betterAuthMacro = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    needsAuth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });
        if (!session) return status(401);
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

export { betterAuthMacro };
