
import { Metadata } from 'next'
/* next components */
import Image from 'next/image'
import Link from 'next/link'

/* custom components */
import Header from '@/app/components/LandingPage/header'
import Footer from '@/app/components/LandingPage/Footer'
import BackgroundImg from './components/ImageInBackground'
import { BlueButton } from './components/Buttons'

/* assets */
import hero from '@/assets/landingPage/hero.png'
import about from '@/assets/landingPage/about.png'
import avatar from '@/assets/landingPage/avatarReviewer.png'
import avatarR from '@/assets/landingPage/avatarRight.png'
import avatarL from '@/assets/landingPage/avatarBottomLeft.png'
import avatarLt from '@/assets/landingPage/avatarTopLeft.png'

/* icons */
import analysisIcon from '@/icons/analytics.svg'
import peopleIcon from '@/icons/people.svg'
import documentIcon from '@/icons/document.svg'


export const metadata:Metadata = {
  title: 'Chatter|Landing Page',
  description: ''
}

export default function Home() {

  
  return (
    <div>
      <Header />

      <main className='w-[100vw] h-[100vh] overflow-x-hidden overflow-y-auto min-w-[100vw]'>
        <Hero />
        <About />
        <WhyJoin />
        <Reviews />
        <Expo />
        <Footer />
      </main>
    </div>
  )
}


function Hero() {
  return (
    <BackgroundImg src={hero} className='w-[100vw] h-[700px] mb-20'>
      <div className='w-full h-full bg-[#0004] flex items-center justify-center flex-col'>
        <div className='w-[90%] max-w-[984px]'>
          <h2 className='w-full font-[700] text-[48px] leading-[72px] text-white mb-[10px]'>
            Welcome to Chatter: A Haven for Text-Based Content
          </h2>
          <p className='text-[24px] font-[500] leading-[36px] text-white w-[70%]'>
            Unleash the Power of Words, Connect with Like-minded Readers and Writers
          </p>
          <Link href={'/sign_up'} className='mt-8 block w-[157px]'>
            <BlueButton>
              Get started
            </BlueButton>
          </Link>
        </div>
      </div>
    </BackgroundImg>
  )
}

function About() {
  return (
    <article className='mx-auto mt-16 gap-16 w-[90%] flex mb-20'>
      <div className='flex flex-col gap-7 w-[60%] '>
        <h3 className='font-[700] text-[48px] leading-[72px] w-full'>About Chatter</h3>
        <p className='text-[18px] leading-[27px] w-full'>Chatter is a multi-functional platform where authors and readers can have access to their own content. It aims to be a traditional bookworm&sbquo;s heaven and a blog to get access to more text based content. Our vision is to foster an inclusive and vibrant community where diversity is celebrated. We encourage open-mindedness and respect for all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and understanding, we strive </p>
      </div>
      <Image src={about} alt='people' />
    </article>
  )
}

function WhyJoin() {
  return (
    <article className='w-[90%] max-w-[1040px] mx-auto flex flex-col items-center mb-20'>
      <h3 className='font-[700] text-[48px] leading-[72px] pb-6'>Why you should join chatter</h3>
      <p className='text-[18px] leading-[27px]'>Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in interactions, connecting with like-minded peers, have access to favorite content based on interests and able to communicate your great ideas with people</p>
      <div className='flex mt-6 gap-4 justify-between'>
        <section className='w-[30%] border border-[#d0d0d088] max-w-[306px] min-w-[270px] h-[324px] rounded-[6px] p-4'>
          <div className='w-[92px] h-[88px] rounded-full bg-[#d6d1f8] flex items-center justify-center mb-2'>
            <Image src={analysisIcon} alt='graph' className='w-[32px] h-[32px]' />
          </div>
          <h4 className='font-[500] text-[24px] leading-[36px] mb-2'>Analytics</h4>
          <p className='text-[18px] leading-[27px] text-[#626262]'>
            Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time
          </p>
        </section>

        <section className='w-[30%] border border-[#d0d0d088] max-w-[306px] min-w-[270px] h-[324px] rounded-[6px] p-4'>
          <div className='w-[92px] h-[88px] rounded-full bg-[#d6d1f8] flex items-center justify-center mb-2'>
            <Image src={peopleIcon} alt='graph' />
          </div>
          <h4 className='font-[500] text-[24px] leading-[36px] mb-2'>Social interactions</h4>
          <p className='text-[18px] leading-[27px] text-[#626262]'>
            Users on the platform can interact with posts they like, comment and engage in discussions
          </p>
        </section>
        <section className='w-[30%] border border-[#d0d0d088] max-w-[306px] min-w-[270px] h-[324px] rounded-[6px] p-4'>
          <div className='w-[92px] h-[88px] rounded-full bg-[#d6d1f8] flex items-center justify-center mb-2'>
            <Image src={documentIcon} alt='graph' />
          </div>
          <h4 className='font-[500] text-[24px] leading-[36px] mb-2'>Content creation</h4>
          <p className='text-[18px] leading-[27px] text-[#626262]'>
            Write nice and appealing with our in-built markdown, a rich text editor
          </p>
        </section>
      </div>

    </article>
  )
}

function Reviews() {
  return (
    <section className='w-full flex align-center py-[80px] mt-10 px-40px bg-[#ffedcc] mb-20'>
      <div className='w-[92%] mx-auto flex gap-12'>
        <Image src={avatar} alt='avatar' className='w-[300px] h-[300px] rounded-full' />
        <article className=''>
          <p className='text-[18px] leading-[27px] text-[111] mb-14'>&quot;Chatter has become an integral part of my online experience. As a user of this incredible blogging platform, I have discovered a vibrant community of individuals who are passionate about sharing their ideas and engaging in thoughtful discussions.&quot;</p>
          <div className='mb-10'>
            <h4 className='font-[500] leading-[48px] text-[32px]'>Adebobola Muhydenn, <span className='leading-[27px] text-[18px] font-[400]'>Software developer at Apple</span></h4>
          </div>
          <BlueButton className='w-[157px] h-[56px] text-[18px] font-[700]'>
            Join Chatter
          </BlueButton>
        </article>
      </div>
    </section>
  )
}

function Expo() {

  return (
    <section className='w-[92%] max-w-[1294px] flex mx-auto gap-[100px] mb-16'>
      <div className='h-[412px] w-[90vw] max-w-[352px] relative'>
        <Image src={avatarLt} alt='' className='absolute left-0 top-0 rounded-full w-[155px] h-[155px]' />
        <Image src={avatarL} alt='' className='absolute left-0 bottom-0 rounded-full w-[155px] h-[155px]' />
        <Image src={avatarR} alt='' className='absolute right-0 top-[50%] translate-y-[-50%] rounded-full w-[155px] h-[155px]' />
      </div>
      <article>
        <h4 className='text-[48px] leading-[72px] font-[700] text-[#111] mb-4'>Write, read and connect with great minds on chatter</h4>
        <p className='text-[18px] leading-[27px] mb-10'>Share people your great ideas, and also read write-ups based on your interests connect with people of same interests and goals</p>
        <Link href={''} className='w-[157px]'>
          <BlueButton className='text-[18px] '>
            Get Started
          </BlueButton>
        </Link>
      </article>
    </section>
  )
}

