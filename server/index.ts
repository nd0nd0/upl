import { db } from "@/db/connect";
import { publicProcedure, router } from "./trpc";
export const appRouter = router({
	getTeams : publicProcedure.query((async()=>{
		const fetch =  await db.query.teams.findMany({
			with:{
				squad:{
					columns:{
						name:true
					}
				}
			}
		})

		return fetch
	})),
	getFixtures: publicProcedure.query((async ()=>{
		const Qfixtures = await db.query.fixtures.findFirst({
			with:{
				teams:true
			}
		})


	}))
});

export type AppRouter = typeof appRouter;
