'use client'
import { Post } from "@/app/components/Dashboard/feed"
import { useAppSelector } from "@/state/hooks"
import { feed } from "@/types"
import { useRouter } from "next/navigation"
import { comma } from "postcss/lib/list"
import { useEffect, useState } from "react"


export default function DraftsPage() {
  const user = useAppSelector(state => state.user)
  const router = useRouter()

  if (!user && typeof window != 'undefined') router.push('/login')

  const [drafts, setDrafts] = useState<feed[]>([])


  useEffect(() => {
    if (!user) return
    fetch('/api/blogs/drafts?user_id=' + user._id)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (!data.error)
          setDrafts(data.blogs)
      }).catch(err=>console.log(err))
  }, [user])

  return (
    <main className="p-4 h-[100vh] overflow-y-auto pb-29 ">
      <h1 className="font-[700] text-[28px] text-[#626262]">Drafts</h1>
      <div className=" flex flex-col items-center">
        {drafts.length === 0 ? <p className="text-[#626262] text-[18px] leading-[27px] pt-8">No drafts available</p> : null}
        {drafts.map(draft => (
          <Post key={draft._id} feed={draft} />
        ))}
      </div>
    </main>
  )
}