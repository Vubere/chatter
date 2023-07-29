"use client"
/* hooks */
import { useAppSelector } from "@/state/hooks"

/* next components */
import Image from "next/image"
import Link from "next/link"

/* custom components */
import Avatar from "../../Avatar"
import { BlueButton } from "../../Buttons"

/* assets */
import edit from '@/icons/pencil.svg'
import { User } from "@/types"




export default function UserDetails({ user }: { user: User }) {



  return (
    <section className="flex gap-4 items-center shadow p-4 border mb-4 flex-col">
      <div className="flex gap-6 items-center w-full">
        <div className="min-w-[100px] h-[70vw] w-[70vw] max-w-[200px] max-h-[200px] relative border rounded-full">
          <Avatar src={user.avatar} fill={true} />
        </div>
        <div>
          <h2 className="font-[700] text-[32px]">{user.firstName}{' '}{user.lastName}{' '}<span className="font-[400] text-[16px] text-[#626262] mr-4">-{' '}{user.profession}</span></h2>
          <p>{user.email}</p>

        </div>
      </div>


      <article className="w-full">
        <h4 className="h-full font-bold">Biography</h4>
        <div>
          <p>{user.bio || <span>...no bio</span>}</p>
        </div>
        <div className="w-full flex flex-col items-end">
          <Link href="/dashboard/account/edit">
            <BlueButton className="w-[40px] h-[25px] flex items-center justify-center">
              <Image src={edit} alt='edit' className="w-[20px] h-[15px]" />
            </BlueButton>
          </Link>
        </div>
      </article>

    </section>
  )
}