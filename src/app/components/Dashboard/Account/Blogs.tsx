import { User } from "@/types";
import { Post } from "../feed";




export default function Blogs({user}:{user: User}) {
  const {posts,likes, bookmarks} = user
  return (
    <div>
      
    </div>
  )
}


function BlogSection({blogs}:{blogs: string[]}) {
  return (
    <div>
      {
        blogs.map(blog => <Blog key={blog} id={blog} />)
      }
    </div>
  )
}

function Blog({id}:{id: string}) {

    

  return (
    <>
    </>
  )
}