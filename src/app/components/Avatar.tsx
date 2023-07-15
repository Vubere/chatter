import Image from 'next/image'


type AvatarProps = {
  src?: string,
  className?: string,
  alt?: string,
  fill?: boolean
}


export default function Avatar({ src, className = '  ', alt = '', fill=true}: AvatarProps) {


  return (
    <Image src={src || '/avatar.png'} alt={alt} fill={fill} className={className}/>
  )
}
