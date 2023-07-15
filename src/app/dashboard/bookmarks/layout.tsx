import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'Bookmarks',
    description: 'Bookmark page',
    keywords: 'bookmarks, user, chatter'
  }
}

export default function bookMarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}