import { StaticImageData } from "next/image"
import { ReactNode } from "react"


interface iIBgProps {
  children: ReactNode,
  src: StaticImageData,
  className: string
}

export default function BackgroundImg({ children, src, className = '' }: iIBgProps) {
  return (
    <div style={{
      backgroundImage: `url(${src.src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }} className={className}>
      {children}
    </div>
  )
}