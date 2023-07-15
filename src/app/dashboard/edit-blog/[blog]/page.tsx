'use client'

import { feed } from "@/types"
import { useEffect, useState } from "react"
import CreatePost from "../../create-blog/page"

export default function BlogToEdit({params}:{params:{blog:string}}) {
  const [blog, setBlog] = useState<feed>()
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    const blog = getBlog(params.blog)
    blog.then((data)=>{
      setBlog(data)
      setLoading(false)
    }).catch(err=>console.log(err))
  },[params.blog])

  
  return (
    <main>
      {loading ? <p>Loading...</p> : <p>{blog?.title}</p>}
      {
        blog&&<CreatePost blog={blog}/>
      }
    </main>
  )
}

async function getBlog(blog:string) {
  const res = await fetch('/api/blogs/'+blog)
  const data = await res.json()
  return data
}