import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import postgres from "postgres";
import { notes } from "./notes/schema";

const pool = new Pool({
    connectionString:process.env.DATABASE_URL!
})

const migrationConnection = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(pool)


// const main = async () => {
// 	await migrate(db, { migrationsFolder: 'drizzle' });
// 	await migrationConnection.end();
// 	process.exit(0);
// };

// export {main}