import User from "@/components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import Hero from "@/components/home/hero";
import Features from "@/components/home/featured";
import Recent from "@/components/home/recent";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="home-container center-vertically">
      <Hero/>
      <Features />
      <h1 className='text-4xl'>Home</h1>

      <h2>Client Session</h2>
      <User />

      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </div>
  )
}