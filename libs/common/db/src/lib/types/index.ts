import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { usersTable } from "../schema";

export type SelectUser = InferSelectModel<typeof usersTable>;
export type InsertUser = InferInsertModel<typeof usersTable>;
