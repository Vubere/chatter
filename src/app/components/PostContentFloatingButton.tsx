import { BlueButton } from "./Buttons";
import Image from 'next/image'
import Link from 'next/link'

import add from '@/icons/add_white.png'

export default function FloatingButton() {

  return (
    <Link href='dashboard/create-blog' className="absolute bottom-[60px] right-4 z-20">
      <BlueButton className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
        <span className="block relative w-[35px] h-[35px]">
          <Image src={add} fill={true} alt="add content"  />
        </span>
      </BlueButton>
    </Link>
  )
}