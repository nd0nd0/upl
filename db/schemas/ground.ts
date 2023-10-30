import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { fixtures } from "./fixtures";

export const grounds = pgTable('ground', {
    name: text('name'),
    city: text('city'),
    source: text('source'),
    id: serial('id').primaryKey(),
    
});



export const fixtures_ground_relationship =  relations(fixtures, ({many})=>({
    fixtures: many(fixtures)
}))
