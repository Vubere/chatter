
/* custom components */
import Topbar from "../components/Dashboard/header"
import Sidebar from "../components/Dashboard/sidebar"



export const metadata = {
  title: 'Chatter|Dashboard',
  description: 'User Dashboard',
  keywords: 'Dashboard, Chatter, Blog, Write, Read'
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <div>
          <Topbar />
        </div>
        <div>
          <Sidebar />
        </div>
        <div className="absolute left-[260px] top-[100px]  pl-4 h-[90vh] ml-auto w-[75%] ">
          {children}
        </div>
      </div>
    </>
  )
}