import { InferInsertModel, InferModel, InferSelectModel, relations } from "drizzle-orm";
import { pgSchema, pgTable, serial, text } from "drizzle-orm/pg-core";
import { fixtures } from "./fixtures";

export const teams = pgTable('teams', {
    name: text('name'),
    teamType: text('teamType'),
    shortName: text('shortName'),
    id: serial('id').primaryKey(),
    abbr: text('abbr'),
});

export const team_fixtures_relationship =  relations(fixtures, ({many})=>({
    teams: many(fixtures)
}))

export type NewTeams = InferInsertModel<typeof teams>
export type teams = InferSelectModel<typeof teams>