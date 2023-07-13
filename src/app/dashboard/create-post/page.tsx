'use client'
/* hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/state/hooks";
/* libray elements */
import Image from 'next/image'
import Markdown from "marked-react";
/* custom elements */
import { BlueButton, GreenButton } from "@/app/components/Buttons";
import ImageUploadButton from "@/app/components/UploadImage";
import Alert from "@/app/components/Alert";

/* images */
import add from "@/icons/add.svg";

/* helpers */
import { blogElements, blogElementsCat } from "./_helpers";
import blogServices from "@/app/services/blogServices";
import { set } from "mongoose";

const {
  newLineElements,
  insertElements,
} = blogElementsCat;

export default function CreatePost() {
  const user = useAppSelector((state: any) => state.user)
  const router = useRouter()
  const [currentType, setCurrentType] = useState<string>('header')
  const [text, setBlogText] = useState('')
  const [header, setBlogHeader] = useState('')
  const [excerpt, setBlogExcerpt] = useState('')
  const [showElementPopup, setShowElementPopup] = useState(false)
  const [linkPopup, setLinkPopup] = useState(false)
  const [insert, setInsert] = useState<{
    type: string,
    role: 'newLine' | 'inLine'
  }>({ type: 'newLine', role: 'newLine' })
  const [showInsertPopup, setShowInsertPopup] = useState(false)
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const editorRef = React.useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<string[]>([])
  const [tag, setTag] = useState('')
  const [alertObj, setAlert] = useState<{
    type: 'success' | 'error' | 'warning' | 'info' | '',
    message: string,
    close: () => any
  }>()
  const [showAlert, setShowAlert] = useState(false)


  const handleSetNewLineEl = (type: string) => {
    setCurrentType(type)
    setShowElementPopup(false)
    setBlogText(prev => prev + '\n' + blogElements[type].mdElement)
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
      case 'image': setShowImagePopup(true); break;
      case 'link': setLinkPopup(true); break;
      case 'code block': openInsertElement(type, 'newLine'); break;
      case 'quote': openInsertElement(type, 'newLine'); break;
      case 'bold': openInsertElement(type, 'inLine'); break;
      case 'italic': openInsertElement(type, 'inLine'); break;
      case 'list item': openInsertElement(type, 'newLine'); break;
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

  const onImageSubmit = (arg: {
    url: string,
    alt: string
  }) => {
    setBlogText(prev => prev + ' ' + `![${arg.alt}](${arg.url})`)
    setShowImagePopup(false)
    setShowElementPopup(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setBlogText(value)
  }

  useEffect(() => {
    const onKeyDown: (e: KeyboardEvent) => void = (e) => {
      if (e.key === 'Enter') {
        if ((newLineElements[currentType] != undefined) && (currentType != 'header' && currentType != 'subHeading')) {
          handleSetNewLineEl(currentType)
        }
      }
    }
    if (editorRef.current) {
      const textArea = editorRef.current
      textArea.addEventListener('keydown', onKeyDown)
      return () => {
        textArea.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [currentType])

  const onBlogSubmmit = (type: 'published' | 'draft') => {

    blogServices.postBlog({
      title: header,
      coverImage: coverImageUrl,
      content: text,
      excerpt: excerpt,
      author: user?._id,
      state: type,
      tags
    }).then(res => {
      /* if (res.status == 'success') {
        router.push(`/blog/${res.data.bl
          }`)
      } */
      if(res.status == 'success'){
        setShowAlert(true)
        setAlert({
          type: 'success',
          message: 'Blog saved successfully',
          close: () => {
            setShowAlert(false)
          }
        })
        setTimeout(() => {
          setShowAlert(false)
          setAlert(undefined)
        }, 3000)
        /* reset all */
      }
    }).catch(err => {
      console.log(err)
    })

  }

  const ci_alt = coverImageUrl ? 'cover image' : ''



  return (
    <main className="p-4 h-[100vh] overflow-y-auto pb-40">
      {showAlert&& alertObj && <Alert type={alertObj.type} message={alertObj.message} close={alertObj.close} />}
      <div className="flex justify-end gap-4">
        <BlueButton onClick={() => onBlogSubmmit('draft')}>
          <span className="text-white">Save to Draft</span>
        </BlueButton>
        <GreenButton onClick={() => onBlogSubmmit('published')}>
          <span className="text-white">Publish</span>
        </GreenButton>
      </div>
      
      <div className='flex mt-10'>
        <div className="h-full w-[80px]  flex items-end">
          <button className="rounded-full block border w-[40px] h-[40px] " role="add content" onClick={() => setShowElementPopup(prev => !prev)} >
            <Image src={add} alt="add" width={35} height={35} />
          </button>

        </div>

        <div className="w-full h-[70vh] overflow-y-auto flex gap-[2%] flex-wrap">
          <div className='w-[90vh] max-w-[420px] h-[60vh] max-h-[700px] border p-2'>
            <input placeholder="Title" className="w-full h-[10%] min-h-[50px] max-h-[60px] p-3 border-none text-[34px] focus:outline-none"
              value={header} onChange={({ target }) => setBlogHeader(target.value)} />
            <textarea ref={editorRef} className="w-full h-[85%] p-3 border-none focus:outline-none text-[22px] placeholder:text-[22px] resize-none" value={text} onChange={onChange} placeholder="Write a Post...." />
          </div>
          <div className='w-[90vh] max-w-[420px] h-[60vh] border overflow-y-auto md p-8'>
            <Markdown>
              {'# ' + header + '\n' + '![' + ci_alt + '](' + coverImageUrl + ')' + '\n' + text}
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
        linkPopup && <LinkPopup onLinkSubmit={onLinkSubmit} close={() => { setLinkPopup(false) }} />
      }
      {
        showInsertPopup && <InsertElement role={insert.role} element={insert.type} onElementSubmit={handleInsertElement} close={() => { setShowInsertPopup(false) }} />
      }
      {showImagePopup && <InsertImages setImage={onImageSubmit} close={() => { setShowImagePopup(false) }} />}
      <div className="flex gap-2 flex-wrap justify-center">
        <div className="w-full bg-red flex flex-col gap-2 w-[90vh] max-w-[250px]">
          <h4>Tags:</h4>
          <div className="flex gap-2">
            <input type="text" className="border w-[120px] h-[36px] p-1 focus:outline-none" value={tag} onChange={({ target }) => setTag(target.value)} />
            <GreenButton onClick={() => {
              setTags([...tags, tag])
              setTag('')
            }} className="h-[36px] w-[60px] p-1">Add</GreenButton>
          </div>
          <ul className="flex gap-2 ">
            {tags.map((tag, i) => (
              <li key={i} className="border p-2 rounded-full min-w-[28px] flex gap-2 align-center">
                <span >
                  {tag}
                </span>
                <button onClick={() => setTags(tags.filter((_, index) => index !== i))} className="w-[22px] h-[22px] rounded-full border text-white  bg-black text-center ">x</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end  flex-col w-[90vh] max-w-[350px]">
          <p>
            Add cover Image <span className="text-[#a00]">*required</span>
          </p>
          <ImageUploadButton
            fn={(images: any[], err?: string) => {
              if (err) {
                return alert(err)
              }
              setCoverImageUrl(images[0].fileUrl)
            }}
          />
          <div>
            <label htmlFor="except">Except <span className='resize-none text-[#008] text-[12px] w-full '>* optional</span></label>
            <textarea value={excerpt} onChange={({ target }) => setBlogExcerpt(target.value)} name="except" id="except" className="w-full max-w-[450px] h-[100px] min-h-[50px] max-h-[60px] p-3 border text-[14px] focus:outline-none resize-none" />
          </div>
        </div>
      </div>

    </main>
  )
}

const LinkPopup = ({ onLinkSubmit, close }: { onLinkSubmit: (url: string, text: string) => string | void, close: () => void }) => {
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
        <button className="rounded-full block border w-[30px] h-[30px] absolute top-[3px] right-[8px] bg-white" role="close pop up" onClick={() => close()} >
          x
        </button>
      </div>
      <form className="flex flex-col p-4 justify-center gap-2 w-full" onSubmit={onSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <label htmlFor="href" className="bold ">Url:</label>
        <input type="text" className="border border-[#000] w-full h-[30px] p-1" value={linkUrl} onChange={({ target }) => setLinkUrl(target.value)} />

        <label htmlFor="text">Link text: </label>
        <input type="text" className="border border-[#000] w-full p-1 h-[30px]" value={linkText} onChange={({ target }) => setLinkText(target.value)} />
        <BlueButton className="h-[30px] w-[70px] p-1" type="submit">
          Enter
        </BlueButton>
      </form>
    </div>
  )
}

const InsertElement = ({ role, element, onElementSubmit, close }: {
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
    <form onSubmit={onSubmit} className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-[400px] h-[160px] p-2  border shadow-xl bg-white overflow-y-auto z-[400] flex items-center flex-col gap-2 justify-center items-center">
      <button className="rounded-full block border w-[30px] h-[30px] absolute top-[3px] right-[8px] bg-white" role="close pop up" onClick={() => close()} >
        x
      </button>
      <label htmlFor="element" className="bold capitalize w-full">{element} text</label>
      {
        role === 'newLine' ? <>
          <p className="text-[12px]">This element would show on a new line</p>
          <textarea name="element" id="element" value={val} onChange={({ target }) => setVal(target.value)} className="border border-[#000] rounded-[5px] w-full min-h-[50px] p-1 resize-none" /> </> : <>
          <p className="text-[12px]">This element would show inline</p>
          <input type='text' name="element" id="element" value={val} onChange={({ target }) => setVal(target.value)} className="border border-[#000] rounded-[5px] w-full h-[50px] p-1" /></>
      }

      <GreenButton type="submit" className="w-[80px] h-[28px] text-[16px] p-1">
        Enter
      </GreenButton>
    </form>
  )
}

const InsertImages = ({ setImage, close }: { setImage: (arg: { url: string, alt: string }) => void, close: () => void }) => {

  const [imageDetails, setImageDetails] = useState({
    url: '',
    alt: ''
  })
  const [errors, setErrors] = useState({
    url: '',
    alt: ''
  })



  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageDetails.url) {
      setErrors({
        ...errors,
        url: 'Image url is required'
      })
      return
    }
    setImage(imageDetails)
    setImageDetails({
      url: '',
      alt: ''
    })
  }

  return (
    <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-[400px] h-[300px]  border shadow-xl bg-white overflow-y-auto z-[400] flex items-center flex-col gap-2 justify-center items-center p-6">
      <div className="flex justify-center p-2">
        <button className="rounded-full block border w-[30px] h-[30px] absolute top-[3px] right-[8px] bg-white" role="close pop up" onClick={() => close()} >
          x
        </button>
      </div>
      <div>
        You can upload an image or enter an image url
      </div>
      <ImageUploadButton fn={
        (images, err) => {
          console.log(images)
          setImageDetails(Object.assign(imageDetails, {
            ...imageDetails,
            url: images[0].fileUrl,
          }))
          if (err) {
            setErrors({
              ...errors,
              url: err
            })
          }
        }
      } />
      {errors.url && <p className="text-red-500 text-[14px]">{errors.url}</p>}
      <form onSubmit={onsubmit}>
        <label htmlFor="url">Image url</label>
        <input type="text" name="url" id="url" value={imageDetails.url} className="border border-[#000] rounded-[5px] w-full h-[30px] p-1" onChange={({ target }) => setImageDetails({ ...imageDetails, url: target.value })} required />
        <label htmlFor="alt">Image alt</label>
        <input type="text" name="alt" id="alt" value={imageDetails.alt} onChange={({ target }) => setImageDetails({ ...imageDetails, alt: target.value })} className="border border-[#000] rounded-[5px] w-full h-[30px] p-1" />
        <GreenButton type="submit" className="w-[80px] h-[28px] my-4 text-[16px] p-1">
          Enter
        </GreenButton>
      </form>
    </div>
  )
}
