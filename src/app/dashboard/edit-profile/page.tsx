'use client'

import { useForm } from "react-hook-form"

import ImageUploadButton from "@/app/components/UploadImage"
import { useAppSelector } from "@/state/hooks"

import {User} from '@/types/index'
import AuthRedirect from "@/app/components/AuthRedirect"

type IUser = User & {_id: string}

export default function EditProfile() {
  const user = useAppSelector<IUser|null>(state=>state.user)
  const { register, formState: { isValid, isSubmitSuccessful, isLoading, errors, submitCount, touchedFields }, getValues, handleSubmit } = useForm()
  const values = getValues()

  const onSubmit = (data: any) => {
    
  }
  const uploadImage = (img:any[], err?:string|undefined) => {
    if(err){
      console.log(err)
    }
    console.log(img)
  }
  
  if(!user){
    return <AuthRedirect/>
  }

  return (
    <main>
      <h1>Update Profile</h1>
      <div>
        <h2>Change Avatar</h2>
        <ImageUploadButton fn={uploadImage}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName"></label>
          <input type="text" {...register('firstName', {
            required: true
          })} />
        </div>
        <div>
          <div>
            <label htmlFor="firstName"></label>
            <input type="text" {...register('firstName', {
              required: true
            })} />
          </div>
          <div>
            <label htmlFor="lastName"></label>
            <input type="text" {...register('lastName', {
              required: true
            })} />
          </div>
        </div>
        <div>
          <label htmlFor="profession"></label>
          <input type="text" {...register('profession', {
            required: true
          })} />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input type="text" {...register('email', {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email"
            }
          })} />
        </div>
      </form>
    </main>
  )
}