import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import postgres from "postgres";
import { notes } from './notes/schema';

const pool = new Pool({
    connectionString:process.env.DATABASE_URL!
})

const migrationConnection = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(pool)


const main = async () => {
    console.log('---migration started')
	await migrate(db, { migrationsFolder: 'drizzle' });
    // await db.insert(notes).values({name:'Migration Sample note 1'})
	await migrationConnection.end();
    console.log('---migration end')
	process.exit(0);
};

main().catch((e)=>console.log('migration-error--',e))

