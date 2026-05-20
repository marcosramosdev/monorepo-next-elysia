import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db"; // your drizzle instance
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  basePath: "/api",
  database: drizzleAdapter(db, {
    provider: "pg",
    camelCase: false,
    usePlural: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [openAPI()],
});
