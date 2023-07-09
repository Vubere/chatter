"use client";

/* hooks */
import { useAppDispatch } from '@/state/hooks'
import { removeUser } from '@/state/reducers/userSlice'
import { useRouter } from 'next/navigation'


function Logout() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const logout = () => {
    if(typeof window !== 'undefined') {
      window.localStorage.removeItem('chatterUser')
      dispatch(removeUser())
      router.push('/login')
    }
  }
  return (
    <section className='w-[80%] pl-4'>

      <button className='text-[#ff1400] text-[18px] leading-[27px]' onClick={logout}>
        Log out
      </button>

    </section>
  )
}

export default Logout