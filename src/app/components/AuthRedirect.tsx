'use client';
/* hooks */
import { useEffect } from "react"
import { useRouter } from "next/navigation"



export default function AuthRedirect() {
  const router = useRouter()


  useEffect(() => {
    if(typeof window === 'undefined') return
    const token = localStorage.getItem('chatterUser')
    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/sign-in')
    }
  }, [router])

  return null
}