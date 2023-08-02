'use client'

import { useGetUserQuery, useUpdateUserInterestMutation } from "@/state/api/api"
import { useAppSelector } from "@/state/hooks"
import { useState } from "react"

export default function AddInterest() {
  const u = useAppSelector((state) => state.user)
  const { data: user, isLoading, isFetching } = useGetUserQuery(u ? u?._id : '')
  const [
    updateUserInterface
  ] = useUpdateUserInterestMutation()

  const [int, setInt] = useState('')
  const [interest, setInterest] = useState<string[]>(user && user?.interest ? user.interest : [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const int: string[] = Array.from(new Set([...user.interest, ...interest]))
      try{
        const h = await updateUserInterface({_id:user._id, interest:int})
        
        if('data' in h){
          console.log(h.data)
        }else{
          console.log(h)
        }
      }catch(err){
        console.log(err)
      }


    }
  }
  const addVal = () => {
    if (int.length)
      setInterest(prev => [...prev, int])
  }

  const removeVal = (index: number) => {
    setInterest(prev => prev.filter((_, i) => i != index))
  }

  return (

    <section>
      <p>What is your interest...</p>
      <div>
        <div className="flex gap-2 ">
          <input placeholder="add interest..." value={int} onChange={({ target }) => setInt(target.value)} />
          <button onClick={addVal}>Add</button>
        </div>
      </div>
      {
        interest.map((item, index) => (
          <p key={index}>
            <span>
              {item}
            </span>
            <button onClick={() => removeVal(index)}>
              x
            </button>
          </p>
        ))
      }
      <button>Update Interest</button>
    </section>
  )
}