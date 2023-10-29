import { db } from "@/db/connect";
import { publicProcedure, router } from "./trpc";
import { notes } from "@/db/notes/schema";
import {z} from 'zod'
export const appRouter = router({
	getNotes: publicProcedure.query(async () => {
		return await db.select().from(notes);
	}),
	addNote: publicProcedure.input(z.string()).mutation(async (note)=>{
		await db.insert(notes).values({name:'Sample note 1'})
		return true
	})
});

export type AppRouter = typeof appRouter;
