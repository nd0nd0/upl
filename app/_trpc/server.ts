import { appRouter, type AppRouter } from '@/server'
import { httpBatchLink } from '@trpc/client'
const BASEURL= process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/trpc' : ''

export const serverClient = appRouter.createCaller({
    links: [
        httpBatchLink({
            url:BASEURL
        })
    ]
})