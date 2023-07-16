'use client';
/* hooks */
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import userServices from "../services/userServices";
import { setUser } from "@/state/reducers/userSlice";



export default function AuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('chatterUser')
    if (token) {
     // localStorage.removeItem('chatterUser')
      const fetched = sessionStorage.getItem('chatterSession')
      if (!fetched) {
        const id = JSON.parse(token)._id as string
        const res = userServices.getUser(id)
        res.then((res) => {
          dispatch(setUser(res.user))
          console.log(res)
          localStorage.setItem('chatterUser', JSON.stringify(res.user))
          sessionStorage.setItem('chatterSession', 'true')
        }).catch((err) => {
          router.push('/sign-in')
        })
      }
      if (!pathname.includes("/dashboard")) {
        router.push('/dashboard')
      }
    } else {
      router.push('/sign-in')
    }
  }, [router, pathname, dispatch])

  return null
}