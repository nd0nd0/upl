CREATE TABLE IF NOT EXISTS "game_week" (
	"id" serial PRIMARY KEY NOT NULL,
	"week" date DEFAULT now(),
	"season_id" integer,
	"competition_phase_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_to_fixtures" (
	"user_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT team_to_fixtures_user_id_group_id PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
ALTER TABLE "fixtures" ADD COLUMN "kick_off" json;--> statement-breakpoint
ALTER TABLE "fixtures" ADD COLUMN "provisional_kick_off" json;--> statement-breakpoint
ALTER TABLE "fixtures" ADD COLUMN "game_week_id" integer;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "fixture_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_fixture_id_fixtures_id_fk" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_to_fixtures" ADD CONSTRAINT "team_to_fixtures_user_id_fixtures_id_fk" FOREIGN KEY ("user_id") REFERENCES "fixtures"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_to_fixtures" ADD CONSTRAINT "team_to_fixtures_group_id_teams_id_fk" FOREIGN KEY ("group_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
