import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed:"ts-node prisma/seed.ts "
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});



// This is used by Prisma CLI (tools) like:

// npx prisma generate
// npx prisma migrate dev
// npx prisma db seed