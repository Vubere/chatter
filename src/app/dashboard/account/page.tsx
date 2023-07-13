'use client'

import Blogs from "@/app/components/Dashboard/Account/Blogs";
import UserDetails from "@/app/components/Dashboard/Account/UserDetails";


/* hooks */
import { useAppSelector } from "@/state/hooks";



export default function Account() {
  const user = useAppSelector((state) => state.user);
  if(user === null) return (<></>)


  return (
    <main className="w-full p-4 px-6">
      <h1 className="font-[700] text-[32px] nb-8">Account</h1>
      <UserDetails user={user} />
      <Blogs user={user}/>
    </main>
  )
}