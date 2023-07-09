'use client'
/* hooks */
import { usePathname, useRouter } from 'next/navigation';


/* custom components */
import { BlueButton, WhiteButton } from '@/app/components/Buttons';

/* next components */
import Link from 'next/link';
import { useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();


  const setSignInView = (view: string) => {
    if(typeof window === 'undefined') return
    sessionStorage.setItem('suv', view)
    router.push('sign-in')
  }

  useEffect(() => {
    const get = async () => {
      const res = await fetch('http://localhost:3000/api/blogs',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })
      const req = await res.text() 
      console.log(req)
    }
    get()

  }, [])

  return (
    <header className="w-full h-[98px] flex items-center shadow-md justify-between px-4">
      <h1 className="font-[700] text-[#543ee0] text-[48px] mx-10">CHATTER</h1>
{/* 
      <nav className="ml-[13%] mr-[15%]">
        <ul className="flex gap-[18px]">
          <li
            className={`text-[16px] leading-[24px] text-[#111] font-[700]  ${pathname === '/' ? 'underline' : ''
              }`}
          >
            <Link href="/">
              Home
            </Link>
          </li>
          <li
            className={`text-[16px] leading-[24px] text-[#111] font-[700]  ${pathname === '/about' ? 'underline' : ''
              }`}
          >
            <Link href="/about">
              About us
            </Link>
          </li>
          <li
            className={`text-[16px] leading-[24px] text-[#111] font-[700]  ${pathname === '/contact' ? 'underline' : ''
              }`}
          >
            <Link href="/contact">
              Contact
            </Link>
          </li>
          <li
            className={`text-[16px] leading-[24px] text-[#111] font-[700]  ${pathname === '/blogs' ? 'underline' : ''
              }`}
          >
            <Link href="/blogs">
              Blogs
            </Link>
          </li>
        </ul>
      </nav> */}
      <div className="h-[56px] flex gap-[7.1%]">
        <WhiteButton onClick={() => setSignInView('Login')}>
          Log in
        </WhiteButton>
        <BlueButton onClick={() => setSignInView('Sign in')}>
          Sign up
        </BlueButton>
      </div>
    </header>
  );
}
