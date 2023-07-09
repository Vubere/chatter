
/* next components */
import Link from 'next/link'


export default function Footer() {

  return (
    <footer className="bg-[#ffedcc] flex gap-[120px] min-h-[402px] pt-14 min-w-[100vw]">
      <div className='px-10 '>
        <h2 className="font-[700] text-[48px] leading-[72px] text-[#543ee0]  ">
          CHATTER
        </h2>
      </div>
      <div className="flex justify-between w-[95%] max-w-[800px] gap-4">
        {footerRows.map((row, i) => (
          <div key={i}>
            <h3 className='text-[24px] leading-[36px] font-[500] mb-4'>{row.heading}</h3>
            <ul>
              {row.list.map((list, i) => (
                <li key={i} className='font-[18px] leading-[27px] text-[#111] mb-2'>
                  <Link href={list.link}>
                    {list.text}
                  </Link>
                </li>))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}


const footerRows = [
  {
    heading: 'Explore',
    list: [
      {
        text: 'Community',
        link: ''
      },
      {
        text: 'Trending blogs',
        link: ''
      },
      {
        text: 'Chatter for teams',
        link: ''
      },
    ]
  },
  {
    heading: 'Support',
    list: [
      {
        text: 'Support docs',
        link: ''
      },
      {
        text: 'Join slack',
        link: ''
      },
      {
        text: 'Contact',
        link: ''
      },
    ]
  },
  {
    heading: 'Official blog',
    list: [
      {
        text: 'Official blog',
        link: ''
      },
      {
        text: 'Engineering blog',
        link: ''
      },
    ]
  },
]