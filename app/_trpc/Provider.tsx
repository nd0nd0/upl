"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/client";

export default function Provider ({children}:{children:React.ReactNode}){
    const [queryClient] = useState(()=>new QueryClient({}))
    const BASEURL= process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/trpc' : ''
    const [trpcClient] = useState(()=>trpc.createClient({
        links:[
            httpBatchLink({
                url:BASEURL
            })
        ]
    }))


    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}