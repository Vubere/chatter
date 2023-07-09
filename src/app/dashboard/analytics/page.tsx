

/* types  */
import { BlueButton } from "@/app/components/Buttons"
import { Post } from "@/app/components/Dashboard/feed"
import { fakeFeed, fakeUser } from "@/fakedata"



export default function Analytics() {

  const post = fakeFeed[0]
  const totalImpressions = fakeFeed.reduce((acc, curr) => acc + curr.views, 0)

  return (
    <main className="px-8 h-[100vh] overflow-auto pb-[20vh]">
      <h1 className="text-[32px] leading-[48px] text-[#111] mb-4 font-[600]"> Posts Analytics</h1>
      <div className="mb-4 pb-6 border-b-[5px] border-[#7664e6]">
        <p className="font-[500]">
          <span className="text-[32px]">{post.date}</span>, <span className="ml-2 text-[24px] text-[#626262] font-[500]">25 days so far</span>
        </p>
      </div>
      <p className="font-[500] text-[24px] leading-[36px] mb-6">Post highlights</p>
      <p className="mb-4"><span className="font-[500] text-[32px]">Top posts</span> <span className="text-[24px] text-[#626262] ml-2">earned {post.views} impressions</span></p>
      <div className="max-w-[700px] mb-6">
        <Post feed={post} />
      </div>

      <BlueButton className="mb-6">
        View post actvity
      </BlueButton>

      <div className="pb-4 border-b-[5px] border-[#7664e6] mb-6">
        <h4 className="text-[24px] font-[600] text-[#111]">Posts summary</h4>
      </div>
      <ul className="flex justify-around ">
        <li className="text-[#111] text-[22px]  flex flex-col items-center">Posts <span className="text-[24px] text-[#111] font-[600]">{fakeFeed.length}</span></li> 
        <li className="text-[#111] text-[22px]  flex flex-col items-center">Posts impressions <span className="text-[24px] text-[#111] font-[600]">{totalImpressions}</span></li>
        <li className="text-[#111] text-[22px]  flex flex-col items-center">Profile visits <span className="text-[24px] text-[#111] font-[600]">{fakeUser.profileViews}</span></li>
      </ul>
    </main >
  )
}
