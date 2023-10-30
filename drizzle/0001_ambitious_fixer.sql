CREATE TABLE IF NOT EXISTS "fixtures" (
	"id" serial PRIMARY KEY NOT NULL,
	"ground_id" integer,
	"reply" boolean DEFAULT false,
	"neutral_ground" boolean DEFAULT false,
	"extra_time" boolean DEFAULT false,
	"shoot_out" boolean DEFAULT false,
	"behind_closed_doors" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ground" (
	"name" text,
	"city" text,
	"source" text,
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"name" text,
	"teamType" text,
	"shortName" text,
	"id" serial PRIMARY KEY NOT NULL,
	"abbr" text
);
