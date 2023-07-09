/* hooks */
import { useForm } from 'react-hook-form'


/* next components */
import Image from 'next/image';

/* custom components */
import PwdInput from '../InputPwdVisibilityToggle';
import { BlueButton, WhiteButton } from '../Buttons';

/* assets and icons */
import googleIcon from '@/icons/google.svg'
import linkedInIcon from '@/icons/linkedIn.svg'
import { error } from 'console';


interface loginForm {
  email: string,
  password: string,
}


export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<loginForm>()

  const onSubmit = (data: loginForm) => {

  }

  console.log(errors)


  return (
    <div className='py-6'>
      <h1 className="font-[500] text-[32px] leading-[48px] text-center mb-6">Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-6'>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" placeholder="Email address" type="email" id="email" {...register('email', {
            required: true, validate: (val: string) => {
              let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
              if (val.match(pattern)) {
                return ''
              } else {
                return 'Enter a valid email'
              }
            }
          })} />
          {
            errors.email?.type=='validate'&&errors.email?.message!=undefined&&errors.email?.message.length>0&&
            <p>{errors.email?.message}</p>
          }
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <PwdInput className="w-full h-[56px] border border-[#212529] py-[10px] px-[16px] text-[16px] leading-[24px] rounded-[4px] focus:outline-none focus:border-[#212529]" placeholder='Password' type="password"  {...register('password', {
            required: true, validate:(val:string)=> {
              if(val.length<6){
                return 'Password must have at least 6 characters'
              }
              return ''
            }
          })} />
          {
            errors.password && errors.password.type === 'minLength' && (
              <span>Password must be at least 6 characters long</span>
            )
          }
        </div>
        <div>
          <BlueButton className="w-full h-[47px]">
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
    </div>
  )
}