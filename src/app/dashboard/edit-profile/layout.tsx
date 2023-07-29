import AuthRedirect from '@/app/components/AuthRedirect'
import { Metadata } from 'next'



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'Edit Profile',
    description: 'Edit your profile',
    keywords: 'profile, user, chatter, edit'
  }
}