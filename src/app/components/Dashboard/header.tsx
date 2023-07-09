'use client'
/* hooks */
import { useState } from 'react'
import { useAppSelector } from '@/state/hooks'

/* next components */
import Link from 'next/link'
import Image from 'next/image'

/* icons */
import searchIcon from '@/icons/search.svg'
import notifications from '@/icons/notification.svg'
/* assets */
import avatar from '@/assets/dashboard/avatar.png'
import Avatar from '../Avatar'


export default function Topbar() {
  const [search, setSearch] = useState('')
  const user = useAppSelector(state => state.user)



  return (
    <div className='flex justify-end pl-10 pr-40 gap-10 h-[66px] items-center shadow absolute top-0 left-0 w-full'>
      <form className='h-[48px] max-w-[460px] w-[70%] rounded-[8px] block relative flex items-center border border-[#d0d0d0] px-2'>
        <button className='mr-2'><Image src={searchIcon} alt='search' /></button>
        <input type="text" placeholder='search chatter' className='w-[90%] focus:outline-none' />
      </form>
      <div className='ml-40'>
        {user!=null && <ul className='flex gap-2 items-center'>
          <li><Image src={notifications} alt='notifications' /> </li>
          <li className='w-[55px] border rounded-full h-[55px] relative'><Avatar src={user.avatar} alt={user.firstName} className='rounded-full border' fill={true} /> </li>
        </ul>}
      </div>
    </div>
  )
}

