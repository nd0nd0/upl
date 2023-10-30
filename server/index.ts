import { db } from "@/db/connect";
import { publicProcedure, router } from "./trpc";
import { notes } from "@/db/schemas/notes";
import {z} from 'zod'
import { fixtures } from "@/db/schema";
import { eq } from "drizzle-orm";
export const appRouter = router({
	getNotes: publicProcedure.query(async () => {
		return await db.select().from(notes);
	}),
	addNote: publicProcedure.input(z.string()).mutation(async (note)=>{
		await db.insert(notes).values({name:'Sample note 1'})
		return true
	}),
	getFixtures: publicProcedure.query((async ()=>{
		const Qfixtures = await db.query.fixtures.findFirst({
			with:{
				teams:true
			}
		})


	}))
});

export type AppRouter = typeof appRouter;
