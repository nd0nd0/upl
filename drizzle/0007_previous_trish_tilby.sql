ALTER TABLE "ground" ADD COLUMN "fixture_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ground" ADD CONSTRAINT "ground_fixture_id_fixtures_id_fk" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
