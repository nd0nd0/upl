import { InferInsertModel, InferModel, InferSelectModel } from "drizzle-orm";
import { pgSchema, pgTable, serial, text } from "drizzle-orm/pg-core";


export const notes = pgTable('notes', {
    id: serial('id').primaryKey(),
    name: text('name'),
  });


export type NewNotes = InferInsertModel<typeof notes>
export type Notes = InferSelectModel<typeof notes>