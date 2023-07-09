import {Metadata} from 'next'



export default function Layout({children}:{children: React.ReactNode}) {
  return(
    <>
      {children}
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  
  return {
    title: 'Profile',
    description: 'Profile page',
    keywords: 'profile, user, chatter'
  }
}