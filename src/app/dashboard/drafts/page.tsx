'use client'
import { Post } from "@/app/components/Dashboard/feed"
import { useAppSelector } from "@/state/hooks"
import { feed } from "@/types"
import { useRouter } from "next/navigation"
import { comma } from "postcss/lib/list"
import { useEffect, useState } from "react"

import Link from 'next/link'

import {BlueButton} from "@/app/components/Buttons"


export default function DraftsPage() {
  const user = useAppSelector(state => state.user)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  if (!user && typeof window != 'undefined') router.push('/login')

  const [drafts, setDrafts] = useState<feed[]>([])


  useEffect(() => {
    if (!user) return
    fetch('/api/blogs/drafts?user_id=' + user._id)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setLoading(false)
          setDrafts(data.blogs)
        } else {
          throw new Error(data)
        }
      }).catch(err => console.log(err))
  }, [user])

  return (
    <main className="p-4 max-h-[100vh] overflow-y-auto pb-[150px]">
      <h1 className="font-[700] text-[28px] text-[#626262]">Drafts</h1>
      <div className=" flex flex-col items-center ">
        {drafts.length === 0 ? loading ? <p>Loading...</p> : <p className="text-[#626262] text-[18px] leading-[27px] pt-8">No drafts available</p> : null}
        {drafts.map(draft => (
          <div key={draft._id} className="w-full border p-2 rounded-[5px]">
            {
              draft.state.toLowerCase() == 'draft' ?
                <div className=' h-[30px] w-full'>
                  <div className='flex justify-end gap-2'>
                    <Link href={`/dashboard/edit-blog/${draft._id}`}>
                      <BlueButton className='bg-[#543ee0] text-[#fff] px-2 py-1  rounded-[4px]'>Edit Draft</BlueButton>
                    </Link>
                  </div>
                </div> : null
            }
            <Post feed={draft} />
          </div>
        ))}
      </div>
    </main>
  )
}