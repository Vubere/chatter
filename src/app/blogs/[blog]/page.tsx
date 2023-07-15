



async function getData(blog:string) {
  const res = await fetch('/api/blogs/'+blog)
}

export default async function BlogPage({params}:{params:{blog:string}}) {

  const data = await getData(params.blog)

  return (
    <main className="p-4">
     
    </main>
  )
}


