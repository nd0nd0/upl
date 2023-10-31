DO $$ BEGIN
 CREATE TYPE "position" AS ENUM('GoalKeeper', 'Midfielder', 'Defender');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "position" "position";--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "shirt_number" numeric;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "loan" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "national_team" text;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "birth_day" date;