import FloatingButton from "@/app/components/PostContentFloatingButton"



export const metadata = {
  title: "Chatter | Blog",
  description: "Blog page",
  slug: "/drafts",
  date: new Date("2020-01-01T00:00:00.000Z"),
}


export default function DraftsLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
      <FloatingButton />
    </>
  )
}