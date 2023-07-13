'use client'
/* hooks */
import React, { useEffect, useState } from "react";
/* libray elements */
import Image from 'next/image'
import Markdown from "marked-react";
/* custom elements */
import { BlueButton, GreenButton } from "@/app/components/Buttons";

/* images */
import add from "@/icons/add.svg";

/* helpers */
import { blogElements, blogElementsCat } from "./_helpers";

const {
  newLineElements,
  insertElements,
} = blogElementsCat;

const markdownText = `
# Header
This is a **bold** paragraph.
![Image](https://randomuser.me/api/portraits/men/1.jpg)
- List item 1
- List item 2
> Quote
\`\`\`console.log("Code block");\`\`\`\n
[Link](https://example.com)\n
---
*Italic*\n
## Header 2
`;




export default function CreatePost() {
  const [currentType, setCurrentType] = useState<string>('header')
  const [text, setBlogText] = useState('')
  const [header, setBlogHeader] = useState('')

  const [showElementPopup, setShowElementPopup] = useState(false)
  const [linkPopup, setLinkPopup] = useState(false)
  const [insert, setInsert] = useState<{
    type: string,
    role: 'newLine' | 'inLine'
  }>({ type: 'newLine', role: 'newLine' })
  const [showInsertPopup, setShowInsertPopup] = useState(false)



  const handleSetNewLineEl = (type: string) => {
    setCurrentType(type)
    setShowElementPopup(false)
    setBlogText(prev => prev + '\n' + blogElements[type].mdElement)
  }
  const handleSetInlineEl = (type: string) => {
    setCurrentType(type)
    setShowElementPopup(false)
    setBlogText(prev => prev + ' ' + blogElements[type].mdElement)
  }
  const handleInsertElement = (role: 'inLine' | 'newLine', type: string, text: string) => {
    const { generateMarkdown } = blogElementsCat.insertElements[type]
    setShowInsertPopup(false)
    setShowElementPopup(false)
    if (role == 'newLine') {
      if (generateMarkdown) {
        setBlogText(prev => prev + '\n' + generateMarkdown(text))
      }
    } else {
      if (generateMarkdown) {
        setBlogText(prev => prev + ' ' + generateMarkdown(text))
      }
    }
  }
  const openInsertElement = (type: string, role: 'inLine' | 'newLine') => {
    setInsert({ type, role: role })
    setShowInsertPopup(true)
  }

  const handleSetInsert = (type: string) => {
    switch (type) {
      case 'image': ;
      case 'link': setLinkPopup(true); break;
      case 'code block': openInsertElement(type, 'newLine'); break;
      case 'quote': openInsertElement(type, 'newLine'); break;
      case 'bold': openInsertElement(type, 'inLine'); break;
      case 'italic': openInsertElement(type, 'inLine'); break;
      case 'list': openInsertElement(type, 'inLine'); break;
      default: break;
    }

  }

  const onLinkSubmit = (linkUrl: string, linkText: string) => {
    const pattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    if (!pattern.test(linkUrl)) {
      return 'Enter a valid url. hint: link must contain http:// or https://'
    }
    if (linkText.length < 1) {
      return 'Enter a valid link text'
    }
    let linkU = linkUrl
    if (!linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
      linkU = 'http://' + linkUrl
    }
    const val = `[${linkText}](${linkU})`
    setBlogText(prev => prev + ' ' + val)
    setLinkPopup(false)
    setShowElementPopup(false)
  }

  const onImageSubmit = () => {
    const val = `![${'linkText'}](${'linkUrl'})`
    setBlogText(prev => prev + '\n' + val)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setBlogText(value)
  }

  useEffect(() => {

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if ((newLineElements[currentType] != undefined) && (currentType != 'header' && currentType != 'subHeading')) {
          handleSetNewLineEl(currentType)
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [currentType])

  const onBlogSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }



  return (
    <main className="p-4">
      <div className="flex justify-end gap-4">
        <BlueButton>
          <span className="text-white">Save to Draft</span>
        </BlueButton>
        <GreenButton>
          <span className="text-white">Publish</span>
        </GreenButton>
      </div>
      <div className='flex mt-10'>
        <div className="h-full w-[80px] pb-[10%] flex items-end">
          <button className="rounded-full block border w-[40px] h-[40px] " role="add content" onClick={() => setShowElementPopup(prev => !prev)} >
            <Image src={add} alt="add" width={35} height={35} />
          </button>
        </div>
        <div className="w-full h-[100vh] overflow-y-auto flex gap-[8%]">
          <form onSubmit={onBlogSubmmit} className='w-[45%] h-[60vh] border p-2'>
            <input placeholder="Title" className="w-full h-[40px] p-3 border-none text-[34px] focus:outline-none"
              value={header} onChange={({ target }) => setBlogHeader(target.value)} />
            <textarea className="w-full h-full p-3 border-none focus:outline-none text-[22px] placeholder:text-[22px]" value={text} onChange={onChange} placeholder="Write a Post...." />
          </form>
          <div className='w-[45%] h-[60vh] border overflow-y-auto md p-8'>
            <Markdown>
              {'# ' + header + '\n' + text}
            </Markdown>
          </div>
        </div>
      </div>
      {showElementPopup && (
        <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-[400px] h-[300px] p-2  border shadow-xl bg-white overflow-y-auto z-[400]">

          <button className="rounded-full block border w-[30px] h-[30px] absolute top-[3px] right-[8px] bg-white" role="close pop up" onClick={() => setShowElementPopup(prev => !prev)} >
            x
          </button>

          <h4 className="border-b-2 text-[18px]">Block Elements</h4>
          <ul className='flex gap-2 flex-col border shadow p-2 overflow-y-auto mb-4'>
            {Object.keys(newLineElements).map((key) => {
              if (['header', 'list'].includes(key)) return;
              return (
                <li key={key} onClick={() => handleSetNewLineEl(key)} className="capitalize w-full border cursor-pointer">
                  {key}
                </li>
              )
            })}
          </ul>
          <hr />
          <h4 className="border-b-2 text-[18px]">
            Insert Elements
          </h4>
          <ul>
            {Object.keys(insertElements).map((key) => {
              return (
                <li key={key} onClick={() => handleSetInsert(key)} className="capitalize cursor-pointer">
                  {key}
                </li>
              )
            }
            )}
          </ul>
        </div>
      )}
      {
        linkPopup && <LinkPopup onLinkSubmit={onLinkSubmit}  close={()=>{setLinkPopup(false)}}/>
      }
      {
        showInsertPopup && <InsertElement role={insert.role} element={insert.type} onElementSubmit={handleInsertElement} close={()=>{setShowInsertPopup(false)}}/>
      }
    </main>
  )
}

const LinkPopup = ({ onLinkSubmit,close }: { onLinkSubmit: (url: string, text: string) => string | void, close:()=>void }) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [error, setError] = useState('')

  const handleError = (err: string) => {
    setError(err)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const val = onLinkSubmit(linkUrl, linkText)
    if (val) {
      handleError(val)
    }
    setLinkText('')
    setLinkText('')
  }


  return (
    <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-[400px] h-[200px] p-2  border shadow-xl bg-white overflow-y-auto z-[400] flex items-center ">
      <div>
        <button className="rounded-full block border w-[30px] h-[30px] absolute top-[3px] right-[8px] bg-white" role="close pop up" onClick={() =>close()} >
          x
        </button>
      </div>
      <form className="flex flex-col p-4 justify-center gap-2 w-full" onSubmit={onSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <label htmlFor="href" className="bold ">Url:</label>
        <input type="text" className="border border-[#000] w-full h-[30px] p-1" value={linkUrl} onChange={({ target }) => setLinkUrl(target.value)} />

        <label htmlFor="text">Link text: </label>
        <input type="text" className="border border-[#000] w-full p-1 h-[30px]" value={linkText} onChange={({ target }) => setLinkText(target.value)} />
        <BlueButton className="h-[30px] w-[70px]" type="submit">
          Enter
        </BlueButton>
      </form>
    </div>
  )
}

const InsertElement = ({ role, element, onElementSubmit,close }: {
  role: "newLine" | "inLine",
  element: string,
  onElementSubmit: (role: 'newLine' | 'inLine', element: string, text: string) => void,
  close: () => void
}) => {
  const [val, setVal] = useState('')
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVal('')
    onElementSubmit(role, element, val)
  }
  return (
    <form onSubmit={onSubmit} className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-[400px] h-[120px] p-2  border shadow-xl bg-white overflow-y-auto z-[400] flex items-center flex-col gap-2 justify-center items-center">
      <button className="rounded-full block border w-[30px] h-[30px] absolute top-[3px] right-[8px] bg-white" role="close pop up" onClick={() => close()} >
        x
      </button>
      <label htmlFor="element" className="bold capitalize w-full">{element} text</label>
      {
        role === 'newLine' ?<>
          <p className="text-[12px]">This element would show on a new line</p>
          <textarea name="element" id="element" value={val} onChange={({ target }) => setVal(target.value)} className="border border-[#000] rounded-[5px] w-full h-[50px] p-1" /> </> : <>
          <p className="text-[12px]">This element would show inline</p>
          <input type='text' name="element" id="element" value={val} onChange={({ target }) => setVal(target.value)} className="border border-[#000] rounded-[5px] w-full h-[50px] p-1" /></>
      }

      <GreenButton type="submit" className="w-[80px] h-[30px]">
        Enter
      </GreenButton>
    </form>
  )
}
