
'use client'
import { trpc } from "../_trpc/client"
import { serverClient } from "../_trpc/server"
 type props =  {
    data: Awaited<ReturnType<(typeof serverClient)['getSampleData']>> 
 }
export default function SampleData({data}:props) {
//   const sampleData = trpc.getSampleData.useQuery()
  return (
    
     <div>{JSON.stringify(data)}</div>
  )
}
