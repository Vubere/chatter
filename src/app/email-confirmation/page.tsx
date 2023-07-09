'use client'

/* hooks */
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'

/* custom components */
import { BlueButton } from "../components/Buttons"
import BackgroundImg from "../components/ImageInBackground"

/* assets and icons */
import bgImg from '@/assets/signUpPage/bgImg.png'

interface formType {
  one: number,
  two: number,
  three: number,
  four: number
}
// ... imports and other parts of your code ...

export default function EmailConfirmation() {
  const [values, setValues] = useState<string[]>(["", "", "", ""]);

  const changeInputFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let { value } = e.target;
    if(value.length>1){
      value = value[value.length-1]
      e.target.value = value
    }

    if (value.length > 0 && index < 3) {
      const nextInput = document.getElementById(`input-${index + 2}`) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`input-${index}`) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
      }
    }

    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const joinedValues = values.join("");

    // Perform any additional validation logic here

    // Example validation: Minimum password length of 6 characters
    if (joinedValues.length < 6) {
      console.log("Password should be at least 6 characters long");
      return;
    }

    // Submit the form or perform further actions
    console.log("Form submitted");
  };

  // ... rest of your code ...

  return (
    <main className='flex w-full h-full'>
      <BackgroundImg src={bgImg} className="w-[100vw] max-w-[622px] min-h-[100vh] ">
        <div className="w-full min-h-[100vh] bg-[#1117] flex justify-center items-center">
          <div className="w-[90%] ">
            <h1 className="font-[700] text-[48px] leading-[72px] text-white text-center mb-4" >CHATTER</h1>
            <p className="text-[24px] leading-[36px] font-[500] text-white">Unleash the Power of Words. Connect with Like-minded Readers and Writers</p>
          </div>
        </div>
      </BackgroundImg>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className='w-[95%] max-w-[554px] flex flex-col align-center'>
          <h1 className='font-[500] text-[32px] leading-[48px] mb-2 text-center'>Enter confirmation code</h1>
          <p className='leading-[24px] text-[14px] text-center text-[#626262] mb-6 w-full'>We emailed you a code. Please input the code here for account verification.</p>
          <form className="w-full flex flex-col items-center align-center" onSubmit={handleSubmit}>
            <div className="flex gap-4 w-[95%] max-w-[484px] gap-[20px] mb-8">
              {values.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  id={`input-${index + 1}`}
                  value={value}
                  onChange={(e) => changeInputFocus(e, index)}
                  className="w-[24%] max-w-[24%] h-[80px] border border-[#212529] rounded-[8px] flex items-center justify-center text-center text-[28px] outline-none"
                />
              ))}
            </div>
            <BlueButton className="w-[95%] h-[56px] text-[18px] leading-[27px]" >
              Create account
            </BlueButton>
          </form>
        </div>
      </div>
    </main>
    // ... rest of your code ...
  );
}
