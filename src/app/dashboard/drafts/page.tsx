'use client'
import { useAppSelector } from "@/state/hooks"
import { useRouter } from "next/navigation"


export default function DraftsPage() {
  const user = useAppSelector(state => state.user)
  const router = useRouter()

  if(!user) router.push('/login')

  

return (
  <main className="p-4">
    <h1 className="font-[700] text-[28px] text-[#626262]">Drafts</h1>
  </main>
)
}