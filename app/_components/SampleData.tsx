
'use client'
import { trpc } from "../_trpc/client"
import { serverClient } from "../_trpc/server"
 type props =  {
    data: Awaited<ReturnType<(typeof serverClient)['getSampleData']>> 
 }
export default function SampleData({data}:props) {
  const sampleData = trpc.getSampleData.useQuery(undefined,{
    initialData:data,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
  return (
    
     <div>{JSON.stringify(sampleData.data)}</div>
  )
}
