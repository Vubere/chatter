import { useRef, useState, forwardRef, ForwardedRef, useMemo } from "react";

/* next components */
import Image from 'next/image'

/* assets and icons */
import openEye from '@/icons/openEye.svg'
import closedEye from '@/icons/closedEye.svg'
import { type } from "os";


const changeInputPwdVisibility = (elem: HTMLInputElement, setVisibility?: any) => {
  if (elem.type === 'password') {
    elem.type = 'text';
    if (setVisibility) {
      setVisibility(true);
    }
  } else {
    elem.type = 'password';
    if (setVisibility) {
      setVisibility(false);
    }
  }
};

interface PwdInputProps {
  width?: string;
  className?: string;
  type?: string;
  placeholder?: string;
}

const PwdInput = forwardRef(
  (props: PwdInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [visible, setVisibility] = useState(false);

    const id = useMemo(() => {
      return Math.random().toString(36).substring(2);
    }, []);

    const toggleVisibility = () => {
      const elem = document.getElementById(id);
      if(elem) {
        changeInputPwdVisibility(elem as HTMLInputElement, setVisibility);
      }
    };

    return (
      <div className="w-full relative" style={{ width: props?.width }}>
        <input {...props} ref={ref} type="password" className={props?.className||''} id={id}/>
        <span
          onClick={toggleVisibility}
          className="absolute right-4 top-[50%] translate-y-[-50%]"
        >
          <Image src={visible ? openEye : closedEye} alt="eye icon" />
        </span>
      </div>
    );
  }
);
PwdInput.displayName = 'PwdInput';

export default PwdInput;
