'use client'
/* react, next imports */
import { useState } from "react"
import { Metadata } from "next"

/* next components */
import Head from "next/head"

/* custom components */
import BackgroundImg from "../components/ImageInBackground"
import Login from "../components/signInPage/Login"
import SignUp from "../components/signInPage/SignUp"

/* assets */
import bgImg from '@/assets/signUpPage/bgImg.png'





export default function SignIn() {
  let ses:any = 'Sign up'
  if(typeof window !== 'undefined')
  ses = sessionStorage.getItem('suv')
  
  if (!ses) {
    ses = 'Login'
  }
  const [curView, setCurView] = useState(ses)

  const setSignInView = (view: string) => {
    sessionStorage.setItem('suv', view)
    setCurView(view)
  }

  return (
    <>
      <main className="flex w-[100vw] h-[100vh] ">
        <BackgroundImg src={bgImg} className="w-[100vw] max-w-[622px] min-h-[100vh] ">
          <div className="w-full min-h-[100vh] bg-[#1117] flex justify-center items-center">
            <div className="w-[90%] ">
              <h1 className="font-[700] text-[48px] leading-[72px] text-white text-center mb-4" >CHATTER</h1>
              <p className="text-[24px] leading-[36px] font-[500] text-white">Unleash the Power of Words. Connect with Like-minded Readers and Writers</p>
            </div>
          </div>
        </BackgroundImg>
        <div className="w-full p-4 flex flex-col items-center h-full ">
          <div className="w-[95%] max-w-[520px]">
            <header className="w-full h-[50px]">
              <nav className="w-full">
                <ul className="w-full flex">
                  <li className="w-[50%]">
                    <button className={`w-full text-start border-b-4 ${curView == "Sign in" ? 'border-[#543ee0]' : "border-[#0003]"} pb-2`} onClick={() => setSignInView('Sign in')}>

                      REGISTER
                    </button>
                  </li>
                  <li className="w-[50%]">
                    <button className={`w-full text-end border-b-4 ${curView == "Login" ? 'border-[#543ee0]' : "border-[#0003]"} pb-2`} onClick={() => setSignInView('Login')}>
                      LOG IN
                    </button>
                  </li>
                </ul>
              </nav>
            </header>
            <div className="max-h-[100vh] overflow-y-auto " style={{'height':'calc(100vh - 50px)'}}>
              {
                curView == 'Login' ? <Login /> : <SignUp />
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}