import { User } from "@/types"
import Avatar from "./Avatar"


export default function BlogUserDisplay({author, created}: {author:Partial<User>, created:string}) {
  return (
    <div>
      <header className='flex gap-2 mb-2'>
        <div className='w-[96px] h-[96px] relative border rounded-full'>
          <Avatar src={author.avatar} className='' alt={author.firstName} fill={true} />
        </div>
        <div className='flex justify-center  h-[96px] flex-col gap-1 w-full'>
          <p className=' text-[24px] text-[#111] font-[500] leading-[36px]'>{author.firstName} {author.lastName}</p>
          <div className='flex gap-4 '>
            <p className=''>{author.profession}</p>
            <p className=''>{created}</p>
          </div>
        </div>
      </header>
    </div>
  )
}