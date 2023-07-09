
/* next components */
import Image from 'next/image'

/* assets and icon*/
import book from '@/icons/book.svg'
import like from '@/icons/like.svg'
import comment from '@/icons/comment.svg'
import view from '@/icons/views.svg'
import bookmark from '@/icons/dashboard/bm.png'

/* types */
import { feed } from '@/types'

/* fakedata */
import { fakeFeed } from '@/fakedata'

export default function Feed() {
  const feed: feed[] = fakeFeed


  return (
    <main className="p-4 w-full h-full pb-20">
      <FeedHeading />
      <FeedContent feed={feed} />
    </main>
  )
}


function FeedHeading() {

  const activeClass = '  border-b-[3px] border-[#543ee0]'

  return (
    <nav className='w-full border border-[#626262] rounded-[4px] h-[60px] sticky top-[-20px] bg-[#fff] z-20'>
      <ul className='flex items-center justify-between px-4 block py-4 h-full'>
        <li className={'text-[24px] leading-[36px] text-[#111] font-[700] block h-[60px] flex items-center ' + activeClass}>For You</li>
        <li className='text-[24px] leading-[36px] text-[#111] font-[700] h-fullblock h-[60px] flex items-center'>Recent</li>
        <li className='text-[24px] leading-[36px] text-[#111] font-[700] h-full block h-[60px] flex items-center'>Following</li>
      </ul>
    </nav>
  )
}



interface feedContentProp {
  feed: feed[]
}


function FeedContent({ feed }: feedContentProp) {
  return (
    <>
      {feed.length === 0 ? <p className='text-[#626262] text-[18px] leading-[27px] pt-8'>No content available</p> :
        <section className='w-full border border-[#111]  h-full '>
          {feed.map((item, index) => (
            <div key={item.id} className='border p-8'>
              <Post feed={item}  />
            </div>
          ))}
        </section>
      }
    </>
  )
}
function Post({ feed }: { feed: feed }) {
  return (
    <article className=''>
      <header className='flex gap-2 mb-2'>
        <div className='w-[96px] h-[96px] relative'>
          <Image src={feed.author.avatar} alt={feed.author.lastName} fill={true} className='rounded-full' />
        </div>
        <div className='flex justify-center  h-[96px] flex-col gap-1 w-[200px]'>
          <p className='w-full text-[24px] text-[#111] font-[500] leading-[36px]'>{feed.author.firstName} {feed.author.lastName}</p>
          <div className='flex gap-4'>
            <p>{feed.author.profession}</p>
            <p>{feed.date}</p>
          </div>
        </div>
      </header>
      <main>
        <h1 className='text-[32px] leading-[48px] font-[500] mb-4'>{feed.title}</h1>
        <span className='flex gap-2  font-[400] leading-[24px] text-[16px] text-[#626262]'><Image src={book} alt='book' /> {feed.minRead} min read</span>
        <p className='text-[#626262]  leading-[24px] text-[18px] text-[#626262] w-[95%] mb-4'>{feed.synopsis}</p>
        <div className='w-full relative h-[200px]'>
          <Image src={feed.displayImage} alt={feed.title} fill={true} />
        </div>
      </main>
      <footer className='flex w-full justify-between items-center mt-2'>
        <div className='flex gap-2 items-center'>
          <Image src={comment} alt='comment' width={24} height={24} />
          <span className='text-[#626262] text-[16px] leading-24px'>{feed.comments}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Image src={like} alt='like' width={24} height={24} />
          <span className='text-[#626262] text-[16px] leading-24px'>{feed.likes}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Image src={view} alt='view' width={24} height={24} />
          <span className='text-[#626262] text-[16px] leading-24px'>{feed.views}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Image src={bookmark} alt='view' width={24} height={24} />
        </div>
      </footer>
    </article>
  )
}

export {Post} 