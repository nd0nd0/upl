import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
	bigint,
	boolean,
	date,
	integer,
	json,
	pgTable,
	primaryKey,
	serial,
	text,
} from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
	id: serial("id").primaryKey(),
	name: text("name"),
});

export const teams = pgTable("teams", {
	name: text("name"),
	teamType: text("teamType"),
	shortName: text("shortName"),
	id: serial("id").primaryKey(),
	abbr: text("abbr"),
	fixtureId: integer("fixture_id").references(() => fixtures.id),
});

export const fixtures = pgTable("fixtures", {
	id: serial("id").primaryKey(),
	replay: boolean("reply").default(false),
	neutralGround: boolean("neutral_ground").default(false),
	extraTime: boolean("extra_time").default(false),
	shootOut: boolean("shoot_out").default(false),
	behindClosedDoors: boolean("behind_closed_doors").default(false),
	kickOff: json("kick_off"),
	provisionalKickoff: json("provisional_kick_off"),

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

	groundId: integer("ground_id"),
	gameWeekId: integer("game_week_id"),

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
});

export const grounds = pgTable("ground", {
	name: text("name"),
	city: text("city"),
	source: text("source"),
	id: serial("id").primaryKey(),
});
export const gameWeek = pgTable("game_week", {
	id: serial("id").primaryKey(),
	week: date("week").defaultNow(),

	seasonId: integer("season_id"),
	competitionPhaseId: integer("competition_phase_id"),

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
});

//------ Fixture Ground Relations ------ //

export const fixtures_ground_relationship = relations(fixtures, ({ many }) => ({
	fixtures: many(fixtures),
}));

export const fixture_to_ground_relationship = relations(
	fixtures,
	({ one }) => ({
		ground: one(grounds, {
			fields: [fixtures.groundId],
			references: [grounds.id],
		}),
	})
);

//------ End Fixture Ground Relations ------ //

//------  Team Relations ------ //

export const teamToFixtures = pgTable(
	"team_to_fixtures",
	{
		fixtureId: integer("fixture_id")
			.notNull()
			.references(() => fixtures.id),
		teamId: integer("team_id")
			.notNull()
			.references(() => teams.id),
	},
	(t) => ({
		pk: primaryKey(t.fixtureId, t.teamId),
	})
);

export const team_relationships = relations(teams, ({ many }) => ({
	teamToFixtures: many(teamToFixtures),
})); 

//------ End Team Relations ------ //

//------  Fixture Relations ------ //

export const fixture_relationships = relations(fixtures, ({ many }) => ({
	teams: many(teamToFixtures),
}));

//------  End Fixture Relations ------ //

export const fixture_to_team_relations = relations(
	teamToFixtures,
	({ one }) => ({
		team: one(teams, {
			fields: [teamToFixtures.teamId],
			references: [teams.id],
		}),
		fixture: one(fixtures, {
			fields: [teamToFixtures.fixtureId],
			references: [fixtures.id],
		}),
	})
);

//------ types ------//
export type NewTeams = InferInsertModel<typeof teams>;
export type Teams = InferSelectModel<typeof teams>;
export type NewFixture = InferInsertModel<typeof fixtures>;
export type Fixtures = InferSelectModel<typeof fixtures>;
export type NewGround = InferInsertModel<typeof grounds>;
export type Grounds = InferSelectModel<typeof grounds>;
export type NewNotes = InferInsertModel<typeof notes>;
export type Notes = InferSelectModel<typeof notes>;
