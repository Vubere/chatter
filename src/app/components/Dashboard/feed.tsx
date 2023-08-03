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
import { feedT } from '@/types'

/* fakedata */
import Avatar from '../Avatar'
import { format } from 'date-fns'
import AddInterest from './AddInterest'
import { useGetRecentBlogsQuery, useGetUserBlogByFollowingQuery, useGetUserBlogByInterestQuery } from '@/state/api/api'
import { useAppSelector } from '@/state/hooks'

export default function Feed() {
  const [currentView, setCurrentView] = useState<'For You' | 'Recent' | 'Following'>('For You')


  return (
    <main className="p-4 w-full h-full pb-20">
      <FeedHeading currentView={currentView} setCurrentView={setCurrentView} />

      <FeedContent type={currentView} />

    </main>
  )
}


function FeedHeading({ currentView, setCurrentView }: {
  currentView: 'For You' | 'Recent' | 'Following',
  setCurrentView: Dispatch<SetStateAction<'For You' | 'Recent' | 'Following'>>
}) {

  const activeClass = '  border-b-[3px] border-[#543ee0]'

  return (
    <nav className='w-full border border-[#626262] rounded-[4px] h-[60px] sticky top-[-20px] bg-[#fff] z-20'>
      <ul className='flex items-center justify-between px-4 block py-4 h-full'>
        <li className={'text-[24px] leading-[36px] text-[#111] font-[700] block h-[60px] flex items-center ' + (currentView == "For You" ? activeClass : '')}
          onClick={() => setCurrentView('For You')}>For You</li>
        <li className={'text-[24px] leading-[36px] text-[#111] font-[700] block h-[60px] flex items-center ' + (currentView == 'Recent' ? activeClass : '')}
          onClick={() => setCurrentView('Recent')}>Recent</li>
        <li className={'text-[24px] leading-[36px] text-[#111] font-[700] block h-[60px] flex items-center ' + (currentView == 'Following' ? activeClass : '')}
          onClick={() => setCurrentView('Following')}
        >Following</li>
      </ul>
    </nav>
  )
}



interface feedContentProp {
  type: 'For You' | 'Recent' | 'Following'
}



function FeedContent({ type }: feedContentProp) {
  let NoFeedContent: React.ReactNode = null
  const user = useAppSelector((state) => state.user)
  let feed: feedT[] = []
  const interest = useGetUserBlogByInterestQuery(user ? user._id : '', { refetchOnReconnect: true })
  const recent = useGetRecentBlogsQuery(undefined, { refetchOnReconnect: true })
  const following = useGetUserBlogByFollowingQuery(user ? user._id : '', { refetchOnReconnect: true })


  switch (type) {
    case 'For You':
      if (interest.isLoading) return (<p className='mt-4'>Loading...</p>)
      if (interest.isSuccess) {
        feed = interest.currentData?.blogs || []
      }
      break;
    case 'Recent':
      if (recent.isLoading) return (<p className='mt-4'>Loading...</p>)
      if (recent.isSuccess) {
        feed = recent.currentData?.blogs || []
      }
      break;
    case 'Following':
      if (following.isLoading) return (<p className='mt-4'>Loading...</p>)
      if (following.isSuccess) {
        feed = following.currentData?.blogs || []
      }
      break;
    default: break;
  }
  if (feed.length == 0) {
    switch (type) {
      case 'For You': NoFeedContent = (<p className=' mt-4'>Add interest to get tailored blogs</p>)
        break;
      case 'Following': NoFeedContent = (<p className='mt-4'>Follow more users to see blog content</p>)
        break;
      case 'Recent': NoFeedContent = (<p className='mt-4'>No recent blogs to display</p>)
        break;
      default: break;
    }
  }

  return (
    <>

      {!!feed.length && <section className='w-full border border-[#111]  h-full '>
        {feed.map((item) => (
          <div key={item._id} className='border p-8'>
            <Post feed={item} />
          </div>
        ))}
      </section>}
      {NoFeedContent}
      {feed.length < 5 && type == 'For You' && (
        <AddInterest />
      )}
    </>
  )
}
function Post({ feed }: { feed: feedT }) {
  const formalCreatedAt = new Date(feed.createdAt)
  const created = format(formalCreatedAt, 'MMM dd, yyyy')
  return (
    <article className='max-w-[800px] w-[90%]'>

      <header className='flex gap-2 mb-2'>
        <div className='w-[96px] h-[96px] relative border rounded-full'>
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
      <Link href={`/blog/${feed._id}`}>
        <main>
          <h1 className='text-[32px] leading-[48px] font-[500] mb-4'>{feed.title}</h1>
          <span className='flex gap-2  font-[400] leading-[24px] text-[16px] text-[#626262]'><Image src={book} alt='book' /> {feed.minRead} min read</span>
          <p className='text-[#626262]  leading-[24px] text-[18px] text-[#626262] w-[95%] mb-4'>{feed.excerpt}</p>
          <div className='w-full relative h-[200px]'>
            <Image src={feed.coverImage} alt={feed.title} fill={true} />
          </div>
        </main>
      </Link>
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