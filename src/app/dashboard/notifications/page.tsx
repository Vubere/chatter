import FloatingButton from "@/app/components/PostContentFloatingButton";
import { useState } from "react";




export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([])

  return (
    <>
      <main>
        <h1 className="font-[700] text-[32px] nb-8">Notifcations</h1>
        <div>
          {notifications.length==0&&<p>No notifications</p>}
          {notifications.map((notif)=>null)}
        </div>
      </main>
      <FloatingButton />
    </>
  )
}