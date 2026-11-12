export * from "./auth-schema";

import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull().unique(),
  slug: varchar().notNull().unique(),
});
