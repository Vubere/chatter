'use client'
import { useEffect, useState } from "react";


import { User, feed } from "@/types";
import { Post } from "../feed";




export default function Blogs({ user }: { user: User }) {
  const [type, setType] = useState<'posts' | 'likes' | 'bookmarks'>('posts')
  const { posts, likes, bookmarks } = user
  const holder = {
    posts,
    likes,
    bookmarks
  }
  const show = holder[type]
  return (
    <div className="w-full h-[100vh] overflow-auto pb-[150px]">
      <ul className="flex justify-between">
        <li onClick={() => setType('posts')} className={`${type == 'posts' ? 'border-b-[3px] border-[#543ee0]' : ''} w-[30%] text-center text-[18px] pb-4`}>Posts</li>
        <li onClick={() => setType('likes')} className={`${type == 'likes' ? 'border-b-[3px] border-[#543ee0]' : ''} w-[30%] text-center text-[18px] pb-4`}>Likes</li>
        <li onClick={() => setType('bookmarks')} className={`${type == 'bookmarks' ? 'border-b-[3px] border-[#543ee0]' : ''} w-[30%] text-center text-[18px] pb-4`}>Bookmarks</li>
      </ul>
      {type == 'posts' && <BlogSection blogs={posts} />}
      {type == 'likes' && <BlogSection blogs={likes} />}
      {type == 'bookmarks' && <BlogSection blogs={bookmarks} />}
      {show.length == 0 && <p className="text-center text-[#626262] mt-4">No {type} yet</p>
      }
      <BlogSection blogs={show} />
    </div>
  )
}


function BlogSection({ blogs }: { blogs: string[] }) {

  return (
    <div >
      {
        blogs.map(blog => <Blog key={blog} id={blog} />)
      }
    </div>
  )
}

function Blog({ id }: { id: string }) {
  const [feed, setFeed] = useState<feed>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs/published?id=' + id)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setFeed(data.blog)
          setLoading(false)
        } else {
          throw new Error(data)
        }
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })

  }, [id])
  return (
    <div className="border rounded-[10px] p-4">
      {loading && <p>Loading...</p>}
      {feed &&
        <Post feed={feed} />}
    </div>
  )
}