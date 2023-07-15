'use client'

import { feed } from "@/types"
import { useEffect, useState } from "react"


import { CreatePost } from "@/app/components/Dashboard/Creatpost"

export default function BlogToEdit({ params }: { params: { blog: string } }) {
  const [blog, setBlog] = useState<feed>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const blog = getBlog(params.blog)
    blog.then((data) => {
      setBlog(data.data)
      setLoading(false)
    }).catch(err => console.log(err))
  }, [params.blog])


  return (
    <main>
      {loading ? <p>Loading...</p> : blog&& <p className="border-b px-4 pb-2">Editing{': '}
        <span className="font-[700] text-[24px] ">
          {blog?.title}
        </span>
      </p>}
      {
        blog && <CreatePost blog={blog} />
      }
    </main>
  )
}

async function getBlog(blog: string) {
  const res = await fetch('/api/blogs/' + blog)
  const data = await res.json()
  return data
}