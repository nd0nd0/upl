DO $$ BEGIN
 CREATE TYPE "isoCode" AS ENUM('UG', 'KE', 'RW', 'TZ');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "shirt_number" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "nationalTeamCode" "isoCode";--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "height" bigint;--> statement-breakpoint
ALTER TABLE "players" DROP COLUMN IF EXISTS "national_team";