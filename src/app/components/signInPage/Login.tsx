/* hooks */
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import {useRouter} from 'next/navigation'
import { useAppDispatch } from '@/state/hooks';

/* next components */
import Image from 'next/image';

/* custom components */
import PwdInput from '../InputPwdVisibilityToggle';
import { BlueButton, WhiteButton } from '../Buttons';

/* assets and icons */
import googleIcon from '@/icons/google.svg'
import linkedInIcon from '@/icons/linkedIn.svg'

/* services */
import userServices from '@/app/services/userServices';
import errorServices from '@/app/services/errorServices';
import { encrypt } from '@/app/services/encyptionServices';

/* rtk */
import { setUser } from '@/state/reducers/userSlice';
import Alert, { alertType } from '../Alert';

interface loginForm {
  email: string,
  password: string,
}


export default function Login() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<loginForm>()
  const router = useRouter()
  const dispatch = useAppDispatch()
  /* alert */
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<alertType>('')
  const [alertMessage, setAlertMessage] = useState<string>('')


  const configureAlert = (type: alertType, message: string, fn?: () => any) => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      if (fn)
        fn()
    }, 2000)
  }


  const onSubmit = async (data: loginForm) => {

    const res = await userServices.login(data.email, data.password)
    

    if (!res?.error) {
      dispatch(setUser({ ...res.user, password: encrypt(data.password) }))
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('chatterUser', JSON.stringify({ ...res.user, password: encrypt(data.password) }))
      }

      configureAlert('success', 'User logged in successfully', () => {
        router.push('/dashboard')
      })
    } else {
      console.log(res)
      configureAlert('error', res.message||"An error occured")

      
    }
  }



  return (
    <div className='py-6'>
      <h1 className="font-[500] text-[32px] leading-[48px] text-center mb-6">Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-6'>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" placeholder="Email address" type="email" id="email" {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter a valid email',
            },
            required: true
          })} />
          {
            errors.email?.message&&(
              <p>
                {errors.email?.message}
              </p>
            )
          }
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <PwdInput className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" placeholder='Password' type="password"  {...register('password', {
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long'
            }, required: true, 
          })} />
          {
            errors.password?.message&&(
              <p>
                {errors.password?.message}
              </p>
            )
          }
        </div>
        <div>
          <BlueButton className="w-full h-[47px]" type='submit'>
            Log in
          </BlueButton>
        </div>
      </form>
      <div className="my-3">
        <WhiteButton className="w-full h-[47px] flex items-center justify-center gap-2">
          <Image src={googleIcon} alt="google icon" />
          Log in with google
        </WhiteButton>
      </div>
      <div className="my-3">
        <WhiteButton className="w-full h-[47px] flex items-center justify-center gap-2">
          <Image src={linkedInIcon} alt='linkedIn Icon' />
          Log in with LinkedIn
        </WhiteButton>
      </div>
      {showAlert&&<Alert type={alertType} message={alertMessage} close={()=>setShowAlert(false)} />}
    </div>
  )
}