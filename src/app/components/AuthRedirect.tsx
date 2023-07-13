'use client';
/* hooks */
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"



export default function AuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()



  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('chatterUser')
    if (token) {
      if (!pathname.includes("/dashboard")) {
        router.push('/dashboard')
      }
    } else {
      router.push('/sign-in')
    }
  }, [router, pathname])

  return null
}