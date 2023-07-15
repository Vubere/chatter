'use client'

/* hooks*/
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
/* next components */
import Image from 'next/image'
import Link from 'next/link'
/* custom conponent */
import { BlueButton } from '../Buttons'
/* assets and icon*/
import book from '@/icons/book.svg'
import like from '@/icons/like.svg'
import comment from '@/icons/comment.svg'
import view from '@/icons/views.svg'
import bookmark from '@/icons/dashboard/bm.png'

/* types */
import { feed } from '@/types'

/* fakedata */
import Avatar from '../Avatar'
import { format } from 'date-fns'

export default function Feed() {
  const [feed, setFeed] = useState()
  const [currentView, setCurrentView] = useState<'For You'|'Recent'|'Following'>('For You')

  useEffect(()=>{
    const url = currentView == 'For You'? '':currentView=='Recent'?'':'';
    fetch(url)
    .then(res=>res.json)
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
    
  },[currentView])

  return (
    <main className="p-4 w-full h-full pb-20">
      <FeedHeading currentView={currentView} setCurrentView={setCurrentView}/>
      {
        feed?
        <FeedContent feed={feed} />
        :null
      }
    </main>
  )
}


function FeedHeading({currentView, setCurrentView}: {
  currentView: string,
  setCurrentView: Dispatch<SetStateAction<'For You' | 'Recent' | 'Following'>>
}) {

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
          {feed.map((item) => (
            <div key={item._id} className='border p-8'>
              <Post feed={item} />
            </div>
          ))}
        </section>
      }
    </>
  )
}
function Post({ feed }: { feed: feed }) {
  const formalCreatedAt = new Date(feed.createdAt)
  const created = format(formalCreatedAt, 'MMM dd, yyyy')
  return (
    <article className='max-w-[800px] w-[90%]'>
      {
        feed.state.toLowerCase() == 'draft' ?
          <div className=' h-[30px] w-full'>
            <div className='flex justify-end gap-2'>
              <Link href={`/dashboard/edit-blog/${feed._id}`}>
                <BlueButton className='bg-[#543ee0] text-[#fff] px-2 py-1  rounded-[4px]'>Edit Draft</BlueButton>
              </Link>
            </div>
          </div> : null
      }
      <header className='flex gap-2 mb-2'>
        <div className='w-[96px] h-[96px] relative'>
          <Avatar src={feed.author.avatar} className='' alt={feed.author.firstName} fill={true} />
        </div>
        <div className='flex justify-center  h-[96px] flex-col gap-1 w-full'>
          <p className=' text-[24px] text-[#111] font-[500] leading-[36px]'>{feed.author.firstName} {feed.author.lastName}</p>
          <div className='flex gap-4 '>
            <p className=''>{feed.author.profession}</p>
            <p className=''>{created}</p>
          </div>
        </div>
      </header>
      <main>
        <h1 className='text-[32px] leading-[48px] font-[500] mb-4'>{feed.title}</h1>
        <span className='flex gap-2  font-[400] leading-[24px] text-[16px] text-[#626262]'><Image src={book} alt='book' /> {feed.minRead} min read</span>
        <p className='text-[#626262]  leading-[24px] text-[18px] text-[#626262] w-[95%] mb-4'>{feed.excerpt}</p>
        <div className='w-full relative h-[200px]'>
          <Image src={feed.coverImage} alt={feed.title} fill={true} />
        </div>
      </main>
      {feed.state.toLowerCase() == 'published' && <footer className='flex w-full justify-between items-center mt-2'>
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
      </footer>}
    </article>
  )
}

export { Post } 