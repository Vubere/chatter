import { BlueButton } from "./Buttons";
import Image from 'next/image'
import Link from 'next/link'

import add from '@/icons/add.svg'

export default function FloatingButton() {

  return (
    <Link href='dashboard/create-blog' className="absolute bottom-[60px] right-4 z-20">
      <BlueButton className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
        <Image src={add} alt="add content" className="w-[35px] h-[35px]"/>
      </BlueButton>
    </Link>
  )
}