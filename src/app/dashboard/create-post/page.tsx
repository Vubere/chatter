'use client';


import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ElementAttributes {
  src?: string;
  alt?: string;
  href?: string;
  className?: string;
}

type Content = {
  element: string;
  value?: string | { element: string; value: any }[];
  editable?: boolean;
  attributes?: ElementAttributes;
}

interface ImagePopupProps {
  handleImageInsert: (url: string) => void;
  handleImageCancel: () => void;
}

interface LinkPopupProps {
  handleLinkInsert: (url: string) => void;
  handleLinkCancel: () => void;
}

const blogElements: {
  [key: string]: {
    element: string;
    className: string;
  }
} = {
  header: {
    element: 'h1',
    className: ' text-[32px] font-[700] leading-[48px] uppercase mb-4 ',
  },
  subHeading: {
    element: 'h2',
    className: 'bold text-[24px] font-[700] leading-[36px] uppercase mb-4 ',
  },
  paragraph: {
    element: 'p',
    className: 'text-[18px] leading-[27px] ',
  },
  image: {
    element: 'img',
    className: 'w-full h-[400px] object-cover object-center rounded-[4px] mb-4 mx-auto ',
  },
  'ordered list': {
    element: 'ol',
    className: 'flex flex-col gap-2 ',
  },
  'unordered list': {
    element: 'ul',
    className: 'flex flex-col gap-2 ',
  },
  'list item': {
    element: 'li',
    className: 'flex gap-2  ',
  },
  quote: {
    element: 'blockquote',
    className: 'quote ',
  },
  'code block': {
    element: 'pre',
    className: 'code-block ',
  },
  link: {
    element: 'a',
    className: 'font-italic text-[#1E3A8A] ',
  },
  divider: {
    element: 'hr',
    className: 'divider mb-4 mt-4 ',
  },
  italic: {
    element: 'i',
    className: 'font-italic ',
  },
  bold: {
    element: 'b',
    className: 'bold font-[700] ',
  },
  underline: {
    element: 'u',
    className: 'underline ',
  },
  strikethrough: {
    element: 's',
    className: 'strikethrough ',
  },
  highlight: {
    element: 'mark',
    className: ' highlight ',
  },
  superscript: {
    element: 'sup',
    className: 'superscript ',
  },
  subscript: {
    element: 'sub',
    className: 'subscript ',
  },
};

const ImagePopup: React.FC<ImagePopupProps> = ({ handleImageInsert, handleImageCancel }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (imageUrl) {
      handleImageInsert(imageUrl);
    }
    setImageUrl('');
  };

  const handleCancel = () => {
    handleImageCancel();
    setImageUrl('');
  };

  return (
    <div className="popup">
      <h3>Insert Image</h3>
      <input type="text" placeholder="Enter image URL" value={imageUrl} onChange={handleImageInput} />
      <button onClick={handleSubmit}>Insert</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

const LinkPopup: React.FC<LinkPopupProps> = ({ handleLinkInsert, handleLinkCancel }) => {
  const [linkUrl, setLinkUrl] = useState('');

  const handleLinkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (linkUrl) {
      handleLinkInsert(linkUrl);
    }
    setLinkUrl('');
  };

  const handleCancel = () => {
    handleLinkCancel();
    setLinkUrl('');
  };

  return (
    <div className="popup">
      <h3>Insert Link</h3>
      <input type="text" placeholder="Enter link URL" value={linkUrl} onChange={handleLinkInput} />
      <button onClick={handleSubmit}>Insert</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

const CreatePost: React.FC = () => {
  const [content, setContent] = useState<Content[]>([{
    element: 'header',
    value: '',
    editable: true,

  }]);
  const [showElementPopup, setShowElementPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [showLinkPopup, setShowLinkPopup] = useState(false);

  const handleInsertElement = useCallback((element: string) => {
    if (content.length === 0 && element === 'title') {
      setContent([{ element: 'h1', value: '', editable: true }]);
    } else if (element === 'image') {
      setShowImagePopup(true);
    } else if (element === 'link') {
      setShowLinkPopup(true);
    } else {
      const newElement: Content = { element, value: '', editable: true };
      setContent((prevContent) => [...prevContent, newElement]);
    }
    setShowElementPopup(false);
  }, [content.length]);

  const handleElementClick = useCallback((index: number) => {
    setContent((prevContent) => {
      const updatedContent = [...prevContent];
      updatedContent[index].editable = true;
      return updatedContent;
    });
  }, []);

  const handleInputChange = useCallback((index: number, value: string) => {
    setContent((prevContent) => {
      const updatedContent = [...prevContent];
      updatedContent[index].value = value;
      return updatedContent;
    });
  }, []);

  const handleImageInsert = useCallback((url: string) => {
    const newElement: Content = { element: 'img', attributes: { src: url, alt: '' }, editable: false };
    setContent((prevContent) => [...prevContent, newElement]);
    setShowImagePopup(false);
  }, []);

  const handleImageCancel = useCallback(() => {
    setShowImagePopup(false);
  }, []);

  const handleLinkInsert = useCallback((url: string) => {
    const newElement: Content = { element: 'a', attributes: { href: url }, value: '', editable: false };
    setContent((prevContent) => [...prevContent, newElement]);
    setShowLinkPopup(false);
  }, []);

  const handleLinkCancel = useCallback(() => {
    setShowLinkPopup(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '\\' && !showImagePopup && !showElementPopup) {
        e.preventDefault();
        setShowElementPopup(true);
      } else if (e.key === 'Enter' && !showElementPopup) {
        handleInsertElement('paragraph');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showImagePopup, showLinkPopup, showElementPopup, handleInsertElement]);

  return (
    <div>
      <div className="blog-content">
        {content.map((item, index) => (
          <React.Fragment key={index}>
            {item.element === 'ordered list' || item.element === 'unordered list' ? <ListElement item={item} content={content} handleElementClick={handleElementClick} index={index} setContent={setContent} /> : <NormalTag content={content} item={item} handleElementClick={handleElementClick} index={index} setContent={setContent} />}
          </React.Fragment>
        ))}
      </div>
      <div>
        {showElementPopup && (
          <div className="popup max-h-[200px] overflow-auto">
            <h3>Select Element</h3>
            <ul className='flex gap-2'>
              {Object.keys(blogElements).map((key) => (
                <li key={key} onClick={() => handleInsertElement(key)}>
                  {key}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showImagePopup && (
          <ImagePopup handleImageInsert={handleImageInsert} handleImageCancel={handleImageCancel} />
        )}
        {showLinkPopup && (
          <LinkPopup handleLinkInsert={handleLinkInsert} handleLinkCancel={handleLinkCancel} />
        )}
      </div>
    </div>
  );
};

export default CreatePost;


interface NormalTagProps { content: Content[], item: Content, handleElementClick: any, index: any, setContent: any }

const NormalTag = ({ content, item, handleElementClick, index, setContent }: NormalTagProps) => {
  const [text, setText] = useState(item.value as string | undefined || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;

    if (value[value.length - 1] === '\\') {

      setText(value.slice(0, value.length - 1));
      return;
    }
    setText(e.target.value);
  }
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (inputRef.current) {
      console.log(inputRef.current)
      console.log(inputRef.current.value)
      inputRef.current.focus();

    }
    handleElementClick(index)

  }
  const handleBlur = () => {
    const updatedContent = [...content];
    updatedContent[index].value = text;
    setContent(updatedContent);
  }
  useEffect(() => {

    inputRef.current?.focus();
    const handleBackspace = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && text === '') {
        e.preventDefault();
        if(item.element.toLowerCase()!='header')
        setContent((prevContent: Content[]) => {
          const updatedContent = [...prevContent];
          updatedContent.splice(index, 1);
          return updatedContent;
        });
      }
    }
    document.addEventListener('keydown', handleBackspace);
    return () => {
      document.removeEventListener('keydown', handleBackspace);
    }
  }, [ text, item.element, index, setContent])

  return (
    <div className='border min-h-[50px] overflow-hidden' onClick={handleClick} >

      {
        React.createElement(
          blogElements[item.element].element,
          {
            onChange: () => '',
            value: text || item.value,
            className: 'border min-h-full' + blogElements[item.element].className,
            ...(item.element === 'img'
              ? { src: item.attributes?.src, alt: item.attributes?.alt }
              : item.element === 'a'
                ? { href: item.attributes?.href, onClick: () => handleElementClick(index) }
                : {}),
          },
          text as string
        )
      }
      <input type="text" value={text} onChange={handleTextChange} onBlur={handleBlur} className='w-[1px] h-[1px]  overflow-hidden' ref={inputRef} />
    </div>
  )
}

type ListElementProps = {
  item: Content;
  index: number;
  handleElementClick: (index: number) => void;
  setContent: (content: Content[]) => void;
  content: Content[];
};


const ListElement = ({ content, item, handleElementClick, index, setContent }: ListElementProps) => {


  return (
    <>

      <ol>
        {item.value &&
          typeof item?.value !== 'string' &&
          item.value.map((listItem, listItemIndex) => (
            <li key={listItemIndex}>{listItem.value}</li>
          ))}
      </ol>

    </>
  )
}