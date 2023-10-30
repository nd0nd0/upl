import { relations } from "drizzle-orm";
import {
	bigint,
	boolean,
	date,
	integer,
	pgTable,
	serial,
} from "drizzle-orm/pg-core";
import { teams } from "./team";
import { grounds } from "./ground";

export const fixtures = pgTable("fixtures", {
	id: serial("id").primaryKey(),
	groundId: integer("ground_id"),
	replay: boolean("reply").default(false),
	neutralGround: boolean("neutral_ground").default(false),
	extraTime: boolean("extra_time").default(false),
	shootOut: boolean("shoot_out").default(false),
	behindClosedDoors: boolean("behind_closed_doors").default(false),


    // "gameweek": {
        //     "id": 12279,
        //     "compSeason": {
        //         "label": "2023/24",
        //         "competition": {
        //             "abbreviation": "EN_PR",
        //             "description": "Premier League",
        //             "level": "SEN",
        //             "source": "",
        //             "id": 1,
        //             "altIds": {
        //                 "opta": "8"
        //             }
        //         },
        //         "id": 578
        //     },
        //     "gameweek": 11,
        //     "competitionPhase": {
        //         "id": 5851,
        //         "type": "L",
        //         "gameweekRange": [
        //             1,
        //             38
        //         ]
        //     }
        // },
        // "kickoff": {
        //     "completeness": 3,
        //     "millis": 1699300800000,
        //     "label": "Mon 6 Nov 2023, 20:00 GMT"
        // },
        // "provisionalKickoff": {
        //     "completeness": 3,
        //     "millis": 1699300800000,
        //     "label": "Mon 6 Nov 2023, 20:00 GMT"
        // },
        // "teams": [
        //     {
        //         "team": {
        //             "name": "Tottenham Hotspur",
        //             "club": {
        //                 "name": "Tottenham Hotspur",
        //                 "shortName": "Spurs",
        //                 "abbr": "TOT",
        //                 "id": 21
        //             },
        //             "teamType": "FIRST",
        //             "shortName": "Tottenham Hotspur",
        //             "id": 21,
        //             "altIds": {
        //                 "opta": "t6"
        //             }
        //         }
        //     },
        //     {
        //         "team": {
        //             "name": "Chelsea",
        //             "club": {
        //                 "name": "Chelsea",
        //                 "shortName": "Chelsea",
        //                 "abbr": "CHE",
        //                 "id": 4
        //             },
        //             "teamType": "FIRST",
        //             "shortName": "Chelsea",
        //             "id": 4,
        //             "altIds": {
        //                 "opta": "t8"
        //             }
        //         }
        //     }
        // ],
        // "replay": false,
        // "ground": {
        //     "name": "Tottenham Hotspur Stadium",
        //     "city": "London",
        //     "source": "OPTA",
        //     "id": 3921
        // },
        // "neutralGround": false,
        // "status": "U",
        // "phase": "0",
        // "fixtureType": "REGULAR",
        // "extraTime": false,
        // "shootout": false,
        // "goals": [],
        // "penaltyShootouts": [],
        // "behindClosedDoors": false,
        // "id": 93430,
        // "altIds": {
        //     "opta": "g2367647"
        // },
        // kickoff:{
        //     completeness: integer('completeness'),
        //     millis: bigint('millis', {mode:'bigint'}),
        //     label: date('label', {mode:'string'}),
        // },
        // provisionalKickoff:{
        //     completeness: integer('completeness'),
        //     millis: bigint('millis', {mode:'bigint'}),
        //     label: date('label', {mode:'string'}),
        // },
});

export const fixtures_team_relationship = relations(teams, ({ many }) => ({
	teams: many(teams),
}));
export const fixture_to_ground_relations = relations(fixtures, ({ one }) => ({
	ground: one(grounds, {
		fields: [fixtures.groundId],
		references: [grounds.id],
	}),
}));
