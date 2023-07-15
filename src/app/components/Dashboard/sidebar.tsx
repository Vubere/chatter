'use client'
/* next components */
import Link from 'next/link'
import Image from 'next/image'
/* hooks */
import { usePathname } from 'next/navigation'

/* icons  */
import account from '@/icons/dashboard/account.png'
import accountActive from '@/icons/dashboard/accountActive.png'
import analytics from '@/icons/dashboard/analytic.svg'
import analyticsActive from '@/icons/dashboard/analyticActive.svg'
import bm from '@/icons/dashboard/bm.png'
import bmActive from '@/icons/dashboard/bmActive.png'
import draft from '@/icons/dashboard/drafts.png'
import draftActive from '@/icons/dashboard/draftsActive.png'
import fb from '@/icons/dashboard/fb.svg'
import fbActive from '@/icons/dashboard/fbActive.svg'
import notif from '@/icons/dashboard/notif.png'
import notifActive from '@/icons/dashboard/notifActive.png'
import team from '@/icons/dashboard/team.png'
import teamActive from '@/icons/dashboard/teamActive.png'
import trendingIcon from '@/icons/dashboard/trendingIcon.svg'

/* custom compnents */
import Logout from './Logout'


const overviewLinks = [
  {
    title: 'Feed',
    icon: fb,
    iconActive: fbActive,
    link: '/dashboard'
  },
  {
    title: 'Bookmarks',
    icon: bm,
    iconActive: bmActive,
    link: '/dashboard/bookmarks'
  },
  {
    title: 'Drafts',
    icon: draft,
    iconActive: draftActive,
    link: '/dashboard/drafts'
  },
  {
    title: 'Analytics',
    icon: analytics,
    iconActive: analyticsActive,
    link: '/dashboard/analytics'
  },
]
const personalLinks = [
  {
    title: 'Account',
    icon: account,
    iconActive: accountActive,
    link: '/dashboard/account'
  },
  {
    title: 'Notifications',
    icon: notif,
    iconActive: notifActive,
    link: '/dashboard/notifications'
  }
]

export default function Sidebar() {
  const path = usePathname()

  const trendingTags = ['programming', 'data science', 'technology', 'machine learning', 'politics']

  const headingClass = 'font-[600] text-[#111] font-[18px] leading-[27px] w-full text-left '


  return (
    <div className='w-[80%] max-w-[268px] flex flex-col items-center overflow-y-auto h-[100vh] absolute left-0 top-0 pt-2 z-20 pb-20  bg-[#fff] shadow-xl'>
      <h1 className="capitalize text-[32px] text-[#543ee0] font-[500] w-[80%] mb-10">CHATTER</h1>
      <section className='flex flex-col gap-4 w-[80%] mb-6'>
        <h3 className={headingClass}>Overview</h3>
        <nav>
          <ul className='flex flex-col gap-4 pl-4'>
            {overviewLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.link} className={`flex gap-2 items-center ${path == link.link ? 'text-[#543ee0]' : ''}`}>
                  <Image src={path == link.link ? link.iconActive : link.icon} alt={link.title} className='w-[14px] h-[14px]' /> {link.title}
                </Link>
              </li>
            )
            )}
          </ul>
        </nav>
      </section>
      <section className='flex flex-col gap-4 w-[80%] mb-6'>
        <h3 className={headingClass + ' flex gap-2'}>Trending Tags <Image src={trendingIcon} alt='' /></h3>
        <nav>
          <ul className='flex flex-col gap-4 pl-4'>
            {trendingTags.map((tags, i) => (
              <li key={i}>
                <Link href={tags}>{tags}</Link>
              </li>
            ))
            }
          </ul>
        </nav>
      </section>
      <section className='flex flex-col gap-4 w-[80%] mb-6'>
        <h3 className={headingClass}>Personal</h3>
        <nav>
          <ul className='flex gap-4 flex-col pl-4'>
            {personalLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.link} className={`flex gap-2 items-center ${path == link.link ? 'text-[#543ee0]' : ''}`}>
                  <Image src={path == link.link ? link.iconActive : link.icon} alt={link.title} className='w-[14px] h-[14px]' /> {link.title}
                </Link>
              </li>
            ))
            }
          </ul>
        </nav>
      </section>
      <Logout />
    </div>
  )
}


