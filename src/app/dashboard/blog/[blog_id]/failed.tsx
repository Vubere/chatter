'use client'
import { redirect, useRouter } from "next/navigation";



export default function NoBlog() {
  const router = useRouter()
  router.back()
  return null
}