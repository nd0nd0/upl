import SampleData from "./_components/SampleData";
import { serverClient } from "./_trpc/server";

export default async function Home() {
  const sampleData = await serverClient.getSampleData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <p>UPL</p>
     <div>{JSON.stringify(sampleData)}</div>
    </main>
  )
}
