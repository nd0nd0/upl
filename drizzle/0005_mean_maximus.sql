ALTER TABLE "team_to_fixtures" DROP CONSTRAINT "team_to_fixtures_fixtures_id_fixtures_id_fk";
--> statement-breakpoint
ALTER TABLE "team_to_fixtures" ADD COLUMN "fixture_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_to_fixtures" ADD CONSTRAINT "team_to_fixtures_fixture_id_fixtures_id_fk" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "team_to_fixtures" DROP COLUMN IF EXISTS "fixtures_id";