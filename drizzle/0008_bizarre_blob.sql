CREATE TABLE IF NOT EXISTS "players" (
	"name" text,
	"id" serial PRIMARY KEY NOT NULL,
	"fixture_id" integer
);
--> statement-breakpoint
DROP TABLE "notes";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_fixture_id_teams_id_fk" FOREIGN KEY ("fixture_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
