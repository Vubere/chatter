
import { redirect } from "next/navigation"

export default function BlogRedirect(){
  redirect('/dashboard')
  
  return (null)
}