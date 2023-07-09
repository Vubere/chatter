"use client";

/* hooks */

import { useForm } from "react-hook-form"
import { useAppDispatch } from "@/state/hooks"
import { useState } from "react"
import { useRouter } from "next/navigation"


/* next elements */
import Image from 'next/image'

/*custom components  */
import { BlueButton, WhiteButton } from "../Buttons"
import PwdInput from "../InputPwdVisibilityToggle"
import Alert, { alertType } from "../Alert"


/*  assets and icons*/
import linkedInIcon from '@/icons/linkedIn.svg'
import googleIcon from '@/icons/google.svg'

/* services */
import userServices from "@/app/services/userServices"
import { encrypt } from "@/app/services/encyptionServices";

/* types */
import { requiredUserDetails } from "@/types"
import errorServices from "@/app/services/errorServices"
/* redux */
import { setUser } from "@/state/reducers/userSlice";



type signupForm =  requiredUserDetails & {
  confirmPassword: string
}


export default function SignUp() {
  const dispatch = useAppDispatch()
  const { register, watch, handleSubmit,formState: { errors, isLoading, isValid } } = useForm<signupForm>()
  const router = useRouter()
  /* alert */
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<alertType>('')
  const [alertMessage, setAlertMessage] = useState<string>('')


  const configureAlert = (type: alertType, message: string, fn?: ()=>any) => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      if(fn)
      fn()
    }, 2000)
  }

  const onSubmit = async (data: signupForm) => {
  
    const user = await userServices.register(data)

    if(!user?.error){
      dispatch(setUser({...user.user, password: encrypt(data.password)}))

      localStorage.setItem('chatterUser', JSON.stringify({...user.user, password: encrypt(data.password)}))

      configureAlert('success','User registered successfully', ()=>{
        router.push('/dashboard')
      })
    }else{
      const err = user.err

      if(typeof err =='object'&&typeof err.keyPattern=='object'){

        const keys = Object.keys(err?.keyPattern)

        let errMessage = ''
        keys.map(key=>{
          const errM = errorServices.getErrorMessage(err?.code) 
          errMessage += ` ${key}: ${err?.keyValue[key]} ${errM}`
        })
        configureAlert('error',errMessage)


        
        console.log(user.error)
        console.log(user)
      }
    }
  }
  

  return (
    <div className="py-6 ">
      <h1 className="font-[500] text-[32px] leading-[48px] text-center mb-6">Register as a Writer/Reader</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
        <div className="w-full flex justify-between">
          <div className="w-[48.46%] flex flex-col gap-2">
            <label htmlFor="firstName" className="text-[16px] ">First name</label>
            <input className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" type="text" id="firstName" placeholder="Enter first name" {...register('firstName', {
              required: true, minLength: {
                value: 3,
                message: 'Enter a Valid Name'
              }
            })} />
            { errors.firstName?.message &&
              <p className="border border-red p-1">
                {errors.firstName?.message}
              </p>
            }
          </div>
          <div className='w-[48.46%] flex flex-col gap-2'>
            <label htmlFor="lastName">Last name</label>
            <input className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" placeholder="Enter last name" type="text" id="lastName" {...register('lastName', {
              required: true, minLength: {
                value: 3,
                message: 'Enter a Valid Name'
              }
            })} />
            {  errors.lastName?.message &&
              <p className="border border-red p-1">
                {errors.lastName?.message}
              </p>
            }
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="profession">Profession</label>
          <input className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" id="profession" {...register('profession', {
            required: true, minLength: {
              value: 1,
              message: 'Enter a Valid Profession'
            }
          })} placeholder="Writer, Web developer, Engineer..."/>
        </div>
        { errors.profession?.message &&
          <p className="border border-red p-1">
            {errors.profession?.message}
          </p>
        }
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" placeholder="Enter your email"  {...register('email', {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter a valid email',
            },
          })}
          />
          { errors.email?.message &&
            <p className="border border-red p-1">
              {errors.email?.message}
            </p>
          }
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <PwdInput className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" placeholder='Password' type="password"
          {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          { errors.password?.message &&
            <p className="border border-red p-1">
              {errors.password?.message}
            </p>
          }
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm password</label>
          <PwdInput className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value === watch('password', '') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword?.message &&
            <p className="border border-red p-1">
              {errors.confirmPassword?.message}
            </p>
          }
        </div>
        <div>
          <BlueButton className="w-full h-[47px]" type='submit' disabled={isLoading}>
            {isLoading?'...registering':"Create account"}
          </BlueButton>
        </div>
      </form>
      <div className="my-3">
        <WhiteButton className="w-full h-[47px] flex items-center justify-center gap-2">
          <Image src={googleIcon} alt="google icon"/>
          Sign up with google
        </WhiteButton>
      </div>
      <div className="my-3">
        <WhiteButton className="w-full h-[47px] flex items-center justify-center gap-2">
          <Image src={linkedInIcon} alt = 'linkedIn Icon'/>
          Sign up with LinkedIn
        </WhiteButton>
      </div>
      {showAlert&&<Alert message={alertMessage} type={alertType} close={()=>setShowAlert(false)}/>}
    </div>
  )
}


