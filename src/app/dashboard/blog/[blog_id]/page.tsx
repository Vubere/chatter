import { feedT } from "@/types"
import Markdown from "marked-react"
import format from "date-fns/format"

import Failed from './failed'
import BlogUserDisplay from "@/app/components/BlogUserDisplay"

async function getBlog(id: string) {
  const res = await fetch('/blogs/' + id, { next: { revalidate: 200 } })
  const blog = await res.json()
  return blog.data
}

export default async function Blog({ params: { id } }: { params: { id: string } }) {
  const blog: feedT = await getBlog(id)

  if (!blog) {
    return <Failed />
  }

  const {
    title,
    content,
    author,
    createdAt,
    coverImage,
    tags,
    likes,
    comments,
  } = blog
  const formalCreatedAt = new Date(createdAt)
  const created = format(formalCreatedAt, 'MMM dd, yyyy')
  return (
    <main>
      <BlogUserDisplay author={author} created={created} />
      <Markdown>
        {'# ' + title + '\n' + '![cover image](' + coverImage + ')' + '\n' + content}
      </Markdown>
      <div className='flex gap-2'>
        {tags.map((tag, i) => (
          <p key={i} className='text-[#111] text-[14px] font-[500]'>{tag}</p>
        ))}
      </div>
      <div className='flex gap-2'>
        <p className='text-[#111] text-[14px] font-[500]'>{likes} likes</p>
        <p className='text-[#111] text-[14px] font-[500]'>{comments} comments</p>

      </div>
      <div className='flex gap-2'>
        <p className='text-[#111] text-[14px] font-[500]'>Share</p>
        <p className='text-[#111] text-[14px] font-[500]'>Bookmark</p>
      </div>
    </main>
  )
}