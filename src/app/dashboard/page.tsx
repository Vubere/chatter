/* next components */
import Image from 'next/image'
import Link from 'next/link'
/* icons */

/* assets and icons */
import postIcon from '@/icons/pencil.svg'

/* custom pages */
import FeedComponent from '@/app/components/Dashboard/feed'
import { BlueButton } from '../components/Buttons'

export default function Home() {
  return (
    <main className="p-4 w-full h-full overflow-auto ">
      <div className='flex justify-between w-full items-center mb-6'>
        <div>
          <h1 className="capitalize font-[700] text-[32px] leading-[48px] mb-4">FEED</h1>
          <p className='text-[18px] leading-[27px] text-[#626262]'>Explore different content you love</p>
        </div>
        <Link href='/dashboard/create-post'>
          <BlueButton className='w-[177px] h-[56px] rounded-[8px] flex items-center justify-center gap-2 pointer'>
            <Image src={postIcon} alt='pencil' className='w-[17px] h-[17px]' />
            <span className='text-white'>Post a content</span>
          </BlueButton>
        </Link>
      </div>
      <div className='w-full static pb-20'>
        <FeedComponent />
      </div>
    </main>
  )
}