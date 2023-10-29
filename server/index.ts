import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	getSampleData: publicProcedure.query(async () => {
		return { note: "Sample Data" };
	}),
});

export type AppRouter = typeof appRouter;
