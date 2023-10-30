ALTER TABLE "team_to_fixtures" DROP CONSTRAINT "team_to_fixtures_user_id_group_id";--> statement-breakpoint
ALTER TABLE "team_to_fixtures" DROP CONSTRAINT "team_to_fixtures_user_id_fixtures_id_fk";
--> statement-breakpoint
ALTER TABLE "team_to_fixtures" DROP CONSTRAINT "team_to_fixtures_group_id_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "team_to_fixtures" ADD COLUMN "fixture_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "team_to_fixtures" ADD COLUMN "team_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_to_fixtures" ADD CONSTRAINT "team_to_fixtures_fixture_id_fixtures_id_fk" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_to_fixtures" ADD CONSTRAINT "team_to_fixtures_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "team_to_fixtures" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "team_to_fixtures" DROP COLUMN IF EXISTS "group_id";